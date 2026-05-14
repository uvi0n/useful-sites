const container = document.getElementById('sites-container');
const searchInput = document.getElementById('searchInput');
const filtersContainer = document.getElementById('filters');
const priceFiltersContainer = document.getElementById('priceFilters'); 
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');

const detailView = document.getElementById('detail-view');
const detailContent = document.getElementById('detail-content');
const backBtn = document.getElementById('backBtn');
const headerControls = document.querySelector('.header-content');
const filtersPanel = document.getElementById('filters');
const statsCounter = document.getElementById('statsCounter');
const randomBtn = document.getElementById('randomBtn');

const ui = {
    ru: { searchPlaceholder: "Поиск...", all: "Все", found: "Найдено: ", anyPrice: "Любая цена", free: "Бесплатно", freemium: "Частично бесплатно", paid: "Платно", ad: "Нашли ошибку? Хотите добавить сайт? По вопросам рекламы: ", openBtn: "Открыть", visitBtn: "Перейти на сайт", pros: "Плюсы", cons: "Минусы", back: "⬅ Назад" },
    en: { searchPlaceholder: "Search...", all: "All", found: "Found: ", anyPrice: "Any Price", free: "Free", freemium: "Partially Free", paid: "Paid", ad: "Found an error? Want to add a site? For advertising inquiries: ", openBtn: "Open", visitBtn: "Visit Site", pros: "Pros", cons: "Cons", back: "⬅ Back" }
};

let currentLang = localStorage.getItem('lang') || 'ru';
let currentTheme = localStorage.getItem('theme') || 'dark';
let currentCategory = 'Все';
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
    currentPrice = 'all'; 
    renderFilters();
    if (priceFiltersContainer) renderPriceFilters();
    filterData();
}

function renderPriceFilters() {
    if (!priceFiltersContainer) return; 
    
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

// Вспомогательная функция для счетчика
function updateCounter(count) {
    if (statsCounter) {
        statsCounter.textContent = `${ui[currentLang].found} ${count}`;
    }
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
        const matchPrice = currentPrice === 'all' || site.price === currentPrice;
        
        return matchesCategory && matchesSearch && matchPrice; 
    });
    
    // Обновляем счетчик найденных сайтов
    updateCounter(filtered.length);

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
        
        const priceLabel = site.price ? ui[currentLang][site.price] : '';
        const priceHtml = site.price ? `<span class="price-badge price-${site.price}">${priceLabel}</span>` : '';
        
        card.innerHTML = `
            <div class="card-header">
                <div>
                    <span class="category">${site.category[currentLang]}</span>
                    ${priceHtml}
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
    if (priceFiltersContainer) priceFiltersContainer.classList.add('hidden'); 
    detailView.classList.remove('hidden');
    window.scrollTo(0, 0);
};

window.closeDetail = function() {
    detailView.classList.add('hidden');
    headerControls.classList.remove('hidden');
    filtersPanel.classList.remove('hidden');
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

randomBtn.onclick = () => {
    const randomIndex = Math.floor(Math.random() * sitesData.length);
    const randomSite = sitesData[randomIndex];
    openDetail(randomSite.name);
};

searchInput.addEventListener('input', filterData);
langToggle.textContent = currentLang === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN';

if (priceFiltersContainer) renderPriceFilters();
updateUI();
