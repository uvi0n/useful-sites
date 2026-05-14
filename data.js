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
    },
    // --- ОБУЧЕНИЕ И НАУКА (EDUCATION) ---
    {
        name: "WolframAlpha",
        url: "https://www.wolframalpha.com/",
        price: "freemium",
        category: { ru: "Обучение", en: "Education" },
        desc: { ru: "Вычислительная поисковая система.", en: "Computational knowledge engine." },
        fullDesc: { ru: "Идеально для студентов. Решает сложные математические уравнения, строит графики, выдает факты по химии, географии и физике с пошаговыми решениями.", en: "Perfect for students. Solves complex math equations, provides facts on chemistry, geography, and physics." },
        pros: { ru: ["Решает почти всё", "Показывает графики"], en: ["Solves almost anything", "Shows graphs"] },
        cons: { ru: ["Пошаговое решение только в PRO"], en: ["Step-by-step is PRO only"] },
        keywords: ["математика", "химия", "калькулятор", "учеба"]
    },
    {
        name: "Desmos",
        url: "https://www.desmos.com/calculator",
        price: "free",
        category: { ru: "Обучение", en: "Education" },
        desc: { ru: "Продвинутый графический калькулятор.", en: "Advanced graphing calculator." },
        fullDesc: { ru: "Бесплатный, быстрый и невероятно красивый графический калькулятор прямо в браузере. Незаменим для геометрии и алгебры.", en: "Free, fast, and beautiful graphing calculator in your browser." },
        pros: { ru: ["Моментальная отрисовка", "Понятный интерфейс"], en: ["Instant rendering", "Clean UI"] },
        cons: { ru: ["Требует знания математического синтаксиса"], en: ["Requires math syntax knowledge"] },
        keywords: ["график", "математика", "геометрия", "калькулятор"]
    },
    {
        name: "Ptable",
        url: "https://ptable.com/",
        price: "free",
        category: { ru: "Обучение", en: "Education" },
        desc: { ru: "Интерактивная таблица Менделеева.", en: "Interactive periodic table." },
        fullDesc: { ru: "Самая подробная динамическая таблица химических элементов. Показывает свойства, орбитали, изотопы и соединения при разных температурах.", en: "The most detailed dynamic periodic table with properties, orbitals, and compounds." },
        pros: { ru: ["Очень наглядно", "Много языков"], en: ["Very visual", "Many languages"] },
        cons: { ru: ["Слегка перегруженный интерфейс"], en: ["Slightly cluttered UI"] },
        keywords: ["химия", "элементы", "наука", "таблица"]
    },
    {
        name: "Briefly",
        url: "https://briefly.ru/",
        price: "free",
        category: { ru: "Обучение", en: "Education" },
        desc: { ru: "Краткие содержания всех книг.", en: "Short summaries of books." },
        fullDesc: { ru: "Огромная библиотека кратких содержаний произведений мировой и русской литературы. Спасение перед экзаменами и уроками.", en: "Huge library of literature summaries. A lifesaver for exams." },
        pros: { ru: ["Читается за 10-15 минут", "Есть аудиоверсии"], en: ["Reads in 10-15 mins", "Audio versions available"] },
        cons: { ru: ["Не заменяет чтение оригинала :)"], en: ["Doesn't replace the original :)"] },
        keywords: ["литература", "книги", "кратко", "учеба"]
    },

    // --- РАЗРАБОТКА (DEVELOPMENT) ---
    {
        name: "FlutterFlow",
        url: "https://flutterflow.io/",
        price: "freemium",
        category: { ru: "Разработка", en: "Dev" },
        desc: { ru: "Создание приложений без кода на Flutter.", en: "No-code app builder on Flutter." },
        fullDesc: { ru: "Позволяет собирать кроссплатформенные мобильные и веб-приложения визуально (drag-and-drop), а затем экспортировать чистый код на Dart/Flutter.", en: "Build cross-platform mobile & web apps visually and export clean Flutter code." },
        pros: { ru: ["Экспорт реального кода", "Мощные анимации"], en: ["Export real code", "Powerful animations"] },
        cons: { ru: ["Экспорт кода только в платной версии"], en: ["Code export is paid"] },
        keywords: ["flutter", "dart", "мобилка", "nocode"]
    },
    {
        name: "CodeSandbox",
        url: "https://codesandbox.io/",
        price: "freemium",
        category: { ru: "Разработка", en: "Dev" },
        desc: { ru: "Онлайн-среда разработки.", en: "Online web development environment." },
        fullDesc: { ru: "Полноценный редактор кода в браузере. Идеально для быстрого прототипирования сайтов на React, Vue или обычного HTML/JS.", en: "Full code editor in the browser. Great for prototyping React, Vue, or HTML/JS." },
        pros: { ru: ["Мгновенный запуск", "Удобно делиться кодом"], en: ["Instant start", "Easy to share code"] },
        cons: { ru: ["Приватные песочницы платные"], en: ["Private sandboxes are paid"] },
        keywords: ["код", "редактор", "веб", "js"]
    },
    {
        name: "GitHub Pages",
        url: "https://pages.github.com/",
        price: "free",
        category: { ru: "Разработка", en: "Dev" },
        desc: { ru: "Бесплатный хостинг для сайтов.", en: "Free hosting for websites." },
        fullDesc: { ru: "Официальный инструмент GitHub для превращения репозиториев в автономные, быстрые и бесплатные веб-сайты.", en: "GitHub's official tool to turn repositories into fast, free websites." },
        pros: { ru: ["Вечный бесплатный хостинг", "Свой домен бесплатно"], en: ["Forever free hosting", "Custom domains"] },
        cons: { ru: ["Только статические сайты (без бэкенда)"], en: ["Static sites only (no backend)"] },
        keywords: ["хостинг", "github", "сайт", "деплой"]
    },

    // --- АРХИТЕКТУРА И 3D (ARCHITECTURE & 3D) ---
    {
        name: "Textures.com",
        url: "https://www.textures.com/",
        price: "freemium",
        category: { ru: "Дизайн", en: "Design" },
        desc: { ru: "Крупнейшая база 3D текстур.", en: "Largest database of 3D textures." },
        fullDesc: { ru: "Незаменимый сайт для архитекторов и 3D-художников. Кирпич, стекло, дерево, металл — тысячи бесшовных текстур и PBR-материалов для рендера.", en: "Essential for architects and 3D artists. Thousands of seamless textures and PBR materials." },
        pros: { ru: ["15 бесплатных кредитов каждый день", "Шикарное качество"], en: ["15 free daily credits", "Amazing quality"] },
        cons: { ru: ["8K текстуры только за деньги"], en: ["8K textures are paid"] },
        keywords: ["3d", "текстуры", "архитектура", "рендер"]
    },
    {
        name: "Planner 5D",
        url: "https://planner5d.com/",
        price: "freemium",
        category: { ru: "Дизайн", en: "Design" },
        desc: { ru: "Дизайн интерьера и архитектуры.", en: "Interior and architecture design." },
        fullDesc: { ru: "Удобный инструмент для планировки квартир, домов и участков. Позволяет делать 2D планы и сразу смотреть их в 3D (с мебелью, стеклянными террасами и крышами).", en: "Tool for planning houses and lots. 2D plans instantly converted to 3D with furniture." },
        pros: { ru: ["Простота", "Хороший каталог объектов"], en: ["Simplicity", "Good object catalog"] },
        cons: { ru: ["HD-рендеры платные"], en: ["HD renders are paid"] },
        keywords: ["дом", "интерьер", "планировка", "архитектура"]
    },
    {
        name: "Sketchfab",
        url: "https://sketchfab.com/",
        price: "freemium",
        category: { ru: "Дизайн", en: "Design" },
        desc: { ru: "Просмотр и публикация 3D-моделей.", en: "View and publish 3D models." },
        fullDesc: { ru: "Крупнейшая платформа для публикации, обмена и покупки 3D-моделей. Можно крутить модели прямо в браузере.", en: "Platform for sharing and buying 3D models. Inspect models directly in browser." },
        pros: { ru: ["Много бесплатных моделей для скачивания", "Отличный вьюер"], en: ["Many free downloadable models", "Great viewer"] },
        cons: { ru: ["Лимит на загрузки в месяц"], en: ["Monthly upload limits"] },
        keywords: ["3d", "модели", "cg", "ассеты"]
    },

    // --- ИГРЫ И ЖЕЛЕЗО (GAMING & PC) ---
    {
        name: "Liquipedia",
        url: "https://liquipedia.net/",
        price: "free",
        category: { ru: "Игры", en: "Gaming" },
        desc: { ru: "Википедия киберспорта.", en: "The esports wiki." },
        fullDesc: { ru: "Самая полная база данных по турнирам, игрокам и патчам в Dota 2, Counter-Strike 2 и других киберспортивных дисциплинах.", en: "Most comprehensive database for tournaments, players, and patches in Dota 2, CS2, etc." },
        pros: { ru: ["Мгновенные обновления", "Сетка турниров онлайн"], en: ["Instant updates", "Live brackets"] },
        cons: { ru: ["Интерфейс на английском"], en: ["English interface mainly"] },
        keywords: ["dota2", "cs2", "киберспорт", "турниры"]
    },
    {
        name: "SteamDB",
        url: "https://steamdb.info/",
        price: "free",
        category: { ru: "Игры", en: "Gaming" },
        desc: { ru: "База данных и статистика Steam.", en: "Steam database and stats." },
        fullDesc: { ru: "Показывает реальный онлайн в играх, историю изменения цен, скрытые скидки и точную стоимость вашего аккаунта.", en: "Shows real player counts, price history, hidden sales, and account value." },
        pros: { ru: ["История самых низких цен", "Никакой рекламы"], en: ["All-time low price history", "No ads"] },
        cons: { ru: ["Нужно привязать Steam для точных данных"], en: ["Requires Steam login for personal stats"] },
        keywords: ["steam", "скидки", "игры", "статистика"]
    },
    {
        name: "PCPartPicker",
        url: "https://pcpartpicker.com/",
        price: "free",
        category: { ru: "Инструменты", en: "Tools" },
        desc: { ru: "Сборка ПК и проверка совместимости.", en: "PC builder & compatibility checker." },
        fullDesc: { ru: "Помогает собрать мощный игровой ПК (например, на i7 и RTX 4080 SUPER). Система сама проверит, влезет ли кулер в корпус и хватит ли блока питания.", en: "Helps build a PC. Automatically checks compatibility of parts (CPU, GPU, PSU, etc)." },
        pros: { ru: ["Точная проверка совместимости", "Сборки пользователей"], en: ["Accurate compatibility check", "User builds"] },
        cons: { ru: ["Цены ориентированы на западные магазины"], en: ["Prices based on western stores"] },
        keywords: ["пк", "железо", "сборка", "процессор"]
    },

    // --- ПУТЕШЕСТВИЯ (TRAVEL) ---
    {
        name: "Trip.com",
        url: "https://www.trip.com/",
        price: "free",
        category: { ru: "Путешествия", en: "Travel" },
        desc: { ru: "Бронирование билетов и отелей (Топ для Азии).", en: "Flight & hotel booking (Great for Asia)." },
        fullDesc: { ru: "Одно из лучших приложений для планирования поездок, особенно незаменимо при путешествиях в Китай и другие страны Азии. Работает с местными авиалиниями и поездами.", en: "One of the best apps for travel planning, especially indispensable for trips to China." },
        pros: { ru: ["Покупка билетов на поезда в Китае", "Отличная поддержка"], en: ["Buy train tickets in China", "Great support"] },
        cons: { ru: ["Цены иногда меняются на этапе оплаты"], en: ["Prices can change at checkout"] },
        keywords: ["билеты", "азия", "китай", "отели"]
    },
    {
        name: "Rome2Rio",
        url: "https://www.rome2rio.com/",
        price: "free",
        category: { ru: "Путешествия", en: "Travel" },
        desc: { ru: "Как добраться куда угодно.", en: "How to get anywhere." },
        fullDesc: { ru: "Показывает абсолютно все способы добраться из точки А в точку Б: самолеты, поезда, автобусы, паромы и даже такси с примерными ценами.", en: "Shows all ways to get from point A to B: flights, trains, buses, ferries with estimated prices." },
        pros: { ru: ["Охватывает весь мир", "Очень наглядно"], en: ["Covers the whole world", "Highly visual"] },
        cons: { ru: ["Расписание автобусов бывает неточным"], en: ["Bus schedules can be inaccurate"] },
        keywords: ["маршрут", "поездка", "карта", "транспорт"]
    }
];
