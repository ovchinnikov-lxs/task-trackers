<template>
    <div class="BaseTabs">
        <div :class="$style.wrapper">
            <Component
                :is="actualComponent(item)"
                v-for="item in list"
                v-bind="actualComponentAttrs(item)"
                :key="item.id"
                :title="$t(item.id)"
                :class="$style.item"
                @click="model = item.id"
            >
                {{ $t(item.id) }}
            </Component>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ITabItem } from '~/types/base/tabs';
import { NuxtLinkLocale } from '#components';

defineProps<{
    list: ITabItem[];
}>();

const model = defineModel<ITabItem['id']>();

const actualComponent = computed(() => (item: ITabItem) => {
    if (item.to) {
        return NuxtLinkLocale;
    }

    return 'button';
});

const actualComponentAttrs = computed(() => (item: ITabItem) => {
    if (actualComponent.value(item) === 'button') {
        return {
            type: 'button',
            active: item.id === model.value,
        };
    }

    return {
        to: item.to,
    };
});
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
    cursor: pointer;
    background: none;
    border: none;
    outline: none;
    transition: all var(--ui-transition);

    &:global(.--is-active-link),
    &[active='true'] {
        font-size: var(--ui-text-m-semi-bold);
        font-weight: bold;
        color: var(--ui-colors-primary-500);
    }

    &:focus {
        outline: none;
    }
}
</style>
