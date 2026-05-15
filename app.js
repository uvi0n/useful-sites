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
const bookmarksBtn = document.getElementById('bookmarksBtn');
const toolOfWeekContainer = document.getElementById('tool-of-week-container');
const similarToolsContainer = document.getElementById('similar-tools');

// Модалки
const suggestModal = document.getElementById('suggestModal');
const changelogModal = document.getElementById('changelogModal');

const ui = {
    ru: { searchPlaceholder: "Поиск (имя, теги)...", all: "Все", found: "Найдено: ", anyPrice: "Любая цена", free: "Бесплатно", freemium: "Частично", paid: "Платно", ad: "Нашли ошибку? По вопросам рекламы: ", openBtn: "Открыть", visitBtn: "Перейти на сайт", pros: "Плюсы", cons: "Минусы", back: "⬅ Назад" },
    en: { searchPlaceholder: "Search (name, tags)...", all: "All", found: "Found: ", anyPrice: "Any Price", free: "Free", freemium: "Freemium", paid: "Paid", ad: "Found an error? For advertising: ", openBtn: "Open", visitBtn: "Visit Site", pros: "Pros", cons: "Cons", back: "⬅ Back" }
};

let currentLang = localStorage.getItem('lang') || 'ru';
let currentTheme = localStorage.getItem('theme') || 'dark';
let currentCategory = 'Все';
let currentPrice = 'all'; 
let showOnlyBookmarks = false;

// Инициализация LocalStorage для Заладок и Лайков
let bookmarks = JSON.parse(localStorage.getItem('myBookmarks')) || [];
let likedSites = JSON.parse(localStorage.getItem('myLikes')) || [];

if (currentTheme === 'dark') document.body.setAttribute('data-theme', 'dark');
langToggle.textContent = currentLang === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN';

// --- Роутинг (Hash-навигация) ---
function handleHash() {
    const hash = decodeURIComponent(window.location.hash.substring(1));
    if (hash.startsWith('tool=')) {
        const siteName = hash.replace('tool=', '');
        openDetail(siteName, false); // false = не менять хэш снова
    } else if (hash.startsWith('category=')) {
        currentCategory = hash.replace('category=', '');
        closeDetail(false);
        updateUI();
    } else {
        closeDetail(false);
        updateUI();
    }
}
window.addEventListener('hashchange', handleHash);

// --- Инициализация интерфейса ---
function updateUI() {
    searchInput.placeholder = ui[currentLang].searchPlaceholder;
    document.getElementById('adText').textContent = ui[currentLang].ad;
    backBtn.textContent = ui[currentLang].back;
    
    // Если хэш не задал категорию, ставим "Все"
    if (!window.location.hash.startsWith('#category=')) {
        currentCategory = ui[currentLang].all; 
    }
    
    renderFilters();
    renderPriceFilters();
    renderToolOfWeek();
    filterData();
}

// --- Инструмент недели ---
function renderToolOfWeek() {
    toolOfWeekContainer.innerHTML = '';
    if (showOnlyBookmarks || window.location.hash.startsWith('#tool=')) {
        toolOfWeekContainer.classList.add('hidden');
        return;
    }
    
    // Берем первый сайт с флагом isHot (или любой случайный)
    const featuredSite = sitesData.find(s => s.isHot) || sitesData[0];
    
    const domain = new URL(featuredSite.url).hostname;
    const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    
    toolOfWeekContainer.innerHTML = `
        <div class="tool-of-week" onclick="window.location.hash='#tool=${encodeURIComponent(featuredSite.name)}'">
            <div>
                <h2>🔥 Инструмент недели: ${featuredSite.name}</h2>
                <p>${featuredSite.desc[currentLang]}</p>
            </div>
            <img src="${logoUrl}" alt="" class="site-logo" onerror="this.style.display='none'">
        </div>
    `;
    toolOfWeekContainer.classList.remove('hidden');
}

// --- Фильтры ---
function renderPriceFilters() {
    const prices = [{ id: 'all', label: ui[currentLang].anyPrice }, { id: 'free', label: ui[currentLang].free }, { id: 'freemium', label: ui[currentLang].freemium }, { id: 'paid', label: ui[currentLang].paid }];
    priceFiltersContainer.innerHTML = '';
    prices.forEach(p => {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${currentPrice === p.id ? 'active' : ''}`;
        btn.textContent = p.label;
        btn.onclick = () => { currentPrice = p.id; filterData(); renderPriceFilters(); };
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
            window.location.hash = category === allText ? '' : `#category=${encodeURIComponent(category)}`;
        };
        filtersContainer.appendChild(btn);
    });
}

