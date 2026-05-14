const sitesData = [
    {
        name: "Google AI Studio",
        url: "https://aistudio.google.com/",
        price: "free",
        category: { ru: "Нейросети", en: "AI" },
        desc: { ru: "Бесплатный доступ к Gemini Pro.", en: "Free Gemini Pro access." },
        fullDesc: { ru: "Лучшая песочница для работы с API Google Gemini.", en: "Top sandbox for Gemini API." },
        pros: { ru: ["Мощно", "Бесплатно"], en: ["Powerful", "Free"] },
        cons: { ru: ["Нужен VPN в РФ"], en: ["VPN needed in some regions"] },
        keywords: ["ai", "google", "gemini"]
    },
    {
        name: "Leonardo.ai",
        url: "https://leonardo.ai/",
        price: "freemium",
        category: { ru: "Нейросети", en: "AI" },
        desc: { ru: "Генерация артов нейросетью.", en: "AI art generation." },
        fullDesc: { ru: "Ежедневные бесплатные токены для создания картинок.", en: "Daily free tokens for art." },
        pros: { ru: ["Красиво", "Много моделей"], en: ["Beautiful", "Many models"] },
        cons: { ru: ["Лимит токенов"], en: ["Token limits"] },
        keywords: ["art", "ai", "image"]
    },
    {
        name: "Midjourney",
        url: "https://midjourney.com/",
        price: "paid",
        category: { ru: "Нейросети", en: "AI" },
        desc: { ru: "Самая мощная ИИ для картинок.", en: "Most powerful image AI." },
        fullDesc: { ru: "Лидер рынка в генерации фотореалистичных изображений.", en: "Market leader in photorealistic AI." },
        pros: { ru: ["Лучшее качество"], en: ["Best quality"] },
        cons: { ru: ["Только платно", "Сложно платить из РФ"], en: ["Paid only", "Hard to pay"] },
        keywords: ["ai", "mj", "photo"]
    },
    {
        name: "Remove.bg",
        url: "https://remove.bg",
        price: "freemium",
        category: { ru: "Дизайн", en: "Design" },
        desc: { ru: "Удаление фона за 1 клик.", en: "Background removal." },
        fullDesc: { ru: "Идеально вырезает фон, но HD платно.", en: "Cuts background, HD is paid." },
        pros: { ru: ["Быстро"], en: ["Fast"] },
        cons: { ru: ["HD платно"], en: ["HD is paid"] },
        keywords: ["bg", "photo", "png"]
    }
    // Сюда мы добавим еще 96 сайтов в следующем шаге!
];
