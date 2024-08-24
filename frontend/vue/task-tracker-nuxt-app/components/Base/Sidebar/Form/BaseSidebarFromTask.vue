<template>
    <form
        class="BaseSidebarFormTask"
        @submit.prevent="onSubmit"
    >
        <div :class="[$style.wrapper, classList]">
            <BaseTextarea
                id="form-task-title"
                ref="titleRef"
                v-model="actualValue.title"
                name="title"
                :placeholder="$t('sidebar.form.fields.task.title.placeholder')"
                :aria-label="$t('sidebar.form.fields.task.title.label')"
                autocomplete="on"
            />

            <BaseTextarea
                id="form-task-description"
                v-model="actualValue.description"
                name="description"
                :placeholder="$t('sidebar.form.fields.task.description.placeholder')"
                :aria-label="$t('sidebar.form.fields.task.description.label')"
                autocomplete="on"
            />

            <BaseInput
                id="form-task-image"
                v-model="actualValue.image"
                name="image"
                :placeholder="$t('sidebar.form.fields.task.image.placeholder')"
                :aria-label="$t('sidebar.form.fields.task.image.label')"
                autocomplete="on"
            />

            <BaseSelect
                id="form-task-status"
                v-model="actualValue.status"
                :options="statusOptions"
                name="status"
                :placeholder="$t('sidebar.form.fields.task.status.placeholder')"
                :aria-label="$t('sidebar.form.fields.task.status.label')"
                autocomplete="on"
            />

            <BaseSelect
                id="form-task-role"
                v-model="actualValue.role"
                :options="roleOptions"
                name="role"
                :placeholder="$t('sidebar.form.fields.task.role.placeholder')"
                :aria-label="$t('sidebar.form.fields.task.role.label')"
                autocomplete="on"
            />

            <BaseTextarea
                id="form-task-assign"
                v-model="actualValue.assign"
                name="assign"
                :placeholder="$t('sidebar.form.fields.task.assign.placeholder')"
                :aria-label="$t('sidebar.form.fields.task.assign.label')"
                autocomplete="on"
            />

            <BaseInput
                id="form-task-deadline"
                v-model="actualValue.deadline"
                type="datetime-local"
                name="deadline"
                :min="!tasksStore.editedTask ? formatDeadline(new Date()) : ''"
                :placeholder="$t('sidebar.form.fields.task.deadline.placeholder')"
                :aria-label="$t('sidebar.form.fields.task.deadline.label')"
                autocomplete="on"
            />

            <BaseSelect
                id="form-task-columnId"
                v-model="actualValue.columnId"
                :options="columnOptions"
                :disabled="isColumnsLoading"
                name="columnId"
                :placeholder="$t('sidebar.form.fields.task.columnId.placeholder')"
                :aria-label="$t('sidebar.form.fields.task.columnId.label')"
                autocomplete="on"
            />

            <BaseSelect
                id="form-task-order"
                v-model="actualValue.order"
                :disabled="!actualValue.columnId"
                :options="orderOptions || isColumnsLoading"
                name="order"
                :placeholder="$t('sidebar.form.fields.task.order.placeholder')"
                :aria-label="$t('sidebar.form.fields.task.order.label')"
                autocomplete="on"
            />

            <BaseButton
                type="submit"
                :disabled="!isFormFilled"
            >
                {{ $t('sidebar.form.fields.task.submitButton') }}
            </BaseButton>

            <BaseButton
                v-if="tasksStore.editedTask"
                color="danger"
                @click="onDelete"
            >
                {{ $t('sidebar.form.fields.task.deleteButton') }}
            </BaseButton>
        </div>
    </form>
</template>

<script setup lang="ts">
import { BaseTextarea } from '#components';
const tasksStore = useTasksStore();

