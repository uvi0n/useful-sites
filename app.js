// Элементы интерфейса
const container = document.getElementById('sites-container');
const searchInput = document.getElementById('searchInput');
const filtersContainer = document.getElementById('filters');
const themeToggle = document.getElementById('themeToggle');
const langToggle = document.getElementById('langToggle');

// Словари для интерфейса
const ui = {
    ru: { searchPlaceholder: "Поиск по названию, теме, тегам...", all: "Все", ad: "По вопросам рекламы: ", btn: "Открыть сайт" },
    en: { searchPlaceholder: "Search by name, category, tags...", all: "All", ad: "For advertising: ", btn: "Visit Site" }
};

// Состояние приложения
let currentLang = localStorage.getItem('lang') || 'ru';
let currentTheme = localStorage.getItem('theme') || 'dark';
let currentCategory = 'Все';

// Применяем тему при загрузке
if (currentTheme === 'dark') document.body.setAttribute('data-theme', 'dark');

// Функция смены языка
langToggle.onclick = () => {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', currentLang);
    langToggle.textContent = currentLang === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN';
    updateUI();
};

function updateUI() {
    searchInput.placeholder = ui[currentLang].searchPlaceholder;
    document.getElementById('adText').textContent = ui[currentLang].ad;
    
    // Сбрасываем категорию на "Все" при смене языка
    currentCategory = ui[currentLang].all; 
    renderFilters();
    filterData();
}

// Отрисовка кнопок-фильтров
function renderFilters() {
    // Собираем уникальные категории на текущем языке
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

// Умный поиск (по названию, описанию, тегам и категории)
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
    
    renderCards(filtered);
}

// Отрисовка карточек
function renderCards(data) {
    container.innerHTML = '';
    if (data.length === 0) {
        container.innerHTML = `<h3>${currentLang === 'ru' ? 'Ничего не найдено 😢' : 'Nothing found 😢'}</h3>`;
        return;
    }
    
   data.forEach(site => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Автоматически достаем домен из ссылки (например, remove.bg)
        const domain = new URL(site.url).hostname;
        // Берем логотип через бесплатный API Google
        const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
        
        // Рендер тегов
        const tagsHtml = site.keywords.map(tag => `<span class="tag">#${tag}</span>`).join('');
        
        card.innerHTML = `
            <div class="card-header">
                <span class="category">${site.category[currentLang]}</span>
                <img src="${logoUrl}" alt="Логотип" class="site-logo" loading="lazy">
            </div>
            <h3>${site.name}</h3>
            <div class="tags">${tagsHtml}</div>
            <p class="desc">${site.desc[currentLang]}</p>
            <a href="${site.url}" target="_blank" class="btn">${ui[currentLang].btn}</a>
        `;
        container.appendChild(card);
    });
}

// Логика темной темы
themeToggle.onclick = () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
};

// Запуск
searchInput.addEventListener('input', filterData);
langToggle.textContent = currentLang === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN';
updateUI();
