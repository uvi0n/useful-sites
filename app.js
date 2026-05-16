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
const viewToggle = document.getElementById('viewToggle');
const likesBtn = document.getElementById('likesBtn');
const similarToolsContainer = document.getElementById('similar-tools');
const sortContainer = document.getElementById('sortContainer');

// Новые элементы для Стеков и Рулетки
const stackBtn = document.getElementById('stackBtn');
const stackManagerPanel = document.getElementById('stackManagerPanel');
const stackSelect = document.getElementById('stackSelect');
const createStackBtn = document.getElementById('createStackBtn');
const deleteStackBtn = document.getElementById('deleteStackBtn');
const shareStackBtn = document.getElementById('shareStackBtn');
const rouletteModal = document.getElementById('rouletteModal');
const rouletteTrack = document.getElementById('rouletteTrack');

// Модалки
const suggestModal = document.getElementById('suggestModal');
const changelogModal = document.getElementById('changelogModal');

// Ключи
const SUPABASE_URL = 'https://nrloiaytvvpghfahjphz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ybG9pYXl0dnZwZ2hmYWhqcGh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjQ4MjcsImV4cCI6MjA5NDQ0MDgyN30.lFirc7ueW0LEHBk4Rv_VyqbkwHsc4GWIyu7_pkKEPd8';

// Глобальные объекты и флаги
let globalLikesMap = {};
let globalClicksMap = {};
let isLikesLoaded = false;

const ui = {
    ru: { 
        searchPlaceholder: "Поиск (имя, теги)...", all: "Все", found: "Найдено: ", anyPrice: "Любая цена", free: "Бесплатно", freemium: "Частично бесплатно", paid: "Платно", ad: "Нашли ошибку? По вопросам рекламы: ", openBtn: "Открыть", visitBtn: "Перейти на сайт", pros: "Плюсы", cons: "Минусы", back: "⬅ Назад",
        sortLabel: "Сортировка:", sortDefault: "По умолчанию", sortTop: "🔥 Топ (по лайкам)", sortPopular: "⚡️ Популярные", similarTools: "Похожие инструменты", pinTitle: "Закрепить / Открепить",
        stackLabel: "Текущий стек:", createStackPrompt: "Введите название нового стека:"
    },
    en: { 
        searchPlaceholder: "Search (name, tags)...", all: "All", found: "Found: ", anyPrice: "Any Price", free: "Free", freemium: "Partially free", paid: "Paid", ad: "Found an error? For advertising: ", openBtn: "Open", visitBtn: "Visit Site", pros: "Pros", cons: "Cons", back: "⬅ Back",
        sortLabel: "Sort by:", sortDefault: "Default", sortTop: "🔥 Top (by likes)", sortPopular: "⚡️ Popular", similarTools: "Similar tools", pinTitle: "Pin / Unpin",
        stackLabel: "Current stack:", createStackPrompt: "Enter new stack name:"
    }
};

let currentLang = localStorage.getItem('lang') || 'ru';
let currentTheme = localStorage.getItem('theme') || 'dark';
let currentCategory = 'Все';
let currentPrice = 'all'; 

// Флаги фильтров, сортировки и стеков
let showOnlyBookmarks = false;
let showOnlyLikes = false; 
let currentSort = 'default';
let currentView = localStorage.getItem('view') || 'grid';
let currentStack = []; // Хранилище для сайтов из переданной ссылки #stack=...

// Инициализация LocalStorage для Закладок, Лайков, Пинов и Стеков
let bookmarks = JSON.parse(localStorage.getItem('myBookmarks')) || [];
let likedSites = JSON.parse(localStorage.getItem('myLikes')) || [];
let pinnedSites = JSON.parse(localStorage.getItem('myPins')) || [];

let myStacks = JSON.parse(localStorage.getItem('myStacks')) || { "Основной стек": [] };
let activeStackName = localStorage.getItem('activeStackName') || "Основной стек";
let showOnlyStack = false; 

if (currentTheme === 'dark') document.body.setAttribute('data-theme', 'dark');
langToggle.textContent = currentLang === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN';

