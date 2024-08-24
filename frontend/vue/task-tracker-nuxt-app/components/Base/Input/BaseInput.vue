<template>
    <div class="BaseInput">
        <input
            v-bind="$attrs"
            v-model="model"
            :class="$style.input"
        />
    </div>
</template>

<script setup lang="ts">
defineOptions({
    inheritAttrs: true,
});

const model = defineModel<string | null>({ required: true });
</script>

<style module lang="scss">
.input {
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
