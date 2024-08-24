<template>
    <div class="BaseLang">
        <BaseSelect
            v-model="actualValue"
            :placeholder="$t('header.lang.placeholder')"
            :options="localeOptions"
            @update:model-value="onChangeLocale"
        />
    </div>
</template>

<script setup lang="ts">
function useLocalSwitch() {
    const i18n = useI18n();

    const actualValue = ref(i18n.locale.value);

    function onChangeLocale() {
        const switchLocalePath = useSwitchLocalePath();

        try {
            navigateTo(switchLocalePath(actualValue.value));
        } catch (err) {
            console.error('USE_LOCAL_SWITCH:ON_CHANGE_LOCALE:', err);
        }
    }

    const localeOptions = computed(() =>
        i18n.availableLocales.map((item) => ({
            id: item,
            name: item,
        })),
    );

    return {
        localeOptions,
        actualValue,
        onChangeLocale,
    };
}
const { localeOptions, actualValue, onChangeLocale } = useLocalSwitch();
</script>

<style module lang="scss">
.wrapper {
    width: 100%;
    height: 100%;
}
</style>
