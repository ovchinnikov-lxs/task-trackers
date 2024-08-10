import type { InjectionKey, Ref } from 'vue';
import type { ITasksItem } from '~/types/tasks/tasks';

export const tasksListKey = Symbol('ITasksItem[]') as InjectionKey<Ref<ITasksItem[]>>;
