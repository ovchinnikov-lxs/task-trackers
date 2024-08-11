import { HasMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../tasks/tasks.model';

export interface ColumnCreationAttrs {
    title: string;
    order: number;
}

@Table
export class ColumnModel extends Model<ColumnModel, ColumnCreationAttrs> {
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

    @ApiProperty({ description: 'Название колонки' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @ApiProperty({ description: 'Порядок колонки' })
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    order: number;

    @ApiProperty({ description: 'Задачи в колонке' })
    @HasMany(() => Task)
    tasks: Task[];
}
