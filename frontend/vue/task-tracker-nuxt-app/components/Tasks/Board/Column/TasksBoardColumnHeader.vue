<template>
    <div class="TasksBoardColumnHeader">
        <div :class="$style.wrapper">
            <h5 :class="$style.title">{{ title }}</h5>

            <div :class="$style.count">
                <Transition
                    name="bottom"
                    mode="out-in"
                >
                    <div :key="count">
                        {{ count }}
                    </div>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    count: number;
}>();
</script>

<style module lang="scss">
.wrapper {
    display: flex;
    column-gap: 16px;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 16px;
    background: var(--ui-colors-base-white);
    border: 2px solid var(--ui-colors-gray-50);
    border-radius: 6px;
}

.title {
    font-size: var(--ui-heading-7-semi-bold);
    font-weight: bold;
    color: var(--ui-colors-gray-900);
}

.count {
    padding: 6px 14px;
    border: 2px solid var(--ui-colors-gray-900);
    border-radius: 6px;
}
</style>
