import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { TransactionService } from './transaction.service'
import InternalAuthGuard from '../common/auth/guards/internal-auth.guard'
import { GivebackDto } from './dto/GivebackDto'

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get('/reservation/:reservationId')
    @UseGuards(InternalAuthGuard)
    async method(@Param('reservationId') reservationId: string) {
        return await this.transactionService.queryTransaction(reservationId)
    }

    @Get('/payout')
    @UseGuards(InternalAuthGuard)
    async getPayout(@Query() givebackDto: GivebackDto) {
        return await this.transactionService.getPayoutTransaction(givebackDto)
    }

    @Get('/partial-payout')
    @UseGuards(InternalAuthGuard)
    async getPartialPayout(@Query('reservationId') reservationId: string) {
        return await this.transactionService.getPartialPayoutTransaction(reservationId)
    }
}
