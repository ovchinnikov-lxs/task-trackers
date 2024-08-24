<template>
    <aside class="BaseSidebar">
        <div :class="$style.wrapper">
            <h1 :class="$style.title">{{ $t('sidebar.title') }}</h1>

            <BaseSidebarForm />
        </div>
    </aside>
</template>

<style lang="scss" module>
.wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 48px;
    width: 100%;
    height: 100%;
    padding: 32px;
    background: var(--ui-colors-base-white);
    border-right: 2px solid var(--ui-colors-gray-50);
}

.title {
    font-size: var(--ui-heading-5-semi-bold);
    font-weight: bold;
}
</style>
