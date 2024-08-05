export type TTasksStatus = 'low' | 'medium' | 'high';
export type TTasksRole = 'dev' | 'ux' | 'all';
export interface ITasksItem {
    id: string;
    title: string;
    description?: string;
    image?: string;
    status: TTasksStatus;
    role: TTasksRole;
    assign: string[];
    deadline: Date;
    doing?: Date;
    review?: Date;
    done?: Date;
}

export interface IBoardColumn {
    title: 'todo' | 'doing' | 'review' | 'done';
    tasks: ITasksItem[];
}
