import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateColumnDto {
    @IsString()
    readonly title: string;

    @IsInt()
    readonly order: number;
}

export class UpdateColumnDto {
    @IsOptional()
    @IsString()
    readonly title?: string;

    @IsOptional()
    @IsInt()
    readonly order?: number;
}
