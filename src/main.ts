import { NestFactory } from '@nestjs/core'
import { ValidationPipe, VersioningType } from '@nestjs/common'
import helmet from 'helmet'
import compression from 'compression'
import { AppModule } from './app.module'
import { PrismaService } from './common/connections/prisma.service'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { DataTransformInterceptor } from './common/interceptors/data-tranform.interceptor'
import secretManager from './common/aws/secret-manager'

async function bootstrap() {
    await secretManager()
    const app = await NestFactory.create(AppModule, { bodyParser: false })
    app.use(helmet())
    app.use(compression())
    app.useGlobalPipes(new ValidationPipe())
    app.useGlobalInterceptors(new DataTransformInterceptor())
    app.enableVersioning({
        type: VersioningType.URI,
    })
    const config = app.get(ConfigService)
    const prismaService: PrismaService = app.get(PrismaService)
    await prismaService.enableShutdownHooks(app)
    if (process.env.ENV !== 'prod') {
        //Setup swagger
        const configSwagger = new DocumentBuilder()
            .addBearerAuth()
            .setTitle('PayGate service')
            .setDescription('API description')
            .build()
        const document = SwaggerModule.createDocument(app, configSwagger)
        SwaggerModule.setup('docs', app, document)
    }
    await app.listen(config.get('port'))
}

bootstrap()
