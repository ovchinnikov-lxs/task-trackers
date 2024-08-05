<template>
    <main class="LayoutDefault">
        <div :class="$style.wrapper">
            <BaseSidebar :class="$style.sidebar" />

            <div :class="$style.main">
                <BaseHeader :class="$style.header" />

                <div :class="$style.page">
                    <slot></slot>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" module>
.wrapper {
    --sidebar-width: 320px;

    display: flex;
    width: 100%;
    height: 100%;
    background: var(--ui-colors-base-neutral);
}

.sidebar {
    flex-shrink: 0;
    width: var(--sidebar-width);
}

.header {
    flex-shrink: 0;
    height: 110px;
}

.main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: calc(100% - var(--sidebar-width));
}

.page {
    flex-grow: 1;
    padding: 32px;

    & > * {
        width: 100%;
        height: 100%;
    }
}
</style>
