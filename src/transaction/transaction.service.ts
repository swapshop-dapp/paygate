import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../common/connections/prisma.service'
import { GivebackDto } from './dto/GivebackDto'
import { DateTime } from 'luxon'
import { PaymentGateway, PaymentStatus, PaymentType } from '../common/types/payment.type'
import { ConfigService } from '@nestjs/config'
import AccountClientService from '../shares/httpclient/accountclient.service'

@Injectable()
export class TransactionService {
    constructor(
        private prisma: PrismaService,
        private readonly config: ConfigService,
        private readonly accountClientService: AccountClientService,
    ) {}

    queryTransaction(reservationId: string) {
        return this.prisma.transaction.findMany({
            where: { bookingId: reservationId, amount: { gt: 0 } },
        })
    }

    async getPayoutTransaction(giveback: GivebackDto) {
        const listUserTesting = await this.accountClientService.getListUserTesting()
        const listUserTestingId = listUserTesting.map((v) => v.id)
        const dateFrom = DateTime.fromFormat(giveback.dateFrom, 'yyyyMMdd', { zone: 'UTC' })
        const dateTo = DateTime.fromFormat(giveback.dateTo, 'yyyyMMdd', { zone: 'UTC' })
        const diffDays = dateTo.diff(dateFrom, ['months', 'days', 'hours', 'minutes', 'seconds']).days
        if (!dateFrom.toJSDate() || !dateTo.toJSDate()) {
            throw new BadRequestException('Invalid date input')
        }
        if (giveback.dateTo <= giveback.dateFrom || diffDays >= 90) {
            throw new BadRequestException('DateTo must be greater than DateFrom and < 90 days')
        }
        return this.prisma.transaction.findMany({
            where: {
                createdAt: {
                    gte: dateFrom.startOf('day').toJSDate(),
                    lte: dateTo.endOf('day').toJSDate(),
                },
                gateway: PaymentGateway.WALLET,
                status: PaymentStatus.SUCCEEDED,
                type: PaymentType.PAYMENT,
                OR: [
                    {
                        NOT: {
                            hostId: {
                                in: listUserTestingId,
                            },
                        },
                    },
                    {
                        hostId: null,
                    },
                ],
            },
            orderBy: { createdAt: 'asc' },
        })
    }

    async getPartialPayoutTransaction(reservationId: string) {
        return this.prisma.transaction.findMany({
            where: {
                gateway: PaymentGateway.WALLET,
                status: PaymentStatus.SUCCEEDED,
                type: PaymentType.PARTIAL_PAYMENT,
                bookingId: reservationId,
            },
            orderBy: { createdAt: 'asc' },
        })
    }
}
