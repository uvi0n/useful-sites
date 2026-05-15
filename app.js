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
const likesLoader = document.getElementById('likesLoader');
const randomBtn = document.getElementById('randomBtn');
const bookmarksBtn = document.getElementById('bookmarksBtn');
const likesBtn = document.getElementById('likesBtn'); // НОВОЕ: Кнопка лайков в шапке
const toolOfWeekContainer = document.getElementById('tool-of-week-container');
const similarToolsContainer = document.getElementById('similar-tools');

// Модалки
const suggestModal = document.getElementById('suggestModal');
const changelogModal = document.getElementById('changelogModal');

// Твои ключи
const SUPABASE_URL = 'https://nrloiaytvvpghfahjphz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ybG9pYXl0dnZwZ2hmYWhqcGh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjQ4MjcsImV4cCI6MjA5NDQ0MDgyN30.lFirc7ueW0LEHBk4Rv_VyqbkwHsc4GWIyu7_pkKEPd8';

// Глобальные объекты и флаги
let globalLikesMap = {};
let isLikesLoaded = false;

const ui = {
    ru: { searchPlaceholder: "Поиск (имя, теги)...", all: "Все", found: "Найдено: ", anyPrice: "Любая цена", free: "Бесплатно", freemium: "Частично", paid: "Платно", ad: "Нашли ошибку? По вопросам рекламы: ", openBtn: "Открыть", visitBtn: "Перейти на сайт", pros: "Плюсы", cons: "Минусы", back: "⬅ Назад" },
    en: { searchPlaceholder: "Search (name, tags)...", all: "All", found: "Found: ", anyPrice: "Any Price", free: "Free", freemium: "Freemium", paid: "Paid", ad: "Found an error? For advertising: ", openBtn: "Open", visitBtn: "Visit Site", pros: "Pros", cons: "Cons", back: "⬅ Back" }
};

let currentLang = localStorage.getItem('lang') || 'ru';
let currentTheme = localStorage.getItem('theme') || 'dark';
let currentCategory = 'Все';
let currentPrice = 'all'; 

// НОВОЕ: Флаги фильтров
let showOnlyBookmarks = false;
let showOnlyLikes = false; 

// Инициализация LocalStorage для Закладок и Лайков
let bookmarks = JSON.parse(localStorage.getItem('myBookmarks')) || [];
let likedSites = JSON.parse(localStorage.getItem('myLikes')) || [];

if (currentTheme === 'dark') document.body.setAttribute('data-theme', 'dark');
langToggle.textContent = currentLang === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN';

