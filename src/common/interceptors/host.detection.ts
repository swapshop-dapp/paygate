import { CallHandler, ExecutionContext, Inject, NestInterceptor, NotFoundException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { PrismaService } from '../connections/prisma.service'
import { isUUID } from '@nestjs/common/utils/is-uuid'

export class HostStripeDetection implements NestInterceptor {
    @Inject()
    private readonly prisma: PrismaService

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest()
        const groupsData = {
            ...request.params,
            ...request.query,
            ...request.reservation,
            ...request.body,
        }
        const hostAddress = groupsData.hostAddress || groupsData.userId || groupsData.hostId || groupsData.hostWallet
        let condition: Record<any, any> = {
            walletId: hostAddress,
        }
        if (isUUID(hostAddress)) {
            condition = {
                userId: hostAddress,
            }
        }
        const host = await this.prisma.stripeConnect.findFirst({
            where: {
                ...condition,
            },
        })
        if (!host) {
            throw new NotFoundException('Host information not found')
        }
        request.hostInformation = host
        return next.handle()
    }
}
