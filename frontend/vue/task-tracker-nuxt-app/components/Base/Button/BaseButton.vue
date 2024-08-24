<template>
    <div class="BaseButton">
        <button
            v-bind="$attrs"
            :type="type"
            :class="[$style.button, classList]"
            @click="emit('click', $event)"
        >
            <slot></slot>
        </button>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    inheritAttrs: true,
});

const props = withDefaults(
    defineProps<{
        type?: 'submit' | 'button';
        size?: 'medium' | 'small';
        color?: 'primary' | 'danger';
    }>(),
    {
        type: 'button',
        size: 'medium',
        color: 'primary',
    },
);

const emit = defineEmits<{
    click: [MouseEvent];
}>();

const style = useCssModule();

const classList = computed(() => [
    [style[`--${props.size}-size`]],
    [style[`--${props.color}-color`]],
]);
</script>

<style module lang="scss">
.button {
    width: 100%;
    height: 100%;
    cursor: pointer;
    border: none;
    border-radius: 6px;
    outline: none;

    &:focus {
        outline: none;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.3;
    }

    &.--medium-size {
        padding: 10px 28px;
        font-size: var(--ui-text-m-medium);
        line-height: 26px;
    }

    &.--small-size {
        padding: 4px 8px;
        font-size: var(--ui-text-xs-regular);
        line-height: var(var(--ui-text-xs-regular));
    }

    &.--primary-color {
        color: var(--ui-colors-base-white);
        background: var(--ui-colors-primary-500);
    }

    &.--danger-color {
        color: var(--ui-colors-base-white);
        background: var(--ui-colors-danger-500);
    }
}
</style>