function useTaskForm() {
    const { t } = useI18n();
    const columnStore = useColumnsStore();
    const titleRef = ref<InstanceType<typeof BaseTextarea> | null>(null);
    const inFocus = ref(false);
    const style = useCssModule();

    const classList = computed(() => [
        {
            [style['--in-focus']]: inFocus.value,
        },
    ]);

    const initialValue = {
        title: '',
        description: '',
        image: '',
        status: '',
        role: '',
        assign: '',
        deadline: '',
        columnId: '',
        order: '',
    };

    const actualValue = reactive({ ...initialValue });

    function formatDeadline(value: string | Date): string {
        return new Date(value).toISOString().slice(0, 16);
    }

    const unsubscribe = tasksStore.$onAction((ctx) => {
        ctx.after(() => {
            nextTick(() => {
                if (ctx.name === 'setEditedTask' && ctx.store.editedTask !== null) {
                    inFocus.value = true;

                    Object.assign(actualValue, {
                        ...ctx.store.editedTask,
                        assign: ctx.store.editedTask.assign.join(', '),
                        deadline: formatDeadline(ctx.store.editedTask.deadline),
                    });

                    nextTick(() => {
                        titleRef.value?.inputRef?.focus();

                        const timeout = setTimeout(() => {
                            inFocus.value = false;

                            clearTimeout(timeout);
                        }, 1000);
                    });
                }
            });
        });
    });

    onBeforeUnmount(() => {
        unsubscribe();
    });

    const statusOptions = computed(() =>
        [
            'low',
            'medium',
            'high',
        ].map((id) => ({
            id,
            name: t(`tasks.status.${id}`),
        })),
    );

    const roleOptions = computed(() =>
        [
            'dev',
            'ux',
            'all',
        ].map((id) => ({
            id,
            name: t(`tasks.role.${id}`),
        })),
    );

    const orderOptions = computed(() => {
        const actualColumn = columnStore.columns.find((item) => item.id === actualValue.columnId);

        if (!actualColumn) {
            return [];
        }

        return Array.from({ length: actualColumn.tasks.length + 1 }).map((_, id) => ({
            id: String(id),
            name: t('sidebar.form.fields.task.order.option', { order: id + 1 }),
        }));
    });

    const columnOptions = computed(() =>
        columnStore.columns.map((item) => ({
            id: item.id,
            name: t('sidebar.form.fields.task.columnId.option', { column: item.title }),
        })),
    );

    const isColumnsLoading = computed(() => columnStore.loadingStatus === 'pending');

    const isFormFilled = computed(() => !Object.values(actualValue).some((value) => !String(value)));

    async function serverUpdateWrapper(asyncFunction: () => Promise<unknown>) {
        try {
            columnStore.loadingStatus = 'pending';

            await asyncFunction();

            await columnStore.fetchColumns();
            Object.assign(actualValue, initialValue);

            columnStore.loadingStatus = 'success';
        } catch (e) {
            console.error('USE_TASK_FORM:SERVER_UPDATE_WRAPPER', e);
            columnStore.loadingStatus = 'error';
        }
    }

    function onSubmit() {
        if (!isFormFilled.value) {
            return;
        }

        serverUpdateWrapper(() =>
            $fetch(`/api/tasks${tasksStore.editedTask ? `/${tasksStore.editedTask.id}` : ''}`, {
                method: tasksStore.editedTask === null ? 'POST' : 'PUT',
                body: {
                    ...actualValue,
                    assign: actualValue.assign.split(', '),
                    order: Number(actualValue.order),
                },
            }),
        );
    }

    function onDelete() {
        serverUpdateWrapper(() =>
            $fetch(`/api/tasks/${tasksStore.editedTask?.id}`, {
                method: 'DELETE',
                body: {},
            }),
        );
    }

    return {
        actualValue,
        orderOptions,
        onDelete,
        onSubmit,
        isColumnsLoading,
        statusOptions,
        roleOptions,
        columnOptions,
        isFormFilled,
        titleRef,
        classList,
        formatDeadline,
    };
}

const { actualValue, statusOptions, roleOptions, columnOptions, orderOptions, onSubmit, onDelete, isFormFilled, isColumnsLoading, titleRef, classList, formatDeadline } =
    useTaskForm();
</script>

<style module lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    width: 100%;
    height: 100%;

    &::before {
        position: fixed;
        top: 0;
        left: var(--sidebar-width);
        z-index: 3;
        display: block;
        width: calc(100% - var(--sidebar-width));
        height: 100dvh;
        pointer-events: none;
        content: '';
        background: var(--ui-colors-primary-100);
        opacity: 0;
        transition: opacity var(--ui-transition);
    }

    &.--in-focus {
        &::before {
            opacity: 0.5;
        }
    }
}
</style>
