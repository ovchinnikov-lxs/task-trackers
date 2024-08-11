import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColumnsService } from './columns.service';
import { ColumnModel } from './columns.model';
import { CreateColumnDto, UpdateColumnDto } from './dto/columns.dto';

@ApiTags('Columns')
@Controller('columns')
export class ColumnsController {
    constructor(private readonly columnsService: ColumnsService) {}

    @ApiOperation({ summary: 'Создание новой колонки' })
    @ApiResponse({ status: 201, type: ColumnModel })
    @Post()
    create(@Body() createColumnDto: CreateColumnDto) {
        return this.columnsService.create(createColumnDto);
    }

    @ApiOperation({ summary: 'Получение всех колонок' })
    @ApiResponse({ status: 200, type: ColumnModel, isArray: true })
    @Get()
    getAll() {
        return this.columnsService.findAll();
    }

    @ApiOperation({ summary: 'Получение колонки по ID' })
    @ApiResponse({ status: 200, type: ColumnModel })
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.columnsService.findOne(id);
    }

    @ApiOperation({ summary: 'Обновление колонки по ID' })
    @ApiResponse({ status: 200, type: ColumnModel })
    @Put(':id')
    update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
        return this.columnsService.update(id, updateColumnDto);
    }

    @ApiOperation({ summary: 'Удаление колонки по ID' })
    @ApiResponse({ status: 204, description: 'Удаление успешно' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.columnsService.remove(id);
    }
}
