const container = document.getElementById('sites-container');
const searchInput = document.getElementById('searchInput');
const filtersContainer = document.getElementById('filters');
const priceFiltersContainer = document.getElementById('priceFilters');
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');

const ui = {
    ru: { all: "Все категории", anyPrice: "Любая цена", free: "Бесплатно", freemium: "Частично", paid: "Платно", open: "Открыть", back: "Назад" },
    en: { all: "All Categories", anyPrice: "Any Price", free: "Free", freemium: "Freemium", paid: "Paid", open: "Open", back: "Back" }
};

let currentLang = localStorage.getItem('lang') || 'ru';
let currentCategory = 'all';
let currentPrice = 'all';

// Инициализация
langToggle.onclick = () => {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', currentLang);
    location.reload();
};

function renderPriceFilters() {
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
        btn.onclick = () => { currentPrice = p.id; renderPriceFilters(); filterData(); };
        priceFiltersContainer.appendChild(btn);
    });
}

function renderFilters() {
    const categories = ['all', ...new Set(sitesData.map(s => s.category.en.toLowerCase()))];
    filtersContainer.innerHTML = '';
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${currentCategory === cat ? 'active' : ''}`;
        // Находим перевод категории из данных первого попавшегося сайта
        const displayLabel = cat === 'all' ? ui[currentLang].all : 
            sitesData.find(s => s.category.en.toLowerCase() === cat).category[currentLang];
        
        btn.textContent = displayLabel;
        btn.onclick = () => { currentCategory = cat; renderFilters(); filterData(); };
        filtersContainer.appendChild(btn);
    });
}

function filterData() {
    const query = searchInput.value.toLowerCase();
    const filtered = sitesData.filter(site => {
        const matchCat = currentCategory === 'all' || site.category.en.toLowerCase() === currentCategory;
        const matchPrice = currentPrice === 'all' || site.price === currentPrice;
        const matchSearch = site.name.toLowerCase().includes(query) || 
                            site.keywords.some(k => k.toLowerCase().includes(query));
        return matchCat && matchPrice && matchSearch;
    });

    container.innerHTML = '';
    filtered.forEach(site => {
        const card = document.createElement('div');
        card.className = 'card';
        const priceLabel = ui[currentLang][site.price] || site.price;
        const domain = new URL(site.url).hostname;
        
        card.innerHTML = `
            <div class="card-header">
                <span class="category">${site.category[currentLang]}</span>
                <span class="price-badge price-${site.price}">${priceLabel}</span>
            </div>
            <h3>${site.name}</h3>
            <a href="${site.url}" target="_blank" class="site-link" onclick="event.stopPropagation()">${site.url}</a>
            <p class="desc">${site.desc[currentLang]}</p>
            <button class="btn" onclick="event.stopPropagation(); window.open('${site.url}', '_blank')">${ui[currentLang].open}</button>
        `;
        card.onclick = () => openDetail(site.name); // функция openDetail должна быть в коде ниже
        container.appendChild(card);
    });
}

// Запуск
renderPriceFilters();
renderFilters();
filterData();
searchInput.oninput = filterData;
