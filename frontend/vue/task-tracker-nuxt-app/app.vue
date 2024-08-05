<template>
    <div class="App">
        <AppFonts />

        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<style lang="scss">
.App {
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;

    & > * {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        & > * {
            flex-grow: 1;
        }
    }
}
</style>