// --- Работа с Supabase ---
async function loadLikes() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/likes?select=site_id,likes_count,clicks_count`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        data.forEach(item => {
            globalLikesMap[item.site_id] = item.likes_count;
            globalClicksMap[item.site_id] = item.clicks_count || 0;
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

    const clickSpans = container.querySelectorAll('.clicks-count');
    clickSpans.forEach(span => {
        const siteId = span.getAttribute('data-site');
        if (siteId) {
            span.textContent = globalClicksMap[siteId] !== undefined ? globalClicksMap[siteId] : 0;
        }
    });
}

// --- Роутинг (Hash-навигация) ---
function handleHash() {
    const hash = decodeURIComponent(window.location.hash.substring(1));
    
    if (hash.startsWith('tool=')) {
        const siteId = hash.replace('tool=', '');
        openDetail(siteId, false);
    } else if (hash.startsWith('category=')) {
        currentStack = []; 
        currentCategory = hash.replace('category=', '');
        closeDetail(false);
        updateUI();
    } else if (hash.startsWith('stack=')) {
        currentStack = hash.replace('stack=', '').split(',');
        currentCategory = ui[currentLang].all; 
        closeDetail(false);
        updateUI();
        if (searchInput) searchInput.value = currentLang === 'ru' ? "Сборка пользователя 📦" : "Shared Stack 📦";
    } else {
        currentStack = []; 
        closeDetail(false);
        updateUI();
    }
}
window.addEventListener('hashchange', handleHash);

// --- Инициализация интерфейса ---
function updateUI() {
    searchInput.placeholder = ui[currentLang].searchPlaceholder;
    backBtn.textContent = ui[currentLang].back;
    
    const sortLabelText = document.querySelector('.sort-label');
    if (sortLabelText) sortLabelText.textContent = ui[currentLang].sortLabel;

    const btnDefault = document.querySelector('.sort-btn[data-sort="default"]');
    if (btnDefault) btnDefault.textContent = ui[currentLang].sortDefault;

    const btnTop = document.querySelector('.sort-btn[data-sort="top"]');
    if (btnTop) btnTop.textContent = ui[currentLang].sortTop;

    const btnPopular = document.querySelector('.sort-btn[data-sort="popular"]') || document.querySelector('.sort-btn[data-sort="new"]');
    if (btnPopular) btnPopular.textContent = ui[currentLang].sortPopular;

    const similarTitle = document.getElementById('similar-title');
    if (similarTitle) similarTitle.textContent = ui[currentLang].similarTools;
    
    if (!window.location.hash.startsWith('#category=')) {
        currentCategory = ui[currentLang].all; 
    }
    
    renderFilters();
    renderPriceFilters();
    filterData();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

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
        
        const matchesBookmarks = showOnlyBookmarks ? bookmarks.includes(site.id) : true;
        const matchesLikes = showOnlyLikes ? likedSites.includes(site.id) : true;
        
        const matchesStackLink = currentStack.length > 0 ? currentStack.includes(site.id) : true;
        const matchesCustomStack = showOnlyStack ? (myStacks[activeStackName] || []).includes(site.id) : true;
        
        return matchesCategory && matchesSearch && matchPrice && matchesBookmarks && matchesLikes && matchesStackLink && matchesCustomStack; 
    });

    if (currentSort === 'top') {
        filtered.sort((a, b) => (globalLikesMap[b.id] || 0) - (globalLikesMap[a.id] || 0));
   } else if (currentSort === 'popular') {
        filtered.sort((a, b) => (globalClicksMap[b.id] || 0) - (globalClicksMap[a.id] || 0));
    } else if (currentSort === 'default') {
        shuffleArray(filtered);
    }

    if (showOnlyBookmarks || showOnlyLikes || showOnlyStack) {
        filtered.sort((a, b) => {
            const aPinned = pinnedSites.includes(a.id);
            const bPinned = pinnedSites.includes(b.id);
            if (aPinned && !bPinned) return -1;
            if (!aPinned && bPinned) return 1; 
            return 0; 
        });
    }
    
    if (statsCounter) statsCounter.textContent = `${ui[currentLang].found} ${filtered.length}`;
    container.innerHTML = '';
    
    if (filtered.length === 0) {
        container.innerHTML = `<h3>${currentLang === 'ru' ? 'Ничего не найдено 😢' : 'Nothing found 😢'}</h3>`;
        return;
    }

    const showAd = currentCategory === ui[currentLang].all && currentPrice === 'all' && !showOnlyBookmarks && !showOnlyLikes && !showOnlyStack && currentStack.length === 0;

    filtered.forEach((site, index) => {
        if (index === 1 && showAd) {
            const adCard = document.createElement('a');
            adCard.href = "https://mail.google.com/mail/?view=cm&fs=1&to=inianovbob@gmail.com&su=Реклама%20на%20free-webtools";
            adCard.target = "_blank";
            adCard.className = "card ad-card-grid";
            adCard.innerHTML = `
                <div class="ad-card-icon">🎯</div>
                <div class="ad-card-title">${currentLang === 'ru' ? 'Здесь может быть ваша реклама' : 'Place your ad here'}</div>
                <div class="ad-card-link">inianovbob@gmail.com</div>
            `;
            container.appendChild(adCard);
        }

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
        const isPinned = pinnedSites.includes(site.id); 
        const isStackActive = (myStacks[activeStackName] || []).includes(site.id);
        
        const actualLikes = isLikesLoaded ? (globalLikesMap[site.id] !== undefined ? globalLikesMap[site.id] : 0) : '...';
        const actualClicks = isLikesLoaded ? (globalClicksMap[site.id] !== undefined ? globalClicksMap[site.id] : 0) : '...';

        card.innerHTML = `
            ${(showOnlyBookmarks || showOnlyLikes || showOnlyStack) ? `
            <button class="pin-btn" onclick="event.stopPropagation(); togglePin('${site.id}', this)" title="${ui[currentLang].pinTitle}">
                ${isPinned ? '📌' : '📍'}
            </button>
            ` : ''}
            
            <div class="card-header">
                ${badgeHtml}
                <div>
                    <span class="category">${site.category[currentLang]}</span>
                    ${priceHtml}
                </div>
                <img src="${logoUrl}" alt="" class="site-logo" loading="lazy" onerror="this.style.display='none'">
            </div>
            <h3>${site.name}</h3>
            <a href="${site.url}" target="_blank" class="site-link" onclick="event.stopPropagation(); trackClick('${site.id}')">${site.url}</a>
            <div class="tags">${tagsHtml}</div>
            <p class="desc">${site.desc[currentLang]}</p>
            
            <div class="card-actions" onclick="event.stopPropagation()">
                <button class="action-btn like-btn ${isLiked ? 'active' : ''}" onclick="toggleLike('${site.id}', this)" title="Лайк">
                    ${isLiked ? '❤️' : '🤍'} <span>${actualLikes}</span>
                </button>
                
                <button class="action-btn bookmark-btn ${isBookmarked ? 'active' : ''}" onclick="toggleBookmark('${site.id}', this)" title="В закладки">
                    ${isBookmarked ? '⭐' : '☆'}
                </button>

                <button class="action-btn stack-card-btn ${isStackActive ? 'active' : ''}" onclick="toggleStackSite('${site.id}', this)" title="Добавить в текущий стек">
                    📁
                </button>

                <div class="action-btn view-btn" style="cursor: default;" title="Переходы на сайт">
                    ↗️ <span class="clicks-count" data-site="${site.id}">${actualClicks}</span>
                </div>
                
                <a href="${site.url}" target="_blank" class="btn" style="padding: 6px 12px; font-size: 12px;" onclick="trackClick('${site.id}')">${ui[currentLang].openBtn}</a>
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
            body: JSON.stringify({ site_id: siteId, likes_count: newCount, clicks_count: globalClicksMap[siteId] || 0 })
        }).catch(err => console.error("Ошибка сети:", err));
        
        if (showOnlyLikes) filterData();
    } else {
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
            body: JSON.stringify({ site_id: siteId, likes_count: newCount, clicks_count: globalClicksMap[siteId] || 0 })
        }).catch(err => console.error("Ошибка сети:", err));
    }
    localStorage.setItem('myLikes', JSON.stringify(likedSites));
};

