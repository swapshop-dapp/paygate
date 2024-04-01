import { PrismaService } from '../common/connections/prisma.service'
import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { isUUID } from '@nestjs/common/utils/is-uuid'
import { PAYMENT_TYPE } from '../common/const/payment'
import AccountClientService from '../shares/httpclient/accountclient.service'
import { FeeOptionDto } from './dto/fee-option.dto'
import UserPayload from '../common/auth/user.payload'

@Injectable()
export default class PaymentService {
    constructor(private readonly prisma: PrismaService, private readonly accountService: AccountClientService) {}

    async getPaymentMethodActiveByHostId(hostAddress) {
        let condition: Record<any, any> = {}
        if (isUUID(hostAddress)) {
            condition = {
                userId: hostAddress,
            }
        } else {
            const user = await this.accountService.getActiveUserByWalletId(hostAddress)
            condition = {
                userId: user.id,
            }
        }
        return this.prisma.paymentMethod.findMany({
            where: {
                ...condition,
                status: true,
            },
            select: {
                status: true,
                key: true,
                type: true,
                name: true,
                currency: true,
                icon: true,
                userId: true,
                walletId: true,
            },
            orderBy: {
                order: 'asc',
            },
        })
    }

    async getPaymentMethods(user) {
        const paymentCount = await this.prisma.paymentMethod.findMany({
            where: {
                userId: user.id,
                // type: 'CRYPTO',
            },
        })
        switch (true) {
            case paymentCount.length < 1:
                const supportedPayment = await this.prisma.supportedPayment.findMany({
                    where: {
                        visibility: true,
                    },
                    select: {
                        type: true,
                        key: true,
                        currency: true,
                        name: true,
                        icon: true,
                        order: true,
                        changeable: true,
                    },
                    orderBy: {
                        order: 'asc',
                    },
                })
                await this.prisma.paymentMethod.createMany({
                    data: supportedPayment.map((payment) => {
                        let isStatus = false
                        if (payment.type !== 'STRIPE' && user.address) {
                            isStatus = payment.changeable
                        }
                        return {
                            ...payment,
                            userId: user.id,
                            walletId: user.address,
                            status: isStatus,
                        }
                    }),
                    skipDuplicates: true,
                })
                break
            case paymentCount.length > 1:
                const paymentMethod = await this.prisma.paymentMethod.count({
                    where: {
                        userId: user.id,
                        walletId: null,
                    },
                })
                if (!!paymentMethod && user.address) {
                    await Promise.all([
                        this.prisma.paymentMethod.updateMany({
                            where: {
                                userId: user.id,
                                walletId: null,
                                type: PAYMENT_TYPE.CRYPTO,
                                currency: {
                                    not: 'TRVL',
                                },
                            },
                            data: {
                                walletId: user.address,
                                status: true,
                            },
                        }),
                        this.prisma.paymentMethod.updateMany({
                            where: {
                                userId: user.id,
                                walletId: null,
                                OR: [
                                    {
                                        type: PAYMENT_TYPE.FIAT,
                                    },
                                    { currency: 'TRVL' },
                                ],
                            },
                            data: {
                                walletId: user.address,
                            },
                        }),
                    ])
                }
                break
            default:
                const supportedCryptoPayment = await this.prisma.supportedPayment.findMany({
                    where: {
                        visibility: true,
                        type: PAYMENT_TYPE.CRYPTO,
                    },
                    select: {
                        type: true,
                        key: true,
                        currency: true,
                        name: true,
                        icon: true,
                        order: true,
                        changeable: true,
                    },
                    orderBy: {
                        order: 'asc',
                    },
                })
                await this.prisma.paymentMethod.createMany({
                    data: supportedCryptoPayment.map((payment) => {
                        let isStatus = false
                        if (user.address) {
                            isStatus = payment.changeable
                        }
                        return {
                            ...payment,
                            userId: user.id,
                            walletId: user.address,
                            status: isStatus,
                        }
                    }),
                    skipDuplicates: true,
                })
        }
        return await this.prisma.paymentMethod.findMany({
            where: {
                userId: user.id,
                // walletId: user.address ?? undefined,
            },
            orderBy: {
                order: 'asc',
            },
        })
    }

    async togglePaymentMethod(user, data) {
        const paymentMethod = await this.prisma.paymentMethod.findFirst({
            where: {
                id: data.id,
            },
        })
        if (paymentMethod.type === PAYMENT_TYPE.CRYPTO && !user.address) {
            throw new UnprocessableEntityException('Please connect wallet before enable payment with crypto')
        }
        // const paymentCount = await this.prisma.paymentMethod.count({
        //     where: {
        //         userId: user.id,
        //         status: true,
        //         changeable: true,
        //         type: 'CRYPTO',
        //     },
        // })
        //
        // if (paymentCount <= 1 && !data.status) {
        //     throw new UnprocessableEntityException('A least one payment method is enable')
        // }

        return await this.prisma.paymentMethod.updateMany({
            where: {
                key: paymentMethod.key,
                changeable: true,
                OR: [
                    {
                        userId: paymentMethod.userId,
                    },
                    {
                        partnerId: paymentMethod.userId,
                    },
                ],
            },
            data: {
                status: !!data.status,
            },
        })
    }

    createSupportPaymentMethod(paymentMethod) {
        if (Array.isArray(paymentMethod)) {
            return this.prisma.supportedPayment.createMany({
                data: paymentMethod,
                skipDuplicates: true,
            })
        }
        return this.prisma.supportedPayment.create({
            data: paymentMethod,
        })
    }

    supportPaymentMethod() {
        return this.prisma.supportedPayment.findMany({})
    }

    async getPaymentType(userId: string) {
        const paymentTypeAvailable = {
            FIAT: false,
            CRYPTO: false,
        }
        const data = await this.prisma.paymentMethod.groupBy({
            by: ['type'],
            where: {
                userId,
                status: true,
            },
            _count: true,
        })
        data.map((paymentMethod) => {
            if (paymentMethod.type === 'STRIPE') {
                return (paymentTypeAvailable.FIAT = !!paymentMethod._count)
            }
            return (paymentTypeAvailable.CRYPTO = !!paymentMethod._count)
        })
        return paymentTypeAvailable
    }

    async updatePaymentMethod(data) {
        return this.prisma.paymentMethod.updateMany({
            where: {
                key: data.key.toUpperCase(),
                changeable: true,
                OR: [
                    {
                        partnerId: data.userId,
                    },
                    {
                        userId: data.userId,
                    },
                ],
            },
            data: {
                status: !!data.status,
            },
        })
    }

    async setupFeeOptions(user: UserPayload, params: FeeOptionDto): Promise<any> {
        try {
            const { isGuestPayFee } = params
            return this.prisma.stripeFeeOptions.upsert({
                update: { isGuestPayFee },
                create: { userId: user.id, isGuestPayFee },
                where: { userId: user.id },
            })
        } catch (e) {
            throw e
        }
    }

    async getFeeOptions(userId: string): Promise<any> {
        try {
            const feeOptions = await this.prisma.stripeFeeOptions.findFirst({ where: { userId } })
            if (!feeOptions) {
                return this.prisma.stripeFeeOptions.create({ data: { userId, isGuestPayFee: true } })
            }
            return feeOptions
        } catch (e) {
            throw e
        }
    }
}
