const sitesData = [
    {
        name: "Google AI Studio",
        url: "https://aistudio.google.com/",
        category: { ru: "Нейросети", en: "AI" },
        desc: { ru: "Бесплатный доступ к топовым моделям Gemini для разработчиков.", en: "Free access to top Gemini models for developers." },
        fullDesc: { 
            ru: "Официальная песочница от Google, где можно тестировать запросы к нейросети Gemini (включая Pro и Flash версии) абсолютно бесплатно, а также получать API-ключи для встраивания ИИ в свои приложения.", 
            en: "Google's official sandbox to test Gemini API models for free." 
        },
        pros: { ru: ["Бесплатный API", "Работает с текстом, фото и видео", "Высокая скорость"], en: ["Free API", "Multimodal", "Fast"] },
        cons: { ru: ["Требуется базовое понимание промпт-инжиниринга"], en: ["Requires basic prompt engineering"] },
        keywords: ["ai", "нейросеть", "api", "gemini", "разработка", "ии"]
    },
    {
        name: "Remove.bg",
        url: "https://remove.bg",
        category: { ru: "Дизайн", en: "Design" },
        desc: { ru: "Идеальное удаление фона с фото.", en: "Perfect background removal." },
        fullDesc: { 
            ru: "Сервис использует продвинутые алгоритмы машинного обучения для автоматического вырезания главного объекта. Идеально для подготовки портретов, создания коллажей и предметной съемки.", 
            en: "Removes background automatically using advanced ML algorithms." 
        },
        pros: { ru: ["Работает без кликов", "Идеально вырезает волосы", "Есть плагины для редакторов"], en: ["Zero clicks", "Cuts hair perfectly", "Has plugins"] },
        cons: { ru: ["Бесплатное скачивание только в низком разрешении"], en: ["Free download only in low res"] },
        keywords: ["фон", "дизайн", "фото", "вырезать", "png"]
    },
    {
        name: "TempMail",
        url: "https://temp-mail.org/",
        category: { ru: "Приватность", en: "Privacy" },
        desc: { ru: "Временная почта для регистраций.", en: "Temporary email for registrations." },
        fullDesc: { 
            ru: "Одноразовый почтовый ящик, который самоуничтожается через некоторое время. Спасает от спама, рассылок и утечек данных, если нужно скачать файл или зарегистрироваться на сомнительном сайте.", 
            en: "Disposable mailbox that self-destructs. Saves you from spam." 
        },
        pros: { ru: ["Полная анонимность", "Не требует регистрации", "Мгновенное получение писем"], en: ["Anonymous", "No registration", "Instant emails"] },
        cons: { ru: ["Письма хранятся недолго", "Некоторые сайты блокируют такие адреса"], en: ["Short storage", "Some sites block it"] },
        keywords: ["почта", "спам", "email", "анонимность", "безопасность"]
    },
    {
        name: "SuperLogout",
        url: "https://superlogout.com/",
        category: { ru: "Приватность", en: "Privacy" },
        desc: { ru: "Мгновенный выход из всех аккаунтов.", en: "Instant logout from all accounts." },
        fullDesc: { 
            ru: "Сайт-скрипт. Как только вы на него заходите, он автоматически отправляет запросы на выход (logout) из более чем 30 популярных сервисов: Google, Amazon, Steam, Tumblr и других.", 
            en: "Instantly logs you out of 30+ major web services just by visiting the link." 
        },
        pros: { ru: ["Максимально быстро", "Отлично для публичных компьютеров"], en: ["Extremely fast", "Great for public PCs"] },
        cons: { ru: ["Не спрашивает подтверждения (выходит сразу)"], en: ["No confirmation prompt"] },
        keywords: ["logout", "выход", "приватность", "быстро"]
    },
    {
        name: "Coolors",
        url: "https://coolors.co/",
        category: { ru: "Дизайн", en: "Design" },
        desc: { ru: "Генератор цветовых палитр.", en: "Color palette generator." },
        fullDesc: { 
            ru: "Супербыстрый инструмент для создания цветовых схем. Нажимаете пробел — получаете новые цвета, которые идеально сочетаются друг с другом. Отлично подходит для веб-дизайна и создания иллюстраций.", 
            en: "Superfast tool to generate color palettes. Press space to get perfectly matching colors." 
        },
        pros: { ru: ["Удобный интерфейс", "Экспорт в CSS, PDF, PNG", "Огромная библиотека готовых палитр"], en: ["User-friendly", "Easy export", "Huge library"] },
        cons: { ru: ["В бесплатной версии есть реклама"], en: ["Ads in free version"] },
        keywords: ["цвета", "палитра", "дизайн", "стиль", "color"]
    },
    {
        name: "Roadmap.sh",
        url: "https://roadmap.sh/",
        category: { ru: "Обучение", en: "Learning" },
        desc: { ru: "Пошаговые планы развития для разработчиков.", en: "Step-by-step developer roadmaps." },
        fullDesc: { 
            ru: "Огромная база знаний с визуальными картами (дорожными картами). Показывает, какие технологии нужно изучать шаг за шагом, чтобы стать Frontend, Backend, Flutter или Cloud разработчиком.", 
            en: "Visual roadmaps, guides and paths for developers." 
        },
        pros: { ru: ["Структурированная информация", "Бесплатно", "Регулярно обновляется комьюнити"], en: ["Structured", "Free", "Community updated"] },
        cons: { ru: ["Только на английском языке", "Иногда информации слишком много"], en: ["English only", "Can be overwhelming"] },
        keywords: ["код", "программирование", "учеба", "roadmap", "разработка"]
    }
];

