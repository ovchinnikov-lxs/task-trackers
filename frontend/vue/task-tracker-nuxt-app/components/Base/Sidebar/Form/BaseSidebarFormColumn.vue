<template>
    <form
        class="BaseSidebarFormColumn"
        @submit.prevent="onSubmit"
    >
        <div :class="$style.wrapper">
            <BaseInput
                v-model="actualValue.title"
                :placeholder="$t('sidebar.form.fields.column.title.placeholder')"
                :disabled="isColumnsLoading"
            />

            <BaseSelect
                v-model="actualValue.order"
                :placeholder="$t('sidebar.form.fields.column.order.placeholder')"
                :options="orderOptions"
                :disabled="isColumnsLoading"
            />

            <BaseButton type="submit">
                {{ $t('sidebar.form.fields.column.submitButton') }}
            </BaseButton>
        </div>
    </form>
</template>

<script setup lang="ts">
function useColumnForm() {
    const { t } = useI18n();
    const columnStore = useColumnsStore();

    const orderOptions = computed(() =>
        Array.from({ length: columnStore.columns.length + 1 }).map((_, id) => ({
            id: String(id),
            name: t('sidebar.form.fields.column.order.option', { order: id + 1 }),
        })),
    );

    const isColumnsLoading = computed(() => columnStore.loadingStatus === 'pending');

    const actualValue = reactive({
        title: '',
        order: '',
    });

    watch(isColumnsLoading, () => {
        actualValue.order = orderOptions.value[orderOptions.value.length - 1].id;
    });

    async function onSubmit() {
        if (!actualValue.title || !actualValue.order) {
            console.error('FILL'); // TODO: FILL

            return;
        }

        try {
            columnStore.loadingStatus = 'pending';

            await $fetch('/api/columns', {
                method: 'POST',
                body: {
                    title: actualValue.title,
                    order: Number(actualValue.order),
                },
            });
            await columnStore.fetchColumns();

            actualValue.title = '';
            actualValue.order = '';
            columnStore.loadingStatus = 'success';
        } catch (e) {
            console.error('USE_COLUMN_FORM:ON_SUBMIT', e);
            columnStore.loadingStatus = 'error';
        }
    }

    return {
        actualValue,
        orderOptions,
        onSubmit,
        isColumnsLoading,
    };
}

const { actualValue, orderOptions, onSubmit, isColumnsLoading } = useColumnForm();
</script>

<style module lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    width: 100%;
    height: 100%;
}
</style>
