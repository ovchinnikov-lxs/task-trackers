import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { TTasksRole, TTasksStatus } from '../tasks.model';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsOptional()
    readonly description?: string;

    @IsString()
    @IsOptional()
    readonly image?: string;

    // @IsEnum(TTasksStatus)
    @IsNotEmpty()
    readonly status: TTasksStatus;

    // @IsEnum(TTasksRole)
    @IsNotEmpty()
    readonly role: TTasksRole;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    readonly assign: string[];

    @IsDateString()
    @IsNotEmpty()
    readonly deadline: string;

    @IsUUID()
    @IsNotEmpty()
    readonly columnId: string;

    @IsNotEmpty()
    readonly order: number;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
