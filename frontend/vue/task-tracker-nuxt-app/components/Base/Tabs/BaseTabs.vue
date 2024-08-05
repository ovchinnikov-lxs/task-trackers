<template>
    <div class="BaseTabs">
        <div :class="$style.wrapper">
            <NuxtLinkLocale
                v-for="item in list"
                :key="item.id"
                :to="item.to"
                :title="$t(item.id)"
                :class="$style.item"
            >
                {{ $t(item.id) }}
            </NuxtLinkLocale>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ITabItem } from '~/types/base/tabs';

defineProps<{
    list: ITabItem[];
}>();
</script>

<style lang="scss" module>
.wrapper {
    display: flex;
    column-gap: 32px;
    align-items: center;
    width: 100%;
    height: 100%;
}

.item {
    font-size: var(--ui-text-m-medium);
    color: var(--ui-colors-gray-400);
    text-decoration: none;
    transition: all var(--ui-transition);

    &:global(.--is-active-link) {
        font-size: var(--ui-text-m-semi-bold);
        font-weight: bold;
        color: var(--ui-colors-primary-500);
    }
}
</style>
