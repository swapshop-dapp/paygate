import { Module } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import { TransactionController } from './transaction.controller'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from '../common/connections/prisma.module'
import { HttpclientModule } from '../shares/httpclient/httpclient.module'

@Module({
    imports: [ConfigModule, PrismaModule, HttpclientModule],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {}