// --- ФИЛЬТРЫ В ШАПКЕ ---
bookmarksBtn.onclick = () => {
    showOnlyBookmarks = !showOnlyBookmarks;
    if (showOnlyBookmarks) {
        showOnlyLikes = false; showOnlyStack = false;
        likesBtn.classList.remove('active');
        if (stackBtn) stackBtn.classList.remove('active');
        if (stackManagerPanel) stackManagerPanel.classList.add('hidden');
    }
    bookmarksBtn.classList.toggle('active', showOnlyBookmarks);
    currentCategory = ui[currentLang].all;
    window.location.hash = '';
    updateUI();
};

likesBtn.onclick = () => {
    showOnlyLikes = !showOnlyLikes;
    if (showOnlyLikes) {
        showOnlyBookmarks = false; showOnlyStack = false;
        bookmarksBtn.classList.remove('active');
        if (stackBtn) stackBtn.classList.remove('active');
        if (stackManagerPanel) stackManagerPanel.classList.add('hidden');
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
            <a href="${site.url}" target="_blank" class="btn" onclick="trackClick('${site.id}')">${ui[currentLang].visitBtn}</a>
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
    if(sortContainer) sortContainer.classList.add('hidden');
    if(stackManagerPanel) stackManagerPanel.classList.add('hidden');
    detailView.classList.remove('hidden');
    window.scrollTo(0, 0);
};

window.closeDetail = function(updateHash = true) {
    if (updateHash) window.location.hash = '';
    detailView.classList.add('hidden');
    if(sortContainer) sortContainer.classList.remove('hidden');
    if(showOnlyStack && stackManagerPanel) stackManagerPanel.classList.remove('hidden');
    container.classList.remove('hidden');
};

backBtn.onclick = () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        closeDetail(true);
    }
};

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

