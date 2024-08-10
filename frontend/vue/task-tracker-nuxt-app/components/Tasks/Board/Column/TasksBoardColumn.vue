<template>
    <div class="TaskBoardColumn">
        <div :class="$style.wrapper">
            <TasksBoardColumnHeader
                :title="title"
                :count="tasksModel.length"
                :class="$style.header"
            />

            <div
                ref="listRef"
                :data-column-id="id"
                :class="$style.list"
            >
                <TasksItem
                    v-for="item in tasksModel"
                    :key="item.id"
                    v-bind="item"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { moveArrayElement, useSortable } from '@vueuse/integrations/useSortable';

import type { ITasksColumn } from '~/types/tasks/tasks';

const props = defineProps<ITasksColumn>();
const tasksModel = defineModel<ITasksColumn['tasks']>('tasks', { required: true });
const listRef = ref<HTMLElement | null>(null);
const tasksList = inject(tasksListKey);

function onUpdateList() {
    nextTick(() => {
        tasksModel.value = tasksModel.value.map((item, order) => ({
            ...item,
            order,
        }));
    });
}

useSortable(listRef, tasksModel, {
    animation: 200,

    group: 'column',

    onAdd(evt: any) {
        const itemEl = evt.item;

        const addedTask = tasksList?.value.find((item) => itemEl.dataset.taskId === item.id);

        if (!addedTask) {
            return;
        }

        tasksModel.value.push({
            ...addedTask,
            columnId: props.id,
        });

        onUpdateList();
    },

    onRemove(evt: any) {
        const itemEl = evt.item;

        tasksModel.value = tasksModel.value.filter((item) => item.id !== itemEl.dataset.taskId);
    },

    onUpdate: (evt: any) => {
        moveArrayElement(tasksModel, evt.oldIndex, evt.newIndex);

        onUpdateList();
    },
});
</script>

<style module lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    width: 100%;
    height: 100%;
}

.header {
    flex-shrink: 0;
}

.list {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    row-gap: 16px;
    min-height: 50vh;
}
</style>
