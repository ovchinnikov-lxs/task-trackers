import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { ColumnModel } from '../columns/columns.model';

export type TTasksStatus = 'low' | 'medium' | 'high';
export type TTasksRole = 'dev' | 'ux' | 'all';

interface TaskCreationAttrs {
    title: string;
    description?: string;
    image?: string;
    status: TTasksStatus;
    role: TTasksRole;
    assign: string[];
    deadline: string | Date;
    columnId: string;
    order: number;
}

@Table
export class Task extends Model<Task, TaskCreationAttrs> {
    @ApiProperty({
        example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
        description: 'Идентификатор',
    })
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        allowNull: false,
    })
    id: string;

    @ApiProperty({ description: 'Название задачи' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @ApiProperty({ description: 'Описание задачи' })
    @Column({
        type: DataType.STRING,
    })
    description: string;

    @ApiProperty({ description: 'Изображение задачи' })
    @Column({
        type: DataType.STRING,
    })
    image: string;

    @ApiProperty({ description: 'Статус задачи' })
    @Column({
        type: DataType.ENUM('low', 'medium', 'high'),
        allowNull: false,
    })
    status: TTasksStatus;

    @ApiProperty({ description: 'Роль, назначенная для задачи' })
    @Column({
        type: DataType.ENUM('dev', 'ux', 'all'),
        allowNull: false,
    })
    role: TTasksRole;

    @ApiProperty({ description: 'Список назначенных пользователей' })
    @Column({
        type: DataType.ARRAY(DataType.STRING),
        allowNull: false,
    })
    assign: string[];

    @ApiProperty({ description: 'Срок выполнения задачи' })
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    deadline: Date;

    @ApiProperty({ description: 'Идентификатор колонки' })
    @ForeignKey(() => ColumnModel)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    columnId: string;

    @BelongsTo(() => ColumnModel)
    column: ColumnModel;

    @ApiProperty({ description: 'Порядок задачи' })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    order: number;
}
