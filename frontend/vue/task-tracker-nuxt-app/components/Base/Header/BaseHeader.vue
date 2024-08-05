<template>
    <header class="BaseHeader">
        <div :class="$style.wrapper">
            <h2 :class="$style.title">{{ $t('header.title') }}</h2>
        </div>
    </header>
</template>

<style lang="scss" module>
.wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 32px;
    background: var(--ui-colors-base-white);
    border-bottom: 2px solid var(--ui-colors-gray-50);
}

.title {
    font-size: var(--ui-heading-5-medium);
    font-weight: normal;
    color: var(--ui-colors-gray-900);
}
</style>
