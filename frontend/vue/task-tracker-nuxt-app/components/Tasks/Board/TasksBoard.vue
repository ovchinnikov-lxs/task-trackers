<template>
    <div class="TasksBoard">
        <div :class="$style.wrapper">
            <div :class="$style.inner">
                <TasksBoardColumn
                    v-for="item in columns"
                    :key="item.title"
                    :title="item.title"
                    :tasks="item.tasks"
                    :class="$style.column"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IBoardColumn } from '~/types/tasks/tasks';

/*
    TODO: Добавить: время на карточку, статус стобца в карточка
 */

const columns: IBoardColumn[] = [
    {
        title: 'todo',
        tasks: [
            {
                id: '1',
                title: 'Create Wireframes',
                description: 'Create wireframes for the new landing page.',
                status: 'low',
                role: 'ux',
                assign: ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Black', 'David White', 'Eve Green'],
                deadline: new Date('2024-12-14'),
            },
            {
                id: '2',
                title: 'Design Mockups',
                description: 'Design high-fidelity mockups for the dashboard.',
                status: 'medium',
                role: 'ux',
                assign: ['Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Black'],
                deadline: new Date('2024-12-20'),
            },
            {
                id: '3',
                title: 'Plan Sprint',
                description: 'Plan the tasks and sprints for the next development cycle.',
                status: 'high',
                image: 'https://placehold.co/600x400',
                role: 'dev',
                assign: ['Alice Johnson', 'Bob Brown', 'Charlie Black'],
                deadline: new Date('2024-12-10'),
            },
        ],
    },
    {
        title: 'doing',
        tasks: [
            {
                id: '4',
                title: 'Develop Login Feature',
                status: 'medium',
                role: 'dev',
                assign: ['Bob Brown', 'Charlie Black'],
                deadline: new Date('2024-12-05'),
                doing: new Date('2024-11-20'),
            },
            {
                id: '5',
                title: 'Setup CI/CD',
                description: 'Configure continuous integration and continuous deployment.',
                status: 'high',
                image: 'https://placehold.co/300x700',
                role: 'dev',
                assign: ['Charlie Black'],
                deadline: new Date('2024-12-08'),
                doing: new Date('2024-11-22'),
            },
        ],
    },
    {
        title: 'review',
        tasks: [
            {
                id: '6',
                title: 'Code Review for Feature X',
                description: 'Conduct a thorough code review for the new feature X.',
                status: 'medium',
                image: 'https://placehold.co/600x400',
                role: 'all',
                assign: ['David White'],
                deadline: new Date('2024-11-30'),
                doing: new Date('2024-11-15'),
                review: new Date('2024-11-25'),
            },
            {
                id: '7',
                title: 'UX Review for Landing Page',
                description: 'Review the UX design for the new landing page.',
                status: 'low',
                image: 'https://placehold.co/100x100',
                role: 'ux',
                assign: ['Eve Green'],
                deadline: new Date('2024-12-01'),
                doing: new Date('2024-11-18'),
                review: new Date('2024-11-27'),
            },
        ],
    },
    {
        title: 'done',
        tasks: [
            {
                id: '8',
                title: 'Deploy Application',
                status: 'high',
                role: 'dev',
                assign: ['Frank Blue'],
                deadline: new Date('2024-11-20'),
                doing: new Date('2024-11-10'),
                review: new Date('2024-11-15'),
                done: new Date('2024-11-18'),
            },
            {
                id: '9',
                title: 'User Testing',
                description: 'Conduct user testing sessions.',
                status: 'medium',
                image: 'https://placehold.co/800x300',
                role: 'all',
                assign: ['Grace Red'],
                deadline: new Date('2024-11-25'),
                doing: new Date('2024-11-12'),
                review: new Date('2024-11-17'),
                done: new Date('2024-11-22'),
            },
        ],
    },
];
</script>

<style module lang="scss">
.wrapper {
    width: calc(100% + 64px);
    height: 100%;
    margin-left: -32px;
    overflow-x: auto;
}

.inner {
    display: flex;
    column-gap: 24px;
    padding: 0 32px;
}

.column {
    flex-shrink: 0;
    width: 356px;
}
</style>
