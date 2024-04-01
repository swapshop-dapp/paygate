import { Module } from '@nestjs/common'
import PaymentController from './payment.controller'
import PaymentService from './payment.service'
import { PrismaModule } from '../common/connections/prisma.module'
import { HttpclientModule } from "../shares/httpclient/httpclient.module";

@Module({
    imports: [PrismaModule, HttpclientModule],
    providers: [PaymentService],
    exports: [PaymentService],
    controllers: [PaymentController],
})
export default class PaymentModule {}
