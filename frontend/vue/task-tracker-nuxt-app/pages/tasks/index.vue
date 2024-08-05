<template>
    <section class="TasksPage">
        <div :class="$style.wrapper">
            <BaseTabs
                :list="tasksList"
                :class="$style.tabs"
            />

            <NuxtPage :class="$style.page" />
        </div>
    </section>
</template>

<script setup lang="ts">
import type { ITabItem } from '~/types/base/tabs';

const tasksList: ITabItem[] = [
    {
        id: 'pages.tasks.tabs.overview',
        to: '/tasks/overview',
    },
    {
        id: 'pages.tasks.tabs.board',
        to: '/tasks/board',
    },
    {
        id: 'pages.tasks.tabs.calendar',
        to: '/tasks/calendar',
    },
];
</script>

<style module lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 22px;
    width: 100%;
    height: 100%;
}

.tabs {
    flex-shrink: 0;
}

.page {
    flex-grow: 1;
}
</style>
