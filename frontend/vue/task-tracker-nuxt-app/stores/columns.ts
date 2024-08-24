import type { ITasksColumn } from '~/types/tasks/tasks';
import type { AsyncDataRequestStatus } from '#app';

export const useColumnsStore = defineStore('columns', {
    state: (): { columns: ITasksColumn[]; loadingStatus: AsyncDataRequestStatus } => ({
        columns: [],
        loadingStatus: 'pending',
    }),

    actions: {
        async fetchColumns() {
            try {
                this.columns = await $fetch<ITasksColumn[]>('/api/columns');
            } catch (e) {
                console.error('STORE:COLUMNS:FETCH_COLUMNS', e);
            }
        },
    },
});
