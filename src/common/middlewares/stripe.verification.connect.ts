import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { Stripe } from 'stripe'
import { ConfigService } from '@nestjs/config'
import { Request, Response } from 'express'

@Injectable()
export class StripeVerificationConnect implements NestMiddleware {
    @Inject('STRIPE')
    private readonly stripe: Stripe
    @Inject()
    private readonly config: ConfigService

    use(req: Request, res: Response, next: () => any): any {
        const rawBody = req.body
        const headers = req.headers
        const stripeSign = headers['stripe-signature']
        try {
            req.body = this.stripe.webhooks.constructEvent(rawBody, stripeSign, this.config.get('stripe.webhookSecretConnect'))

        } catch (e) {
            console.log(e);
            throw e
        }
        return next()
    }
}
