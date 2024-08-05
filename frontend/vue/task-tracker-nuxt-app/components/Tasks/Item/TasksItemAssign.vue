<template>
    <div class="TasksItemAssign">
        <div :class="$style.wrapper">
            <div :class="$style.title">{{ $t('tasks.assign.title') }}</div>

            <div :class="$style.list">
                <img
                    v-for="item in previewAssign"
                    :key="item"
                    :src="`https://picsum.photos/32/32?author=${item}`"
                    :alt="item"
                    :title="item"
                    loading="lazy"
                    :class="$style.item"
                />

                <div
                    v-if="previewAssign.length < assign.length"
                    :class="$style.item"
                >
                    +{{ assign.length - previewAssign.length }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ITasksItem } from '~/types/tasks/tasks';

const props = defineProps<{
    assign: ITasksItem['assign'];
}>();

const previewAssign = computed(() => props.assign.slice(0, 3));
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

.list {
    display: flex;
    align-items: center;
}

.item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
    color: var(--ui-colors-gray-800);
    background: #ffb829;
    border: 2px solid var(--ui-colors-base-white);
    border-radius: 6px;
    transform: translate3d(0, 0, 0);

    &:not(:first-child) {
        margin-left: -8px;
    }
}
</style>
