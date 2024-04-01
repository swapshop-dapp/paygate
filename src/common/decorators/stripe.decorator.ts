import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const StripeEvent = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.stripeEvent
})
