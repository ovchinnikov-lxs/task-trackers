import type { ITasksItem } from '~/types/tasks/tasks';

export const useTasksStore = defineStore('tasks', {
    state: (): {
        editedTask: ITasksItem | null;
    } => ({
        editedTask: null,
    }),

    actions: {
        setEditedTask(payload: ITasksItem) {
            this.editedTask = payload;
        },
    },
});
