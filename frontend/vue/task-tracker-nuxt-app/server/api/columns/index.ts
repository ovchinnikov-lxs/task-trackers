export default defineEventHandler(() => {
    /**
     * TODO:
     * 1) Сделать в сайдбаре динамическую форму CRUD для колонок/задач
     * 2) Сделать обновление задач (все поля, все флоу)
     * 3) Подключить полноценно эндпоинты
     */

    return $fetch('http://localhost:8000/api/columns');
});
