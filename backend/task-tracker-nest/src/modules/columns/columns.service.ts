import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ColumnModel } from './columns.model';
import { CreateColumnDto, UpdateColumnDto } from './dto/columns.dto';
import { Task } from '../tasks/tasks.model';

@Injectable()
export class ColumnsService {
    constructor(
        @InjectModel(ColumnModel)
        private readonly columnModel: typeof ColumnModel,
    ) {}

    async create(createColumnDto: CreateColumnDto): Promise<ColumnModel> {
        return await this.columnModel.create(createColumnDto);
    }

    async findAll(): Promise<ColumnModel[]> {
        return this.columnModel.findAll({
            include: [Task], // Включаем связанные задачи
        });
    }

    async findOne(id: string): Promise<ColumnModel> {
        const column = await this.columnModel.findByPk(id, {
            include: [Task], // Включаем связанные задачи
        });
        if (!column) {
            throw new NotFoundException(`Column with ID ${id} not found`);
        }
        return column;
    }

    async update(id: string, updateColumnDto: UpdateColumnDto): Promise<ColumnModel> {
        const column = await this.columnModel.findByPk(id);
        if (!column) {
            throw new NotFoundException(`Column with ID ${id} not found`);
        }
        await column.update(updateColumnDto);
        return column;
    }

    async remove(id: string): Promise<void> {
        const column = await this.columnModel.findByPk(id);
        if (!column) {
            throw new NotFoundException(`Column with ID ${id} not found`);
        }
        await column.destroy();
    }
}
