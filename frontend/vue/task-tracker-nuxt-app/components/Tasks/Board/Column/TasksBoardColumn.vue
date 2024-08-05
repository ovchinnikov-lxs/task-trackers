<template>
    <div class="TaskBoardColumn">
        <div :class="$style.wrapper">
            <TasksBoardColumnHeader
                :title="title"
                :count="tasks.length"
            />

            <div :class="$style.list">
                <TasksItem
                    v-for="item in tasks"
                    :key="item.id"
                    v-bind="item"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IBoardColumn } from '~/types/tasks/tasks';

defineProps<IBoardColumn>();
</script>

<style module lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    width: 100%;
    height: 100%;
}

.list {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
}
</style>
