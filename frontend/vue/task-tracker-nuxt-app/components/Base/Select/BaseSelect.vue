<template>
    <div class="BaseInput">
        <select
            v-model="model"
            v-bind="$attrs"
            :class="$style.select"
        >
            <option
                disabled
                value=""
            >
                {{ placeholder }}
            </option>

            <option
                v-for="item in options"
                :key="item.id"
                :value="item.id"
            >
                {{ item.name }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import type { ISelectOption } from '~/types/base/select';

defineOptions({
    inheritAttrs: true,
});

defineProps<{
    placeholder: string;
    options: ISelectOption[];
}>();

const model = defineModel<string | number>({ required: true });
</script>

<style module lang="scss">
.select {
    width: 100%;
    height: 100%;
    padding: 10px 16px;
    font-size: var(--ui-text-m-regular);
    line-height: 26px;
    color: var(--ui-colors-gray-900);
    background: var(--ui-colors-base-neutral);
    border: 2px solid var(--ui-colors-gray-50);
    border-radius: 6px;
    transition: all var(--ui-transition);

    &::placeholder {
        color: var(--ui-colors-gray-400);
    }

    &:focus {
        border-color: var(--ui-colors-primary-500);
        outline: none;
    }

    &:disabled {
        opacity: 0.3;
    }
}
</style>
