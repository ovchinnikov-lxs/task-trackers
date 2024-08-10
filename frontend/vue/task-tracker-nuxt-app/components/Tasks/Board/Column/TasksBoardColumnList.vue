<template>
    <div class="TaskBoardColumnList">
        <div :class="$style.wrapper">
            <TasksBoardColumn
                v-for="item in columnsModel"
                :id="item.id"
                :key="item.id"
                v-model:tasks="item.tasks"
                :title="item.title"
                :order="item.order"
                :class="$style.column"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ITasksColumn } from '~/types/tasks/tasks';

const columnsModel = defineModel<ITasksColumn[]>('columns', { required: true });
</script>

<style module lang="scss">
.wrapper {
    display: flex;
    column-gap: 24px;
    width: 100%;
    height: 100%;
    padding: 0 32px;
}

.column {
    flex-shrink: 0;
    width: 356px;
}
</style>
