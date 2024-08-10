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
    deadline: string | Date;
    doing?: string | Date;
    review?: string | Date;
    done?: string | Date;
    columnId: string;
    order: number;
}

export interface ITasksColumn {
    id: string;
    title: string;
    order: number;
    tasks: ITasksItem[];
}
