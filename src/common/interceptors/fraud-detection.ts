import { CallHandler, ExecutionContext, Inject, NestInterceptor, UnprocessableEntityException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { PrismaService } from '../connections/prisma.service'
import dayjs from 'dayjs'
import { PaymentStatus } from '../types/payment.type'

export class FraudDetection implements NestInterceptor {
    @Inject()
    private readonly prisma: PrismaService

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest()
        const reservation = request.reservation
        const hostInfo = request.hostInformation
        const customer = request.customer
        const blockedTime = await this.prisma.fraudBlocked.findFirst({
            where: {
                listingId: reservation.listingId,
                customer: reservation.guestInfo.email,
                expiredAt: {
                    gte: new Date(),
                },
            },
        })
        if (blockedTime) {
            throw new UnprocessableEntityException({
                message: 'Payment is unavailable because of too many failed attempts. Try again in a few hours',
            })
        }
        const transactionCount = await this.prisma.transaction.count({
            where: {
                createdAt: {
                    gte: dayjs().subtract(5, 'minutes').toDate(),
                },
                OR: [
                    {
                        propertyId: reservation.listingId.toString(),
                        AND: [
                            {
                                metadata: {
                                    path: ['guestInfo'],
                                    equals: reservation.guestInfo,
                                },
                            },
                            {
                                metadata: {
                                    path: ['checkinDate'],
                                    equals: reservation.checkinDate,
                                },
                            },
                            {
                                metadata: {
                                    path: ['checkoutDate'],
                                    equals: reservation.checkoutDate,
                                },
                            },
                        ],
                    },
                    {
                        customerId: customer,
                        status: PaymentStatus.FAILED,
                        failureCode: 'card_declined',
                    },
                ],
            },
        })
        if (transactionCount >= 3) {
            await this.prisma.fraudBlocked.create({
                data: {
                    customer: reservation.guestInfo.email,
                    listingId: reservation.listingId,
                    expiredAt: dayjs().add(30, 'minutes').toDate(),
                },
            })
            throw new UnprocessableEntityException({
                message: 'Payment is unavailable because of too many failed attempts. Try again in a few hours',
            })
        }
        console.log(transactionCount)
        return next.handle()
    }
}
