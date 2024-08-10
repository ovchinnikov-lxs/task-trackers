<template>
    <div class="TasksBoard">
        <div :class="$style.wrapper">
            <Transition
                name="fade"
                mode="out-in"
            >
                <LazyTasksBoardLoading
                    v-if="status === 'pending'"
                    :class="$style.loading"
                />

                <LazyTasksBoardError
                    v-else-if="status === 'error'"
                    :class="$style.error"
                />

                <LazyTasksBoardColumnList
                    v-else-if="status === 'success' && data?.columns.length"
                    v-model:columns="data.columns"
                    :class="$style.list"
                />
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ITasksColumn, ITasksItem } from '~/types/tasks/tasks';

const { status, data } = await useLazyAsyncData(async () => {
    try {
        const columns = await $fetch<ITasksColumn[]>('/api/columns');

        return {
            columns,
        };
    } catch (e) {
        console.error('TASK_BOARD:ASYNC_DATA:', e);
        return {
            columns: [],
        };
    }
});

function useTasksList() {
    const tasksList = ref<ITasksItem[]>([]);
    provide(tasksListKey, tasksList);

    watch(
        () => data.value?.columns,
        (val) => {
            tasksList.value = val?.map((item) => item.tasks)?.flat() || [];
        },
        {
            immediate: true,
            deep: true,
        },
    );
}

useTasksList();
</script>

<style module lang="scss">
.wrapper {
    width: calc(100% + 64px);
    height: 100%;
    margin-left: -32px;
    overflow-x: auto;
}

.loading {
    width: 100%;
    height: 100%;
}

.error {
    width: 100%;
    height: 100%;
}
</style>
