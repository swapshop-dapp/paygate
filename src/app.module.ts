import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { HealthController } from './health/health.controller'
import { TerminusModule } from '@nestjs/terminus'
import { PrismaModule } from './common/connections/prisma.module'
import configuration from '../config/configuration'
import { AuthModule } from './common/auth/auth.module'
import PaymentModule from './payment/payment.module'
import CurrencyModule from './currency/module'
import { ScheduleModule } from '@nestjs/schedule'
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `${process.cwd()}/config/env/${process.env.ENV || 'local'}.env`,
            expandVariables: true,
            load: [configuration],
            isGlobal: true,
        }),
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                ...config.get('throttle'),
            }),
        }),
        PrismaModule,
        TerminusModule,
        AuthModule,
        PaymentModule,
        ScheduleModule.forRoot(),
        CurrencyModule,
    ],
    controllers: [HealthController],
    providers: [],
})
export class AppModule {}