// --- КНОПКИ СОРТИРОВКИ ---
const sortBtns = document.querySelectorAll('.sort-btn');
if (sortContainer) {
    sortBtns.forEach(btn => {
        btn.onclick = () => {
            if(btn.id === 'stackSelect') return; // Пропускаем селект стека
            sortBtns.forEach(b => { if(b.id !== 'stackSelect') b.classList.remove('active') });
            btn.classList.add('active');
            currentSort = btn.getAttribute('data-sort');
            
            // Если был открыт чужой стек по ссылке — сбрасываем его при сортировке
            if (window.location.hash.includes('stack=')) {
                currentStack = [];
                window.location.hash = '';
                searchInput.value = '';
            }
            filterData();
        };
    });
}

// --- ПЕРЕКЛЮЧАТЕЛЬ ВИДА (СЕТКА / СПИСОК) ---
if (currentView === 'list') {
    container.classList.add('list-view');
    if (viewToggle) viewToggle.textContent = '🔲'; 
}

if (viewToggle) {
    viewToggle.onclick = () => {
        if (currentView === 'grid') {
            currentView = 'list';
            container.classList.add('list-view');
            viewToggle.textContent = '🔲'; 
        } else {
            currentView = 'grid';
            container.classList.remove('list-view');
            viewToggle.textContent = '📋'; 
        }
        localStorage.setItem('view', currentView); 
    };
}

// --- УЧЕТ КЛИКОВ (ПРОСМОТРОВ) ---
window.trackClick = function(siteId) {
    let currentClicks = globalClicksMap[siteId] || 0;
    let currentLikes = globalLikesMap[siteId] || 0;
    
    currentClicks += 1;
    globalClicksMap[siteId] = currentClicks;

    const clickSpans = document.querySelectorAll(`.clicks-count[data-site="${siteId}"]`);
    clickSpans.forEach(span => span.textContent = currentClicks);

    fetch(`${SUPABASE_URL}/rest/v1/likes`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'apikey': SUPABASE_KEY, 
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify({ site_id: siteId, likes_count: currentLikes, clicks_count: currentClicks })
    }).catch(err => console.error("Ошибка сети:", err));
};

// --- ЗАКРЕПЛЕНИЕ САЙТОВ НАВЕРХУ (ПИНЫ) ---
window.togglePin = function(siteId, btnElement) {
    if (pinnedSites.includes(siteId)) {
        pinnedSites = pinnedSites.filter(id => id !== siteId);
    } else {
        pinnedSites.push(siteId);
    }
    localStorage.setItem('myPins', JSON.stringify(pinnedSites));
    filterData();
};

// --- БЫСТРЫЕ ТЕГИ ---
document.querySelectorAll('.quick-tag').forEach(tag => {
    tag.onclick = () => {
        searchInput.value = tag.getAttribute('data-tag');
        filterData();
    };
});

// --- УПРАВЛЕНИЕ КАСТОМНЫМИ СТЕКАМИ ---
function updateStackSelect() {
    if(!stackSelect) return;
    stackSelect.innerHTML = '';
    Object.keys(myStacks).forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        if(name === activeStackName) opt.selected = true;
        stackSelect.appendChild(opt);
    });
}

if (stackBtn) {
    stackBtn.onclick = () => {
        showOnlyStack = !showOnlyStack;
        if (showOnlyStack) {
            showOnlyLikes = false; showOnlyBookmarks = false;
            if (likesBtn) likesBtn.classList.remove('active'); 
            if (bookmarksBtn) bookmarksBtn.classList.remove('active');
        }
        stackBtn.classList.toggle('active', showOnlyStack);
        if (stackManagerPanel) stackManagerPanel.classList.toggle('hidden', !showOnlyStack);
        updateStackSelect();
        updateUI();
    };
}