// --- Работа с Supabase ---
async function loadLikes() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/likes?select=site_id,likes_count`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        data.forEach(item => {
            globalLikesMap[item.site_id] = item.likes_count;
        });
    } catch (error) {
        console.error('Ошибка при загрузке лайков:', error);
    }
}

function updateLikesOnLiveCards() {
    const likeButtons = container.querySelectorAll('.like-btn');
    likeButtons.forEach(btn => {
        const onclickText = btn.getAttribute('onclick');
        const match = onclickText.match(/toggleLike\('([^']+)'/);
        
        if (match && match[1]) {
            const siteId = match[1];
            const span = btn.querySelector('span');
            if (span) {
                span.textContent = globalLikesMap[siteId] !== undefined ? globalLikesMap[siteId] : 0;
            }
        }
    });
    
    const toolOfWeekBtn = document.querySelector('#tool-of-week-container .like-btn');
    if (toolOfWeekBtn) {
        const onclickText = toolOfWeekBtn.getAttribute('onclick');
        const match = onclickText.match(/toggleLike\('([^']+)'/);
        if (match && match[1]) {
            const span = toolOfWeekBtn.querySelector('span');
            if (span) {
                span.textContent = globalLikesMap[match[1]] !== undefined ? globalLikesMap[match[1]] : 0;
            }
        }
    }
}

// --- Роутинг (Hash-навигация) ---
function handleHash() {
    const hash = decodeURIComponent(window.location.hash.substring(1));
    if (hash.startsWith('tool=')) {
        const siteId = hash.replace('tool=', '');
        openDetail(siteId, false);
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
    // НОВОЕ: Прячем баннер недели, если активен любой из фильтров (закладки или лайки)
    if (showOnlyBookmarks || showOnlyLikes || window.location.hash.startsWith('#tool=')) {
        toolOfWeekContainer.classList.add('hidden');
        return;
    }
    
    const featuredSite = sitesData.find(s => s.isHot) || sitesData[0];
    const domain = new URL(featuredSite.url).hostname;
    const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    
    const actualLikes = isLikesLoaded ? (globalLikesMap[featuredSite.id] !== undefined ? globalLikesMap[featuredSite.id] : 0) : '...';
    const isLiked = likedSites.includes(featuredSite.id);
    const isBookmarked = bookmarks.includes(featuredSite.id);

    toolOfWeekContainer.innerHTML = `
        <div class="tool-of-week" onclick="window.location.hash='#tool=${featuredSite.id}'">
            <div style="flex-grow: 1; padding-right: 20px;">
                <h2>🔥 Инструмент недели: ${featuredSite.name}</h2>
                <p>${featuredSite.desc[currentLang]}</p>
                <div class="card-actions" onclick="event.stopPropagation()" style="margin-top: 15px; display: inline-flex; gap: 15px; border-top: none; padding-top: 0;">
                    <button class="action-btn like-btn ${isLiked ? 'active' : ''}" onclick="toggleLike('${featuredSite.id}', this)" style="color: white;">
                        ${isLiked ? '❤️' : '🤍'} <span style="color: white;">${actualLikes}</span>
                    </button>
                    <button class="action-btn bookmark-btn ${isBookmarked ? 'active' : ''}" onclick="toggleBookmark('${featuredSite.id}', this)" style="color: white;">
                        ${isBookmarked ? '⭐' : '☆'}
                    </button>
                </div>
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
        
        // НОВОЕ: Проверка для закладок и лайков
        const matchesBookmarks = showOnlyBookmarks ? bookmarks.includes(site.id) : true;
        const matchesLikes = showOnlyLikes ? likedSites.includes(site.id) : true;
        
        return matchesCategory && matchesSearch && matchPrice && matchesBookmarks && matchesLikes; 
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
        
        let badgeHtml = '';
        if (site.isHot) badgeHtml = `<span class="badge badge-hot">HOT</span>`;
        if (site.isNew) badgeHtml = `<span class="badge badge-new">NEW</span>`;

        const isBookmarked = bookmarks.includes(site.id);
        const isLiked = likedSites.includes(site.id);
        
        const actualLikes = isLikesLoaded ? (globalLikesMap[site.id] !== undefined ? globalLikesMap[site.id] : 0) : '...';

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
                <button class="action-btn like-btn ${isLiked ? 'active' : ''}" onclick="toggleLike('${site.id}', this)">
                    ${isLiked ? '❤️' : '🤍'} <span>${actualLikes}</span>
                </button>
                <button class="action-btn bookmark-btn ${isBookmarked ? 'active' : ''}" onclick="toggleBookmark('${site.id}', this)">
                    ${isBookmarked ? '⭐' : '☆'}
                </button>
                <a href="${site.url}" target="_blank" class="btn" style="padding: 6px 12px; font-size: 12px;">${ui[currentLang].openBtn}</a>
            </div>
        `;

        card.onclick = () => { window.location.hash = `#tool=${site.id}`; };
        container.appendChild(card);
    });
}

// --- КЛИКИ ПО КНОПКАМ ЗАКЛАДОК И ЛАЙКОВ ---
window.toggleBookmark = function(siteId, btnElement) {
    if (bookmarks.includes(siteId)) {
        bookmarks = bookmarks.filter(id => id !== siteId);
        btnElement.classList.remove('active');
        btnElement.innerHTML = '☆';
    } else {
        bookmarks.push(siteId);
        btnElement.classList.add('active');
        btnElement.innerHTML = '⭐';
    }
    localStorage.setItem('myBookmarks', JSON.stringify(bookmarks));
    if (showOnlyBookmarks) filterData();
};

