<template>
    <div class="TasksItemStatus">
        <div :class="[$style.wrapper, classList]">
            {{ $t(`tasks.status.${status}`) }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ITasksItem } from '~/types/tasks/tasks';

const props = defineProps<{
    status: ITasksItem['status'];
}>();

const style = useCssModule();

const classList = computed(() => [
    style[`--${props.status}-status`],
]);
</script>

<style module lang="scss">
.wrapper {
    width: 100%;
    height: 100%;
    padding: 6px 14px;
    font-size: var(--ui-text-s-medium);
    line-height: 24px;
    text-align: center;
    border-radius: 6px;

    &.--high-status {
        color: var(--ui-colors-danger-800);
        background: var(--ui-colors-danger-50);
    }

    &.--medium-status {
        color: var(--ui-colors-warning-800);
        background: var(--ui-colors-warning-50);
    }

    &.--low-status {
        color: var(--ui-colors-success-800);
        background: var(--ui-colors-success-50);
    }
}
</style>
