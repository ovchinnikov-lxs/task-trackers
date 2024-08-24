export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    availableLocales: ['en', 'ru'],
    messages: {
        en: {
            sidebar: {
                title: 'Task Traker',
                form: {
                    tabs: {
                        task: 'Task',
                        column: 'Column',
                    },
                    fields: {
                        column: {
                            title: {
                                placeholder: 'Enter column title',
                            },
                            order: {
                                placeholder: 'Enter column order',
                                option: '{order} order',
                            },
                            submitButton: 'Create column',
                        },
                        task: {
                            title: {
                                label: 'Title',
                                placeholder: 'Enter task title',
                            },
                            description: {
                                label: 'Description',
                                placeholder: 'Enter task description',
                            },
                            image: {
                                label: 'Image',
                                placeholder: 'Enter task image url',
                            },
                            status: {
                                label: 'Status',
                                placeholder: 'Enter task status',
                            },
                            role: {
                                label: 'Role',
                                placeholder: 'Enter task role',
                            },
                            assign: {
                                label: 'Assign',
                                placeholder: 'Assigns (separated by commas)',
                            },
                            deadline: {
                                label: 'Deadline',
                                placeholder: 'Enter deadline',
                            },
                            columnId: {
                                label: 'ColumnId',
                                placeholder: 'Enter column',
                                option: 'Column "{column}"',
                            },
                            order: {
                                label: 'Order',
                                placeholder: 'Enter order',
                                option: '{order} order',
                            },
                            submitButton: 'Submit',
                            deleteButton: 'Delete',
                        },
                    },
                },
            },
            header: {
                title: 'Nuxt',
                lang: {
                    placeholder: 'Locale',
                },
            },
            tasks: {
                edit: {
                    label: 'Edit',
                },
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
                date: {
                    title: {
                        deadline: 'Deadline',
                    },
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
                        error: {
                            title: 'Something went wrong',
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