if (stackSelect) {
    stackSelect.onchange = (e) => {
        activeStackName = e.target.value;
        localStorage.setItem('activeStackName', activeStackName);
        filterData();
    };
}

if (createStackBtn) {
    createStackBtn.onclick = () => {
        const name = prompt(ui[currentLang].createStackPrompt);
        if (name && name.trim()) {
            const trimmedName = name.trim();
            if (!myStacks[trimmedName]) myStacks[trimmedName] = [];
            activeStackName = trimmedName;
            localStorage.setItem('myStacks', JSON.stringify(myStacks));
            localStorage.setItem('activeStackName', activeStackName);
            updateStackSelect();
            filterData();
        }
    };
}

if (deleteStackBtn) {
    deleteStackBtn.onclick = () => {
        if (Object.keys(myStacks).length <= 1) {
            alert("Нельзя удалить последний стек!");
            return;
        }
        delete myStacks[activeStackName];
        activeStackName = Object.keys(myStacks)[0];
        localStorage.setItem('myStacks', JSON.stringify(myStacks));
        localStorage.setItem('activeStackName', activeStackName);
        updateStackSelect();
        filterData();
    };
}

window.toggleStackSite = function(siteId, btnElement) {
    if (!myStacks[activeStackName]) myStacks[activeStackName] = [];
    
    if (myStacks[activeStackName].includes(siteId)) {
        myStacks[activeStackName] = myStacks[activeStackName].filter(id => id !== siteId);
        btnElement.classList.remove('active');
    } else {
        myStacks[activeStackName].push(siteId);
        btnElement.classList.add('active');
    }
    localStorage.setItem('myStacks', JSON.stringify(myStacks));
    if (showOnlyStack) filterData();
};

if (shareStackBtn) {
    shareStackBtn.onclick = () => {
        const currentItems = myStacks[activeStackName] || [];
        if (currentItems.length === 0) {
            alert(currentLang === 'ru' ? 'Добавьте сайты (через иконку 📁) в этот стек перед отправкой!' : 'Add sites (via 📁 icon) to this stack first!');
            return;
        }
        const stackUrl = `${window.location.origin}${window.location.pathname}#stack=${currentItems.join(',')}`;
        navigator.clipboard.writeText(stackUrl).then(() => {
            const originalText = shareStackBtn.textContent;
            shareStackBtn.textContent = '✅ Ссылка скопирована!';
            setTimeout(() => shareStackBtn.textContent = originalText, 2000);
        });
    };
}

// --- РУЛЕТКА В СТИЛЕ CS:GO ---
if (randomBtn && rouletteModal && rouletteTrack) {
    randomBtn.onclick = () => {
        const pool = sitesData; 
        if(pool.length === 0) return;

        rouletteTrack.style.transition = 'none';
        rouletteTrack.style.transform = 'translateX(0px)';
        rouletteTrack.innerHTML = '';

        const itemCount = 35;
        const winningIndex = 28; 
        let itemsHTML = '';
        let targetItems = [];

        for (let i = 0; i < itemCount; i++) {
            const randomSite = pool[Math.floor(Math.random() * pool.length)];
            targetItems.push(randomSite);
            
            const domain = new URL(randomSite.url).hostname;
            const logo = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

            itemsHTML += `
                <div class="roulette-item">
                    <img src="${logo}" alt="" onerror="this.src='🎯'">
                    <span>${randomSite.name}</span>
                </div>
            `;
        }
        rouletteTrack.innerHTML = itemsHTML;
        rouletteModal.showModal();

        const itemWidth = 140; 
        const wrapperWidth = 660; 
        const stopPosition = (winningIndex * itemWidth) - (wrapperWidth / 2) + (itemWidth / 2);

        setTimeout(() => {
            rouletteTrack.style.transition = 'transform 4s cubic-bezier(0.1, 1, 0.1, 1)';
            rouletteTrack.style.transform = `translateX(-${stopPosition}px)`;
        }, 50);

        setTimeout(() => {
            rouletteModal.close();
            const winner = targetItems[winningIndex];
            window.location.hash = `#tool=${winner.id}`;
        }, 4100);
    };
}

// --- ЗАПУСК ---
if (likesLoader) likesLoader.style.display = 'inline-flex'; 

handleHash(); 

loadLikes().then(() => {
    isLikesLoaded = true; 
    if (likesLoader) likesLoader.style.display = 'none'; 
    if (currentSort === 'top') filterData(); 
    updateLikesOnLiveCards(); 
});
