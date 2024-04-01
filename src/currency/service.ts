import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common'
import { PrismaService } from '../common/connections/prisma.service'
import { HttpService } from '@nestjs/axios'
import Big from 'big.js'
import { ConfigService } from '@nestjs/config'

@Injectable()
export default class CurrencyService {
    @Inject()
    private readonly prisma: PrismaService
    @Inject()
    private readonly request: HttpService
    @Inject()
    private readonly config: ConfigService

    async convert(params) {
        let amount = new Big(params.value)
        let key = params.targets.split(',')
        const base = params.base.toUpperCase()
        key.push(base)
        key.push('usdt6')
        const currencies = await this.prisma.currency.findMany({
            where: {
                visibility: true,
                type: params.type,
                key: {
                    in: key.map((sym) => sym.trim().toUpperCase()),
                },
            },
        })
        return this.convertCurrency(currencies, base, amount)
    }

    async convertAllCurrencySupported(params) {
        let amount = new Big(params.value)
        let key = params.targets.split(',')
        const base = params.base.toUpperCase()
        key.push(base)
        const currencies = await this.prisma.currency.findMany({
            where: {
                visibility: true,
                type: params.type,
            },
        })
        return this.convertCurrency(currencies, base, amount)
    }

    convertCurrency(currencies, base, amount) {
        const currencyBase = currencies.find((currency) => currency.key === base)
        let baseRate = new Big(1)
        if (!currencyBase) {
            throw new UnprocessableEntityException('currency does not support')
        }
        baseRate = amount.mul(currencyBase.rate.toNumber())
        const currenciesConverted = {}
        currencies.map((currency) => {
            currenciesConverted[currency.key] = baseRate.div(currency.rate.toNumber()).toNumber()
        })
        return currenciesConverted
    }

    async currency(currency) {
        const currencyRate = await this.prisma.currency.findFirst({
            where: {
                key: currency.toUpperCase()
            }
        })
        return { ...currencyRate, rate: currencyRate.rate.toNumber() }
    }

    async rate() {
        return await this.prisma.currency.findMany({
            where: {},
            select: {
                name: true,
                key: true,
                symbol: true,
                rate: true,
            }
        })
    }

    async currencies() {
        return this.prisma.currency.findMany({
            where: {
                visibility: true,
                display: true,
            },
            select: {
                name: true,
                key: true,
                symbol: true,
                type: true,
                order: true
            },
            orderBy: {
                order: 'asc',
            }
        })
    }
}
