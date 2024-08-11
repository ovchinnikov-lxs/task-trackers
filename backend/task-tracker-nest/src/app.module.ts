import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

// Modules
import { ColumnsModule } from './modules/columns/columns.module';
import { TasksModule } from './modules/tasks/tasks.module';

// Models
import { ColumnModel } from './modules/columns/columns.model';
import { Task } from './modules/tasks/tasks.model';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME_DEVELOPMENT,
            models: [ColumnModel, Task],
            autoLoadModels: true,
        }),
        ColumnsModule,
        TasksModule,
    ],
})
export class AppModule {}
