import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/tasks.dto';
import { Task } from './tasks.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @ApiOperation({ summary: 'Создание новой задачи' })
    @ApiResponse({ status: 201, type: Task })
    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @ApiOperation({ summary: 'Получение списка всех задач' })
    @ApiResponse({ status: 200, type: Task, isArray: true })
    @Get()
    async getAllTasks(): Promise<Task[]> {
        return this.tasksService.getAllTasks();
    }

    @ApiOperation({ summary: 'Получение задачи по ID' })
    @ApiResponse({ status: 200, type: Task })
    @Get(':id')
    async getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @ApiOperation({ summary: 'Обновление задачи по ID' })
    @ApiResponse({ status: 200, type: Task })
    @Put(':id')
    async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.tasksService.updateTask(id, updateTaskDto);
    }

    @ApiOperation({ summary: 'Удаление задачи по ID' })
    @ApiResponse({ status: 200, type: Task })
    @Delete(':id')
    async deleteTask(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(id);
    }
}
