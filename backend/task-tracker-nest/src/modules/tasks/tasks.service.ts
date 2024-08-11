import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task as TaskModel } from './tasks.model';
import { CreateTaskDto, UpdateTaskDto } from './dto/tasks.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(TaskModel)
        private readonly taskModel: typeof TaskModel,
    ) {}

    // Создание новой задачи
    async createTask(createTaskDto: CreateTaskDto): Promise<TaskModel> {
        return await this.taskModel.create(createTaskDto);
    }

    // Получение всех задач
    async getAllTasks(): Promise<TaskModel[]> {
        return this.taskModel.findAll();
    }

    // Получение задачи по ID
    async getTaskById(id: string): Promise<TaskModel> {
        const task = await this.taskModel.findByPk(id);
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }
        return task;
    }

    // Обновление задачи по ID
    async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskModel> {
        const task = await this.getTaskById(id); // Используем метод получения задачи по ID
        await task.update(updateTaskDto as Partial<TaskModel>); // Приведение типа
        return task;
    }

    // Удаление задачи по ID
    async deleteTask(id: string): Promise<void> {
        const task = await this.getTaskById(id); // Используем метод получения задачи по ID
        await task.destroy();
    }
}
