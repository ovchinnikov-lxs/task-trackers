import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { ColumnModel } from './columns.model';
import { Task } from '../tasks/tasks.model';

@Module({
    imports: [SequelizeModule.forFeature([ColumnModel, Task])],
    controllers: [ColumnsController],
    providers: [ColumnsService],
})
export class ColumnsModule {}