// --- Основной рендер ---
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
        const matchesBookmarks = showOnlyBookmarks ? bookmarks.includes(site.name) : true;
        
        return matchesCategory && matchesSearch && matchPrice && matchesBookmarks; 
    });
    
    if (statsCounter) statsCounter.textContent = `${ui[currentLang].found} ${filtered.length}`;

    container.innerHTML = '';
    
    if (filtered.length === 0) {
        container.innerHTML = `<h3>${currentLang === 'ru' ? 'Ничего не найдено 😢' : 'Nothing found 😢'}</h3>`;
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
        
        // Бейджи
        let badgeHtml = '';
        if (site.isHot) badgeHtml = `<span class="badge badge-hot">HOT</span>`;
        if (site.isNew) badgeHtml = `<span class="badge badge-new">NEW</span>`;

        const isBookmarked = bookmarks.includes(site.name);
        const isLiked = likedSites.includes(site.name);
        
        // TODO: Supabase - тут нужно будет брать likes из БД
        const fakeLikes = site.name.length * 14; 

        card.innerHTML = `
            <div class="card-header">
                ${badgeHtml}
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
            
            <div class="card-actions" onclick="event.stopPropagation()">
                <button class="action-btn like-btn ${isLiked ? 'active' : ''}" onclick="toggleLike('${site.name}', this)">
                    ${isLiked ? '❤️' : '🤍'} <span>${fakeLikes}</span>
                </button>
                <button class="action-btn bookmark-btn ${isBookmarked ? 'active' : ''}" onclick="toggleBookmark('${site.name}', this)">
                    ${isBookmarked ? '⭐' : '☆'}
                </button>
                <a href="${site.url}" target="_blank" class="btn" style="padding: 6px 12px; font-size: 12px;">${ui[currentLang].openBtn}</a>
            </div>
        `;

        card.onclick = () => { window.location.hash = `#tool=${encodeURIComponent(site.name)}`; };
        container.appendChild(card);
    });
}

// --- Лайки и Закладки ---
window.toggleBookmark = function(siteName, btnElement) {
    if (bookmarks.includes(siteName)) {
        bookmarks = bookmarks.filter(n => n !== siteName);
        btnElement.classList.remove('active');
        btnElement.innerHTML = '☆';
    } else {
        bookmarks.push(siteName);
        btnElement.classList.add('active');
        btnElement.innerHTML = '⭐';
    }
    localStorage.setItem('myBookmarks', JSON.stringify(bookmarks));
    // Если мы сейчас в режиме "Только закладки", обновляем список
    if (showOnlyBookmarks) filterData();
};

window.toggleLike = function(siteName, btnElement) {
    // TODO: Supabase - тут нужно отправлять POST запрос на инкремент/декремент лайка в БД
    const span = btnElement.querySelector('span');
    let count = parseInt(span.textContent);

    if (likedSites.includes(siteName)) {
        likedSites = likedSites.filter(n => n !== siteName);
        btnElement.classList.remove('active');
        btnElement.innerHTML = `🤍 <span>${count - 1}</span>`;
    } else {
        likedSites.push(siteName);
        btnElement.classList.add('active');
        btnElement.innerHTML = `❤️ <span>${count + 1}</span>`;
    }
    localStorage.setItem('myLikes', JSON.stringify(likedSites));
};

bookmarksBtn.onclick = () => {
    showOnlyBookmarks = !showOnlyBookmarks;
    bookmarksBtn.classList.toggle('active', showOnlyBookmarks);
    currentCategory = ui[currentLang].all; // Сбрасываем фильтр категорий
    window.location.hash = ''; // Очищаем роутинг
    updateUI();
};

// --- Детальный вид ---
window.openDetail = function(siteName, updateHash = true) {
    const site = sitesData.find(s => s.name === siteName);
    if (!site) return;

    if (updateHash) window.location.hash = `#tool=${encodeURIComponent(siteName)}`;

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
            <div class="pros"><h4>👍 ${ui[currentLang].pros}</h4><ul>${prosList}</ul></div>
            <div class="cons"><h4>👎 ${ui[currentLang].cons}</h4><ul>${consList}</ul></div>
        </div>
        <div class="detail-actions">
            <a href="${site.url}" target="_blank" class="btn">${ui[currentLang].visitBtn}</a>
        </div>
    `;

    // Похожие инструменты (по категории)
    const similar = sitesData.filter(s => s.category[currentLang] === site.category[currentLang] && s.name !== site.name).slice(0, 3);
    similarToolsContainer.innerHTML = '';
    similar.forEach(s => {
        const simCard = document.createElement('div');
        simCard.className = 'card';
        simCard.innerHTML = `<h4>${s.name}</h4><p style="font-size:12px">${s.desc[currentLang]}</p>`;
        simCard.onclick = () => window.location.hash = `#tool=${encodeURIComponent(s.name)}`;
        similarToolsContainer.appendChild(simCard);
    });

    container.classList.add('hidden');
    toolOfWeekContainer.classList.add('hidden');
    detailView.classList.remove('hidden');
    window.scrollTo(0, 0);
};

window.closeDetail = function(updateHash = true) {
    if (updateHash) window.location.hash = '';
    detailView.classList.add('hidden');
    container.classList.remove('hidden');
    if (!showOnlyBookmarks) toolOfWeekContainer.classList.remove('hidden');
};

backBtn.onclick = () => closeDetail(true);

// --- Интерактив (Кнопки, Темы, Язык) ---
themeToggle.onclick = () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
};

langToggle.onclick = () => {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', currentLang);
    langToggle.textContent = currentLang === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN';
    updateUI();
};

randomBtn.onclick = () => {
    const randomIndex = Math.floor(Math.random() * sitesData.length);
    window.location.hash = `#tool=${encodeURIComponent(sitesData[randomIndex].name)}`;
};

searchInput.addEventListener('input', filterData);

// --- Модалки ---
document.getElementById('suggestBtn').onclick = () => suggestModal.showModal();
document.getElementById('closeSuggest').onclick = () => suggestModal.close();
document.getElementById('changelogBtn').onclick = () => {
    const list = document.getElementById('changelogList');
    list.innerHTML = appChangelog.map(log => `
        <li>
            <span class="changelog-date">${log.date}</span>
            <span>${currentLang === 'ru' ? log.ru : log.en}</span>
        </li>
    `).join('');
    changelogModal.showModal();
};
document.getElementById('closeChangelog').onclick = () => changelogModal.close();

// Запуск
handleHash(); // Проверяем URL при загрузке
