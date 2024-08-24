<template>
    <div
        :data-task-id="id"
        class="TasksItem"
    >
        <div :class="$style.wrapper">
            <div :class="$style.main">
                <div :class="$style.info">
                    <TasksItemStatus :status="status" />

                    <TasksItemRole :role="role" />

                    <BaseButton
                        size="small"
                        :class="$style.button"
                        @click="onEdit"
                    >
                        {{ $t('tasks.edit.label') }}
                    </BaseButton>
                </div>

                <h6 :class="$style.title">{{ title }}</h6>

                <div
                    v-if="description"
                    :class="$style.description"
                >
                    {{ description }}
                </div>

                <img
                    v-if="image"
                    :src="image"
                    alt=""
                    loading="lazy"
                    draggable="false"
                    :class="$style.image"
                />
            </div>

            <div :class="$style.footer">
                <TasksItemAssign :assign="assign" />

                <TasksItemDate
                    :deadline="deadline"
                    :class="$style.date"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ITasksItem } from '~/types/tasks/tasks';

const props = defineProps<ITasksItem>();

function onEdit() {
    const tasksStore = useTasksStore();

    tasksStore.setEditedTask(props);
}
</script>

<style lang="scss" module>
.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    user-select: none;
    background: var(--ui-colors-base-white);
    border: 2px solid var(--ui-colors-gray-50);
    border-radius: 6px;
}

.main {
    padding: 16px;
}

.info {
    display: flex;
    column-gap: 12px;
    align-items: center;
}

.button {
    margin-bottom: auto;
    margin-left: auto;
}

.title {
    margin-top: 24px;
    font-size: var(--ui-heading-7-semi-bold);
    font-weight: bold;
    line-height: 30px;
}

.description {
    margin-top: 8px;
    font-size: var(--ui-text-m-regular);
    font-weight: 300;
    line-height: 26px;
    color: var(--ui-colors-gray-600);
}

.image {
    width: 100%;
    max-height: 350px;
    margin-top: 16px;
    overflow: hidden;
    border: 2px solid var(--ui-colors-gray-50);
    border-radius: 6px;
    transform: translate3d(0, 0, 0);
}

.footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 16px 24px;
    border-top: 2px solid var(--ui-colors-gray-50);
}

.date {
    margin-left: auto;
}
</style>
