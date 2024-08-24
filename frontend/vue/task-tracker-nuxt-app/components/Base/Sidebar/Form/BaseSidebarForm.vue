<template>
    <div class="BaseSidebarForm">
        <div :class="$style.wrapper">
            <BaseTabs
                v-model="actualTab"
                :list="sidebarTabs"
            />

            <Transition
                name="bottom"
                mode="out-in"
            >
                <Component
                    :is="componentsMap.get(actualTab)"
                    :key="actualTab"
                    :class="$style.form"
                />
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ITabItem } from '~/types/base/tabs';

const COMPONENTS_KEYS = {
    TASK: 'sidebar.form.tabs.task',
    COLUMN: 'sidebar.form.tabs.column',
};

const componentsMap = new Map([
    [COMPONENTS_KEYS.TASK, defineAsyncComponent(() => import('~/components/Base/Sidebar/Form/BaseSidebarFromTask.vue'))],
    [COMPONENTS_KEYS.COLUMN, defineAsyncComponent(() => import('~/components/Base/Sidebar/Form/BaseSidebarFormColumn.vue'))],
]);

const tasksStore = useTasksStore();

const actualTab = ref(COMPONENTS_KEYS.TASK);

// TODO: The same with column
const unsubscribe = tasksStore.$onAction((ctx) => {
    ctx.after(() => {
        if (ctx.name === 'setEditedTask' && ctx.store.editedTask !== null && actualTab.value !== COMPONENTS_KEYS.TASK) {
            actualTab.value = COMPONENTS_KEYS.TASK;

            nextTick(() => {
                if (ctx.store.editedTask !== null) {
                    tasksStore.setEditedTask(ctx.store.editedTask);
                }
            });
        }
    });
});

onBeforeUnmount(() => {
    unsubscribe();
});

const sidebarTabs: ITabItem[] = [
    {
        id: COMPONENTS_KEYS.TASK,
    },
    {
        id: COMPONENTS_KEYS.COLUMN,
    },
];
</script>

<style module lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 32px;
    width: 100%;
    height: 100%;
}

.form {
    width: 100%;
}
</style>
