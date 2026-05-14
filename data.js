const sitesData = [
    // --- НЕЙРОСЕТИ (AI) ---
    {
        name: "Google AI Studio",
        url: "https://aistudio.google.com/",
        price: "free",
        category: { ru: "Нейросети", en: "AI" },
        desc: { ru: "Бесплатный доступ к топовым моделям Gemini.", en: "Free access to top Gemini models." },
        fullDesc: { ru: "Официальная песочница от Google, где можно тестировать запросы к нейросети Gemini абсолютно бесплатно, а также получать API-ключи.", en: "Google's official sandbox to test Gemini API models for free." },
        pros: { ru: ["Полностью бесплатно", "Работает с фото и видео"], en: ["Completely free", "Multimodal"] },
        cons: { ru: ["В РФ нужен VPN"], en: ["VPN needed in some regions"] },
        keywords: ["ai", "google", "gemini", "api"]
    },
    {
        name: "ChatGPT",
        url: "https://chatgpt.com/",
        price: "freemium",
        category: { ru: "Нейросети", en: "AI" },
        desc: { ru: "Самая популярная нейросеть в мире.", en: "The most popular AI in the world." },
        fullDesc: { ru: "Универсальный помощник от OpenAI. Пишет код, сочиняет тексты, анализирует данные и помогает в обучении.", en: "Universal assistant by OpenAI. Writes code, texts, analyzes data." },
        pros: { ru: ["Лучшее понимание контекста", "Огромная база знаний"], en: ["Best context understanding", "Huge knowledge base"] },
        cons: { ru: ["Лучшая модель (GPT-4) платная"], en: ["Best model is paid"] },
        keywords: ["chatgpt", "openai", "текст", "код", "ai"]
    },
    {
        name: "Leonardo.ai",
        url: "https://leonardo.ai/",
        price: "freemium",
        category: { ru: "Нейросети", en: "AI" },
        desc: { ru: "Генерация крутых артов и текстур.", en: "High-quality art generation." },
        fullDesc: { ru: "Мощная платформа для создания изображений. Идеально подходит для концепт-артов, текстур и дизайна персонажей.", en: "Powerful platform for creating images. Great for concept art and textures." },
        pros: { ru: ["Ежедневные бесплатные токены", "Много настроек"], en: ["Daily free tokens", "Advanced settings"] },
        cons: { ru: ["Сложный интерфейс для новичков"], en: ["Steep learning curve"] },
        keywords: ["art", "картинки", "дизайн", "генерация"]
    },
    {
        name: "Midjourney",
        url: "https://midjourney.com/",
        price: "paid",
        category: { ru: "Нейросети", en: "AI" },
        desc: { ru: "Фотореалистичные изображения по тексту.", en: "Photorealistic images from text." },
        fullDesc: { ru: "Безоговорочный лидер в генерации картинок. Создает невероятно красивые и детализированные изображения любого стиля.", en: "Absolute leader in image generation. Creates incredibly beautiful images." },
        pros: { ru: ["Непревзойденное качество", "Понимание сложных стилей"], en: ["Unmatched quality", "Understands complex styles"] },
        cons: { ru: ["Нет бесплатной версии", "Работает через Discord"], en: ["No free version", "Works via Discord"] },
        keywords: ["mj", "фото", "арт", "нейросеть"]
    },
    {
        name: "Suno AI",
        url: "https://suno.com/",
        price: "freemium",
        category: { ru: "Нейросети", en: "AI" },
        desc: { ru: "Создание полноценных песен с вокалом.", en: "Create full songs with vocals." },
        fullDesc: { ru: "Нейросеть, которая за секунды генерирует песни в любом жанре (рок, поп, рэп) с отличным вокалом и музыкой по вашему тексту.", en: "AI that generates songs in any genre with great vocals based on your text." },
        pros: { ru: ["Отличное качество музыки", "50 бесплатных кредитов в день"], en: ["Great music quality", "50 free daily credits"] },
        cons: { ru: ["Иногда вокал звучит как робот"], en: ["Vocals can sometimes sound robotic"] },
        keywords: ["музыка", "песни", "звук", "вокал"]
    },
    {
        name: "Perplexity",
        url: "https://www.perplexity.ai/",
        price: "freemium",
        category: { ru: "Нейросети", en: "AI" },
        desc: { ru: "ИИ-поисковик с реальными ссылками.", en: "AI search engine with citations." },
        fullDesc: { ru: "Замена Google. Ищет информацию в интернете и выдает готовый ответ со ссылками на источники. Не придумывает факты.", en: "Google alternative. Searches the web and gives compiled answers with sources." },
        pros: { ru: ["Не галлюцинирует", "Удобно для ресерча"], en: ["No hallucinations", "Great for research"] },
        cons: { ru: ["Иногда не находит глубокую информацию"], en: ["Sometimes misses deep info"] },
        keywords: ["поиск", "google", "ресерч", "факты"]
    },

    // --- ДИЗАЙН (DESIGN) ---
    {
        name: "Figma",
        url: "https://www.figma.com/",
        price: "freemium",
        category: { ru: "Дизайн", en: "Design" },
        desc: { ru: "Стандарт индустрии для веб-дизайна.", en: "Industry standard for web design." },
        fullDesc: { ru: "Главный инструмент дизайнеров. Позволяет создавать интерфейсы сайтов, приложений и прототипы прямо в браузере.", en: "Main tool for designers to create interfaces and prototypes in the browser." },
        pros: { ru: ["Бесплатно для старта", "Совместная работа"], en: ["Free to start", "Collaboration features"] },
        cons: { ru: ["Требует времени на изучение"], en: ["Takes time to learn"] },
        keywords: ["дизайн", "ui", "ux", "интерфейс"]
    },
    {
        name: "Photopea",
        url: "https://www.photopea.com/",
        price: "free",
        category: { ru: "Дизайн", en: "Design" },
        desc: { ru: "Бесплатный клон Photoshop в браузере.", en: "Free browser-based Photoshop clone." },
        fullDesc: { ru: "Полноценный графический редактор, который открывает файлы PSD, AI, XD. Имеет почти все функции классического Фотошопа.", en: "Full graphic editor that opens PSD, AI files. Has almost all PS features." },
        pros: { ru: ["Поддержка PSD", "Не нужно устанавливать"], en: ["PSD support", "No installation needed"] },
        cons: { ru: ["Есть рекламный баннер сбоку"], en: ["Has ad banner on the side"] },
        keywords: ["фотошоп", "редактор", "psd", "фото"]
    },
    {
        name: "Cleanup.pictures",
        url: "https://cleanup.pictures/",
        price: "freemium",
        category: { ru: "Дизайн", en: "Design" },
        desc: { ru: "Удаление объектов с фото за секунды.", en: "Remove objects from photos in seconds." },
        fullDesc: { ru: "Умный ластик на базе ИИ. Закрасьте лишний объект, человека или текст, и нейросеть аккуратно его удалит.", en: "AI-powered eraser. Paint over an object and AI removes it seamlessly." },
        pros: { ru: ["Очень быстро", "Не требует регистрации"], en: ["Very fast", "No registration"] },
        cons: { ru: ["HD-качество только в платной версии"], en: ["HD quality is paid"] },
        keywords: ["фото", "ластик", "ретушь", "удалить"]
    },
    {
        name: "Coolors",
        url: "https://coolors.co/",
        price: "freemium",
        category: { ru: "Дизайн", en: "Design" },
        desc: { ru: "Генератор идеальных цветовых палитр.", en: "Perfect color palette generator." },
        fullDesc: { ru: "Супербыстрый инструмент для создания цветовых схем. Нажимаете пробел — получаете новые цвета, которые идеально сочетаются.", en: "Superfast tool to generate matching color palettes by pressing space." },
        pros: { ru: ["Экспорт в CSS", "Огромная библиотека"], en: ["Export to CSS", "Huge library"] },
        cons: { ru: ["Реклама в бесплатной версии"], en: ["Ads in free version"] },
        keywords: ["цвет", "палитра", "css", "стиль"]
    },
    {
        name: "Remove.bg",
        url: "https://remove.bg",
        price: "freemium",
        category: { ru: "Дизайн", en: "Design" },
        desc: { ru: "Идеальное удаление фона с фото.", en: "Perfect background removal." },
        fullDesc: { ru: "Сервис использует ИИ для вырезания главного объекта. Идеально для подготовки портретов и коллажей.", en: "Uses AI to cut out the main object. Great for portraits and collages." },
        pros: { ru: ["Работает без кликов", "Идеально вырезает волосы"], en: ["Zero clicks", "Cuts hair perfectly"] },
        cons: { ru: ["Бесплатное скачивание в низком разрешении"], en: ["Free download is low res"] },
        keywords: ["фон", "вырезать", "png", "фото"]
    },
    {
        name: "Unsplash",
        url: "https://unsplash.com/",
        price: "free",
        category: { ru: "Дизайн", en: "Design" },
        desc: { ru: "Бесплатные стоковые фото высокого качества.", en: "Free high-quality stock photos." },
        fullDesc: { ru: "Огромная библиотека профессиональных фотографий, которые можно использовать бесплатно даже в коммерческих целях.", en: "Huge library of professional photos free for commercial use." },
        pros: { ru: ["Невероятное качество", "Без лицензионных ограничений"], en: ["Incredible quality", "No license restrictions"] },
        cons: { ru: ["Много заезженных картинок"], en: ["Some photos are overused"] },
        keywords: ["фото", "сток", "картинки", "фон"]
    },
    {
        name: "Fontjoy",
        url: "https://fontjoy.com/",
        price: "free",
        category: { ru: "Дизайн", en: "Design" },
        desc: { ru: "ИИ-генератор сочетаний шрифтов.", en: "AI font pairing generator." },
        fullDesc: { ru: "Помогает подобрать шрифты (заголовок, подзаголовок, текст), которые идеально смотрятся вместе на сайте.", en: "Helps pair fonts (header, subheader, body) that look great together." },
        pros: { ru: ["Очень просто использовать", "Интеграция с Google Fonts"], en: ["Very easy to use", "Google Fonts integration"] },
        cons: { ru: ["Иногда выдает странные результаты"], en: ["Sometimes gives weird results"] },
        keywords: ["шрифты", "типографика", "текст"]
    },

    // --- ИНСТРУМЕНТЫ (TOOLS) ---
    {
        name: "iLovePDF",
        url: "https://www.ilovepdf.com/",
        price: "freemium",
        category: { ru: "Инструменты", en: "Tools" },
        desc: { ru: "Всё, что можно сделать с PDF файлами.", en: "Everything you can do with PDF files." },
        fullDesc: { ru: "Универсальный комбайн: объединить, разделить, сжать, конвертировать в Word/Excel/JPG и разблокировать PDF.", en: "Universal tool: merge, split, compress, convert to Word/Excel/JPG." },
        pros: { ru: ["Много функций", "Простой интерфейс"], en: ["Many features", "Simple UI"] },
        cons: { ru: ["Ограничения на размер в бесплатной версии"], en: ["Size limits in free version"] },
        keywords: ["pdf", "сжать", "конвертер", "ворд"]
    },
    {
        name: "WeTransfer",
        url: "https://wetransfer.com/",
        price: "freemium",
        category: { ru: "Инструменты", en: "Tools" },
        desc: { ru: "Отправка тяжелых файлов (до 2 ГБ).", en: "Send heavy files (up to 2GB)." },
        fullDesc: { ru: "Самый быстрый способ передать тяжелый файл клиенту или другу. Загружаете файл — получаете короткую ссылку.", en: "Fastest way to send large files. Upload and get a short link." },
        pros: { ru: ["Без регистрации", "Красивый интерфейс"], en: ["No registration", "Beautiful UI"] },
        cons: { ru: ["Файлы удаляются через 7 дней"], en: ["Files expire in 7 days"] },
        keywords: ["файлы", "обменник", "ссылка", "передача"]
    },
    {
        name: "TinyPNG",
        url: "https://tinypng.com/",
        price: "freemium",
        category: { ru: "Инструменты", en: "Tools" },
        desc: { ru: "Сжатие картинок без потери качества.", en: "Image compression without quality loss." },
        fullDesc: { ru: "Уменьшает вес PNG, JPG и WebP файлов на 50-80%, визуально сохраняя идеальное качество. Мастхэв для сайтов.", en: "Reduces image weight by 50-80% keeping perfect visual quality." },
        pros: { ru: ["Милая панда", "Лучший алгоритм сжатия"], en: ["Cute panda", "Best compression algorithm"] },
        cons: { ru: ["Максимум 20 файлов за раз"], en: ["Max 20 files at once"] },
        keywords: ["сжатие", "png", "jpg", "оптимизация"]
    },
    {
        name: "CloudConvert",
        url: "https://cloudconvert.com/",
        price: "freemium",
        category: { ru: "Инструменты", en: "Tools" },
        desc: { ru: "Конвертер «всё во всё».", en: "Convert everything to everything." },
        fullDesc: { ru: "Поддерживает более 200 форматов (аудио, видео, документы, архивы). Отлично справляется с редкими форматами.", en: "Supports 200+ formats. Great for rare file types." },
        pros: { ru: ["Поддерживает вообще всё", "Высокое качество"], en: ["Supports everything", "High quality"] },
        cons: { ru: ["Лимит 25 конвертаций в день бесплатно"], en: ["Limit 25 conversions/day free"] },
        keywords: ["конвертер", "формат", "видео", "аудио"]
    },
    {
        name: "Notion",
        url: "https://www.notion.so/",
        price: "freemium",
        category: { ru: "Инструменты", en: "Tools" },
        desc: { ru: "Универсальное рабочее пространство.", en: "All-in-one workspace." },
        fullDesc: { ru: "Заметки, базы данных, канбан-доски, календари — всё в одном месте. Идеально для планирования жизни и проектов.", en: "Notes, databases, boards, calendars. Perfect for planning." },
        pros: { ru: ["Невероятная гибкость", "Красивый дизайн"], en: ["Incredible flexibility", "Beautiful design"] },
        cons: { ru: ["Медленно работает без интернета"], en: ["Slow without internet"] },
        keywords: ["заметки", "планирование", "база", "таск-трекер"]
    },

    // --- РАЗРАБОТКА (DEV) ---
    {
        name: "Roadmap.sh",
        url: "https://roadmap.sh/",
        price: "free",
        category: { ru: "Разработка", en: "Dev" },
        desc: { ru: "Пошаговые планы развития разработчиков.", en: "Step-by-step developer roadmaps." },
        fullDesc: { ru: "Визуальные дорожные карты, показывающие, какие технологии учить шаг за шагом (Frontend, Backend, Flutter и т.д.).", en: "Visual roadmaps showing what tech to learn step by step." },
        pros: { ru: ["Идеально для новичков", "Постоянно обновляется"], en: ["Perfect for beginners", "Always updated"] },
        cons: { ru: ["Нет курсов, только план"], en: ["Only roadmaps, no courses"] },
        keywords: ["учеба", "путь", "программирование", "карта"]
    },
    {
        name: "Can I Use",
        url: "https://caniuse.com/",
        price: "free",
        category: { ru: "Разработка", en: "Dev" },
        desc: { ru: "Проверка поддержки CSS/JS в браузерах.", en: "Check CSS/JS support in browsers." },
        fullDesc: { ru: "Справочник, который показывает, будет ли конкретная фишка (например, CSS Grid) работать в старых версиях Safari или Chrome.", en: "Shows if a specific web feature works in various browser versions." },
        pros: { ru: ["Сверхточная статистика", "Незаменимо для верстки"], en: ["Accurate stats", "Essential for coding"] },
        cons: { ru: ["Специфичный интерфейс"], en: ["Specific UI"] },
        keywords: ["css", "html", "браузер", "верстка"]
    },
    {
        name: "JSONLint",
        url: "https://jsonlint.com/",
        price: "free",
        category: { ru: "Разработка", en: "Dev" },
        desc: { ru: "Валидатор и форматтер JSON.", en: "JSON validator and formatter." },
        fullDesc: { ru: "Самый простой способ проверить свой JSON-код на ошибки (лишние запятые, скобки) и красиво его отформатировать.", en: "Easiest way to check JSON for errors and format it beautifully." },
        pros: { ru: ["Мгновенный результат", "Показывает строку с ошибкой"], en: ["Instant results", "Points out error line"] },
        cons: { ru: ["Много рекламы на сайте"], en: ["Ads on site"] },
        keywords: ["json", "код", "ошибка", "формат"]
    },
    {
        name: "DevDocs",
        url: "https://devdocs.io/",
        price: "free",
        category: { ru: "Разработка", en: "Dev" },
        desc: { ru: "Вся документация в одном месте.", en: "All documentation in one place." },
        fullDesc: { ru: "Объединяет официальные документации по HTML, CSS, JS, React, Python и сотням других языков. Работает оффлайн!", en: "Combines official docs for HTML, CSS, JS, Python, etc. Works offline!" },
        pros: { ru: ["Работает без интернета", "Мгновенный поиск"], en: ["Works offline", "Instant search"] },
        cons: { ru: ["Не для новичков (это не туториалы)"], en: ["Not a tutorial site"] },
        keywords: ["доки", "справочник", "код", "язык"]
    },

    // --- ПРИВАТНОСТЬ (PRIVACY) ---
    {
        name: "SuperLogout",
        url: "https://superlogout.com/",
        price: "free",
        category: { ru: "Приватность", en: "Privacy" },
        desc: { ru: "Мгновенный выход из всех аккаунтов.", en: "Instant logout from all accounts." },
        fullDesc: { ru: "Сайт-скрипт. Заходите, и он автоматически разлогинивает вас в Google, Amazon, Steam и еще 30 сервисах. Осторожно!", en: "Instantly logs you out of 30+ major web services just by visiting." },
        pros: { ru: ["Отлично для публичных ПК", "Очень быстро"], en: ["Great for public PCs", "Very fast"] },
        cons: { ru: ["Выходит без предупреждения!"], en: ["Logs out without warning!"] },
        keywords: ["выход", "аккаунт", "безопасность", "logout"]
    },
    {
        name: "TempMail",
        url: "https://temp-mail.org/",
        price: "freemium",
        category: { ru: "Приватность", en: "Privacy" },
        desc: { ru: "Одноразовая почта без регистрации.", en: "Disposable email without registration." },
        fullDesc: { ru: "Спасает от спама. Выдает случайный email, на который можно получить код подтверждения. Письма скоро удаляются.", en: "Saves from spam. Gives a random email to receive confirmation codes." },
        pros: { ru: ["Полная анонимность", "Защита от спама"], en: ["Full anonymity", "Spam protection"] },
        cons: { ru: ["Некоторые сайты блокируют эту почту"], en: ["Some sites block these emails"] },
        keywords: ["почта", "спам", "email", "анонимно"]
    },
    {
        name: "Have I Been Pwned",
        url: "https://haveibeenpwned.com/",
        price: "free",
        category: { ru: "Приватность", en: "Privacy" },
        desc: { ru: "Проверка утечек паролей и почты.", en: "Check if email/password is compromised." },
        fullDesc: { ru: "Введите свой email, и сайт покажет, в каких базах хакеров (Яндекс.Еда, ВК и др.) светилась ваша почта.", en: "Enter email to see if it was in any major data breaches." },
        pros: { ru: ["Огромная база утечек", "Безопасно использовать"], en: ["Huge breach database", "Safe to use"] },
        cons: { ru: ["Может вызвать панику :)"], en: ["Might cause panic :)"] },
        keywords: ["пароль", "утечка", "хакеры", "база"]
    },
    {
        name: "VirusTotal",
        url: "https://www.virustotal.com/",
        price: "free",
        category: { ru: "Приватность", en: "Privacy" },
        desc: { ru: "Проверка ссылок и файлов на вирусы.", en: "Check links and files for viruses." },
        fullDesc: { ru: "Прогоняет любой файл или ссылку сразу через 70+ антивирусов (Касперский, Dr.Web, ESET) за пару секунд.", en: "Scans any file or link with 70+ antiviruses at once." },
        pros: { ru: ["Абсолютно надежно", "Сканирует ссылки до перехода"], en: ["Absolutely reliable", "Scans URLs before clicking"] },
        cons: { ru: ["Ограничение размера файла (650 МБ)"], en: ["File size limit 650MB"] },
        keywords: ["вирус", "троян", "файл", "сканер"]
    }
];
