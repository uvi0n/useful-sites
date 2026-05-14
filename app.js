const container = document.getElementById('sites-container');
const searchInput = document.getElementById('searchInput');
const filtersContainer = document.getElementById('filters');
// НОВОЕ: Переменная для блока с ценами
const priceFiltersContainer = document.getElementById('priceFilters'); 
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');

const detailView = document.getElementById('detail-view');
const detailContent = document.getElementById('detail-content');
const backBtn = document.getElementById('backBtn');
const headerControls = document.querySelector('.header-content');
const filtersPanel = document.getElementById('filters');

// НОВОЕ: Добавлены переводы для ценников (anyPrice, free, freemium, paid)
const ui = {
    ru: { searchPlaceholder: "Поиск...", all: "Все", anyPrice: "Любая цена", free: "Бесплатно", freemium: "Частично", paid: "Платно", ad: "По вопросам рекламы: ", openBtn: "Открыть", visitBtn: "Перейти на сайт", pros: "Плюсы", cons: "Минусы", back: "⬅ Назад" },
    en: { searchPlaceholder: "Search...", all: "All", anyPrice: "Any Price", free: "Free", freemium: "Freemium", paid: "Paid", ad: "For advertising: ", openBtn: "Open", visitBtn: "Visit Site", pros: "Pros", cons: "Cons", back: "⬅ Back" }
};

let currentLang = localStorage.getItem('lang') || 'ru';
let currentTheme = localStorage.getItem('theme') || 'dark';
let currentCategory = 'Все';
// НОВОЕ: Переменная для хранения выбранной цены
let currentPrice = 'all'; 

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
    currentPrice = 'all'; // Сбрасываем цену при смене языка
    renderFilters();
    if (priceFiltersContainer) renderPriceFilters(); // Отрисовываем фильтры цен
    filterData();
}

// НОВАЯ ФУНКЦИЯ: Отрисовка кнопок цены
function renderPriceFilters() {
    if (!priceFiltersContainer) return; // Защита от ошибок
    
    const prices = [
        { id: 'all', label: ui[currentLang].anyPrice },
        { id: 'free', label: ui[currentLang].free },
        { id: 'freemium', label: ui[currentLang].freemium },
        { id: 'paid', label: ui[currentLang].paid }
    ];
    
    priceFiltersContainer.innerHTML = '';
    prices.forEach(p => {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${currentPrice === p.id ? 'active' : ''}`;
        btn.textContent = p.label;
        btn.onclick = () => {
            currentPrice = p.id;
            renderPriceFilters();
            filterData();
        };
        priceFiltersContainer.appendChild(btn);
    });
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
        
        // НОВОЕ: Проверка карточки по цене
        const matchPrice = currentPrice === 'all' || site.price === currentPrice;
        
        // Добавили matchPrice в финальное условие
        return matchesCategory && matchesSearch && matchPrice; 
    });
    
    closeDetail();
    
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
        
        // НОВОЕ: Генерируем ценник для карточки
        const priceLabel = site.price ? ui[currentLang][site.price] : '';
        const priceHtml = site.price ? `<span class="price-badge price-${site.price}">${priceLabel}</span>` : '';
        
        card.innerHTML = `
            <div class="card-header">
                <div>
                    <span class="category">${site.category[currentLang]}</span>
                    ${priceHtml} <!-- Вставили ценник рядом с категорией -->
                </div>
                <img src="${logoUrl}" alt="" class="site-logo" loading="lazy" onerror="this.style.display='none'">
            </div>
            <h3>${site.name}</h3>
            <a href="${site.url}" target="_blank" class="site-link" onclick="event.stopPropagation()">${site.url}</a>
            <div class="tags">${tagsHtml}</div>
            <p class="desc">${site.desc[currentLang]}</p>
            <a href="${site.url}" target="_blank" class="btn" onclick="event.stopPropagation()">${ui[currentLang].openBtn}</a>
        `;

        card.onclick = () => openDetail(site.name);
        container.appendChild(card);
    });
}

window.openDetail = function(siteName) {
    const site = sitesData.find(s => s.name === siteName);
    if (!site) return;

    const domain = new URL(site.url).hostname;
    const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    
    const prosList = site.pros[currentLang].map(pro => `<li>${pro}</li>`).join('');
    const consList = site.cons[currentLang].map(con => `<li>${con}</li>`).join('');

    detailContent.innerHTML = `
        <div class="detail-header-info">
            <img src="${logoUrl}" alt="" class="detail-logo" onerror="this.style.display='none'">
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

    const cards = container.querySelectorAll('.card, h3');
    cards.forEach(c => c.classList.add('hidden'));
    headerControls.classList.add('hidden');
    filtersPanel.classList.add('hidden');
    // НОВОЕ: Скрываем фильтры цен при открытии деталей
    if (priceFiltersContainer) priceFiltersContainer.classList.add('hidden'); 
    detailView.classList.remove('hidden');
    window.scrollTo(0, 0);
};

window.closeDetail = function() {
    detailView.classList.add('hidden');
    headerControls.classList.remove('hidden');
    filtersPanel.classList.remove('hidden');
    // НОВОЕ: Возвращаем фильтры цен при закрытии деталей
    if (priceFiltersContainer) priceFiltersContainer.classList.remove('hidden'); 
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

// Инициализация при загрузке
if (priceFiltersContainer) renderPriceFilters();
updateUI();
