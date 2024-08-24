<template>
    <div class="BaseInput">
        <textarea
            ref="inputRef"
            v-bind="$attrs"
            v-model="model"
            :class="$style.textarea"
        />
    </div>
</template>

<script setup lang="ts">
defineOptions({
    inheritAttrs: true,
});

const model = defineModel<string>({ required: true });
const inputRef = ref<HTMLTextAreaElement>();

defineExpose({
    inputRef,
});
</script>

<style module lang="scss">
.textarea {
    width: 100%;
    height: 100%;
    padding: 10px 16px;
    font-size: var(--ui-text-m-regular);
    line-height: 26px;
    color: var(--ui-colors-gray-900);
    resize: none;
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

    @supports (field-sizing: content) {
        field-sizing: content;
    }
}
</style>
