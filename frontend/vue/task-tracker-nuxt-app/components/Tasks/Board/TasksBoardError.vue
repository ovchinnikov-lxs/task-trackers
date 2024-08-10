<template>
    <div class="TasksBoardError">
        <div :class="$style.wrapper">
            <h4 :class="$style.title">
                {{ $t('pages.tasks.board.error.title') }}
            </h4>
        </div>
    </div>
</template>

<style module lang="scss">
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.title {
    color: var(--ui-colors-danger-500);
    text-align: center;
}
</style>
