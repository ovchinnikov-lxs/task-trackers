export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    availableLocales: ['en', 'ru'],
    messages: {
        en: {
            sidebar: {
                title: 'Task Traker',
            },
            header: {
                title: 'Nuxt',
            },
            tasks: {
                status: {
                    low: 'Low',
                    medium: 'Medium',
                    high: 'High',
                },
                role: {
                    dev: 'Dev',
                    ux: 'UI/UX',
                    all: 'All',
                },
                assign: {
                    title: 'Assign',
                },
            },
            pages: {
                tasks: {
                    tabs: {
                        overview: 'Overview',
                        board: 'Board',
                        calendar: 'Calendar',
                    },
                    board: {
                        column: {
                            title: {
                                todo: 'To do',
                                doing: 'Doing',
                                review: 'Review',
                                done: 'Done',
                            },
                        },
                    },
                },
            },
        },
        ru: {
            sidebar: {
                title: 'Трекер Задач',
            },
            header: {
                title: 'Nuxt',
            },
            pages: {
                tasks: {
                    tabs: {
                        overview: 'Обзор',
                        board: 'Доска',
                        calendar: 'Календарь',
                    },
                },
            },
        },
    },
}));