window.toggleLike = function(siteId, btnElement) {
    const span = btnElement.querySelector('span');
    let currentCount = span.textContent === '...' ? 0 : parseInt(span.textContent);

    if (likedSites.includes(siteId)) {
        // --- СНИМАЕМ ЛАЙК ---
        likedSites = likedSites.filter(id => id !== siteId);
        btnElement.classList.remove('active');
        const newCount = Math.max(currentCount - 1, 0);
        btnElement.innerHTML = `🤍 <span>${newCount}</span>`;
        globalLikesMap[siteId] = newCount;

        fetch(`${SUPABASE_URL}/rest/v1/likes`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'apikey': SUPABASE_KEY, 
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Prefer': 'resolution=merge-duplicates'
            },
            body: JSON.stringify({ site_id: siteId, likes_count: newCount })
        }).catch(err => console.error("Ошибка сети при снятии лайка:", err));
        
        // НОВОЕ: Если мы находимся в режиме "Показать только лайки", убираем карточку
        if (showOnlyLikes) filterData();

    } else {
        // --- СТАВИМ ЛАЙК ---
        likedSites.push(siteId);
        btnElement.classList.add('active');
        const newCount = currentCount + 1;
        btnElement.innerHTML = `❤️ <span>${newCount}</span>`;
        globalLikesMap[siteId] = newCount;

        fetch(`${SUPABASE_URL}/rest/v1/likes`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'apikey': SUPABASE_KEY, 
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Prefer': 'resolution=merge-duplicates'
            },
            body: JSON.stringify({ site_id: siteId, likes_count: newCount })
        }).catch(err => console.error("Ошибка сети при отправке лайка:", err));
    }
    localStorage.setItem('myLikes', JSON.stringify(likedSites));
};

// --- ФИЛЬТРЫ В ШАПКЕ ---
bookmarksBtn.onclick = () => {
    showOnlyBookmarks = !showOnlyBookmarks;
    // Если включили закладки, выключаем лайки (чтобы они не конфликтовали)
    if (showOnlyBookmarks) {
        showOnlyLikes = false;
        likesBtn.classList.remove('active');
    }
    bookmarksBtn.classList.toggle('active', showOnlyBookmarks);
    currentCategory = ui[currentLang].all;
    window.location.hash = '';
    updateUI();
};

likesBtn.onclick = () => {
    showOnlyLikes = !showOnlyLikes;
    // Если включили лайки, выключаем закладки
    if (showOnlyLikes) {
        showOnlyBookmarks = false;
        bookmarksBtn.classList.remove('active');
    }
    likesBtn.classList.toggle('active', showOnlyLikes);
    currentCategory = ui[currentLang].all;
    window.location.hash = '';
    updateUI();
};

// --- Детальный вид ---
window.openDetail = function(siteId, updateHash = true) { 
    const site = sitesData.find(s => s.id === siteId);
    if (!site) return;

    if (updateHash) window.location.hash = `#tool=${siteId}`;

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

    const similar = sitesData.filter(s => s.category[currentLang] === site.category[currentLang] && s.id !== site.id).slice(0, 3);
    similarToolsContainer.innerHTML = '';
    similar.forEach(s => {
        const simCard = document.createElement('div');
        simCard.className = 'card';
        simCard.innerHTML = `<h4>${s.name}</h4><p style="font-size:12px">${s.desc[currentLang]}</p>`;
        simCard.onclick = () => window.location.hash = `#tool=${s.id}`;
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
    if (!showOnlyBookmarks && !showOnlyLikes) toolOfWeekContainer.classList.remove('hidden');
};

backBtn.onclick = () => closeDetail(true);

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
    window.location.hash = `#tool=${sitesData[randomIndex].id}`;
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

// --- ЗАПУСК ---
if (likesLoader) likesLoader.style.display = 'inline-flex'; 

handleHash(); 

loadLikes().then(() => {
    isLikesLoaded = true; 
    if (likesLoader) likesLoader.style.display = 'none'; 
    updateLikesOnLiveCards(); 
});
