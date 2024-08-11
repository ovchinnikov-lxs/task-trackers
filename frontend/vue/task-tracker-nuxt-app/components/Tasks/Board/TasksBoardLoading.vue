<template>
    <div class="TasksBoardLoading">
        <div :class="$style.wrapper">
            <div
                v-for="item in 4"
                :key="item"
                :class="$style.column"
            >
                <div :class="$style.header"></div>

                <div
                    v-for="task in 3"
                    :key="task"
                    :class="$style.task"
                ></div>
            </div>
        </div>
    </div>
</template>

<style module lang="scss">
@mixin animated-gradient($primary-color, $secondary-color) {
    background: linear-gradient(135deg, $primary-color 47%, $secondary-color 50%, $primary-color 53%);
    background-size: 400% 400%;
    transition: all var(--ui-transition);
    transform: translate3d(0, 0, 0);
    animation: gradient 3s ease infinite;

    @keyframes gradient {
        0% {
            background-position: 100% 50%;
        }

        50% {
            background-position: 0 50%;
        }

        100% {
            background-position: 100% 50%;
        }
    }
}

@mixin card {
    width: 100%;
    border: 2px solid var(--ui-colors-gray-50);
    border-radius: 6px;

    @include animated-gradient(var(--ui-colors-base-white), var(--ui-colors-base-neutral));
}

.wrapper {
    display: flex;
    column-gap: 24px;
    width: 100%;
    height: 100%;
    padding: 0 32px;
}

.column {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    row-gap: 16px;
    width: 356px;
}

.header {
    @include card;

    height: 68px;
}

.task {
    @include card;

    height: 300px;

    &:nth-child(2n) {
        height: 400px;
    }
}
</style>
