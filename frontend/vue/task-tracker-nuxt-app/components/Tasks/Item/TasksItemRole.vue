<template>
    <div class="TasksItemRole">
        <div :class="[$style.wrapper, classList]">
            {{ $t(`tasks.role.${role}`) }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ITasksItem } from '~/types/tasks/tasks';

const props = defineProps<{
    role: ITasksItem['role'];
}>();

const style = useCssModule();

const classList = computed(() => [
    style[`--${props.role}-role`],
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

    &.--dev-role {
        color: var(--ui-colors-violet-800);
        background: var(--ui-colors-violet-50);
    }

    &.--ux-role {
        color: var(--ui-colors-primary-800);
        background: var(--ui-colors-primary-50);
    }

    &.--all-role {
        color: var(--ui-colors-brown-800);
        background: var(--ui-colors-brown-50);
    }
}
</style>
