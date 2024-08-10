<template>
    <div class="TasksItemDate">
        <div :class="$style.wrapper">
            <div :class="$style.title">
                {{ $t('tasks.date.title.deadline') }}
            </div>

            <div :class="$style.info">
                <div :class="$style.date">{{ date }}</div>

                <span></span>

                <div :class="$style.time">{{ time }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ITasksItem } from '~/types/tasks/tasks';

const props = defineProps<{
    deadline: ITasksItem['deadline'];
}>();

const date = computed(() => {
    const event = new Date(props.deadline);

    return event.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'short',
    });
});

const time = computed(() => {
    const event = new Date(props.deadline);

    return event.toLocaleTimeString(undefined, {
        hour: 'numeric',
        minute: 'numeric',
    });
});
</script>

<style module lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    width: 100%;
    height: 100%;
}

.title {
    font-size: var(--ui-text-s-medium);
    line-height: 24px;
    color: var(--ui-colors-gray-600);
}

.info {
    display: flex;
    column-gap: 6px;
    align-items: center;
    font-size: var(--ui-text-m-medium);
    line-height: 26px;
    color: var(--ui-colors-gray-900);

    span {
        width: 4px;
        height: 4px;
        background: var(--ui-colors-gray-900);
        border-radius: 50%;
    }
}
</style>
