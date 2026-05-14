const container = document.getElementById('sites-container');
const searchInput = document.getElementById('searchInput');
const filtersContainer = document.getElementById('filters');
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');

// Новые элементы для детального просмотра
const detailView = document.getElementById('detail-view');
const detailContent = document.getElementById('detail-content');
const backBtn = document.getElementById('backBtn');
const headerControls = document.querySelector('.header-content');
const filtersPanel = document.getElementById('filters');

const ui = {
    ru: { searchPlaceholder: "Поиск...", all: "Все", ad: "По вопросам рекламы: ", moreBtn: "Подробнее", visitBtn: "Перейти на сайт", pros: "Плюсы", cons: "Минусы", back: "⬅ Назад" },
    en: { searchPlaceholder: "Search...", all: "All", ad: "For advertising: ", moreBtn: "Read More", visitBtn: "Visit Site", pros: "Pros", cons: "Cons", back: "⬅ Back" }
};

let currentLang = localStorage.getItem('lang') || 'ru';
let currentTheme = localStorage.getItem('theme') || 'dark';
let currentCategory = 'Все';

if (currentTheme === 'dark') document.body.setAttribute('data-theme', 'dark');

langToggle.onclick = () => {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', currentLang);
    langToggle.textContent = currentLang === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN';
    updateUI();
};

function updateUI() {
    searchInput.placeholder = ui[currentLang].searchPlaceholder;
    document.getElementById('adText').textContent = ui[currentLang].ad;
    backBtn.textContent = ui[currentLang].back;
    currentCategory = ui[currentLang].all; 
    renderFilters();
    filterData();
}

function renderFilters() {
    const allText = ui[currentLang].all;
    const categories = [allText, ...new Set(sitesData.map(site => site.category[currentLang]))];
    
    filtersContainer.innerHTML = '';
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${category === currentCategory ? 'active' : ''}`;
        btn.textContent = category;
        btn.onclick = () => {
            currentCategory = category;
            renderFilters();
            filterData();
        };
        filtersContainer.appendChild(btn);
    });
}

function filterData() {
    const query = searchInput.value.toLowerCase();
    
    const filtered = sitesData.filter(site => {
        const catText = site.category[currentLang];
        const descText = site.desc[currentLang].toLowerCase();
        const nameText = site.name.toLowerCase();
        const tagsMatch = site.keywords.some(tag => tag.toLowerCase().includes(query));
        
        const matchesCategory = currentCategory === ui[currentLang].all || catText === currentCategory;
        const matchesSearch = nameText.includes(query) || descText.includes(query) || tagsMatch;
        
        return matchesCategory && matchesSearch;
    });
    
    // Скрываем детальный вид, если мы ищем что-то
    closeDetail();
    
    // Удаляем все старые карточки, кроме скрытого detail-view
    const cards = container.querySelectorAll('.card, h3');
    cards.forEach(card => card.remove());
    
    if (filtered.length === 0) {
        const msg = document.createElement('h3');
        msg.textContent = currentLang === 'ru' ? 'Ничего не найдено 😢' : 'Nothing found 😢';
        container.appendChild(msg);
        return;
    }
    
    filtered.forEach(site => {
        const card = document.createElement('div');
        card.className = 'card';
        const domain = new URL(site.url).hostname;
        const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
        const tagsHtml = site.keywords.map(tag => `<span class="tag">#${tag}</span>`).join('');
        
        card.innerHTML = `
            <div class="card-header">
                <span class="category">${site.category[currentLang]}</span>
                <img src="${logoUrl}" alt="Логотип" class="site-logo" loading="lazy">
            </div>
            <h3>${site.name}</h3>
            <div class="tags">${tagsHtml}</div>
            <p class="desc">${site.desc[currentLang]}</p>
            <button class="btn" onclick="openDetail('${site.name}')">${ui[currentLang].moreBtn}</button>
        `;
        container.appendChild(card);
    });
}

// Открытие страницы с подробностями
window.openDetail = function(siteName) {
    const site = sitesData.find(s => s.name === siteName);
    if (!site) return;

    const domain = new URL(site.url).hostname;
    const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    
    const prosList = site.pros[currentLang].map(pro => `<li>${pro}</li>`).join('');
    const consList = site.cons[currentLang].map(con => `<li>${con}</li>`).join('');

    detailContent.innerHTML = `
        <div class="detail-header-info">
            <img src="${logoUrl}" alt="Логотип" class="detail-logo">
            <div class="detail-title">
                <h2>${site.name}</h2>
                <span class="category">${site.category[currentLang]}</span>
            </div>
        </div>
        
        <p class="full-desc">${site.fullDesc[currentLang]}</p>
        
        <div class="pros-cons">
            <div class="pros">
                <h4>👍 ${ui[currentLang].pros}</h4>
                <ul>${prosList}</ul>
            </div>
            <div class="cons">
                <h4>👎 ${ui[currentLang].cons}</h4>
                <ul>${consList}</ul>
            </div>
        </div>
        
        <div class="detail-actions">
            <a href="${site.url}" target="_blank" class="btn">${ui[currentLang].visitBtn}</a>
        </div>
    `;

    // Скрываем все карточки и панель поиска, показываем окно
    const cards = container.querySelectorAll('.card, h3');
    cards.forEach(c => c.classList.add('hidden'));
    headerControls.classList.add('hidden');
    filtersPanel.classList.add('hidden');
    detailView.classList.remove('hidden');
    window.scrollTo(0, 0); // Скролл наверх
};

// Закрытие страницы с подробностями
window.closeDetail = function() {
    detailView.classList.add('hidden');
    headerControls.classList.remove('hidden');
    filtersPanel.classList.remove('hidden');
    const cards = container.querySelectorAll('.card, h3');
    cards.forEach(c => c.classList.remove('hidden'));
};

backBtn.onclick = closeDetail;

themeToggle.onclick = () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
};

searchInput.addEventListener('input', filterData);
langToggle.textContent = currentLang === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN';
updateUI();
