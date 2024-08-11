import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidateInputPipe } from './core/pipes/validate.pipe';
import { ColumnsModule } from './modules/columns/columns.module';
import { TasksModule } from './modules/tasks/tasks.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const setSwaggerModules = (list: Array<[string | null, Function[]]>) => {
        for (const [path, modules] of list) {
            const config = new DocumentBuilder()
                .setTitle(path ? `${path.toUpperCase()}.API` : 'CORE.API')
                .setDescription('Task.traker API')
                .setVersion('0.0.1')
                .build();

            const document = SwaggerModule.createDocument(app, config, {
                include: modules,
            });

            SwaggerModule.setup(path ? `/api/${path}/docs` : '/api/docs', app, document);
        }
    };

    app.setGlobalPrefix('api');

    // Swagger Config
    setSwaggerModules([[null, [ColumnsModule, TasksModule]]]);

    app.useGlobalPipes(new ValidateInputPipe());
    app.enableCors({
        origin: 'http://localhost:3000',
    });
    await app.listen(8000);
}

bootstrap();
