<template>
    <div class="TasksBoard">
        <div :class="$style.wrapper">
            <Transition
                name="fade"
                mode="out-in"
            >
                <LazyTasksBoardLoading
                    v-if="loadingStatus === 'pending'"
                    :class="$style.loading"
                />

                <LazyTasksBoardError
                    v-else-if="loadingStatus === 'error'"
                    :class="$style.error"
                />

                <LazyTasksBoardColumnList
                    v-else-if="loadingStatus === 'success' && columnsList"
                    v-model:columns="columnsList"
                />
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ITasksItem } from '~/types/tasks/tasks';

function useTasksList() {
    const tasksList = ref<ITasksItem[]>([]);
    provide(tasksListKey, tasksList); // TODO: Убрать провайд

    const columnStore = useColumnsStore();

    const loadingStatus = computed(() => columnStore.loadingStatus);
    const columnsList = computed(() => columnStore.columns);

    watch(
        () => columnStore.columns,
        (val) => {
            tasksList.value = val?.map((item) => item.tasks)?.flat() || [];
        },
        {
            immediate: true,
            deep: true,
        },
    );

    return {
        loadingStatus,
        columnsList,
    };
}

const { loadingStatus, columnsList } = useTasksList();
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
