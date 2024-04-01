import { Controller, Get, Inject, Query, UseGuards, ValidationPipe } from '@nestjs/common'
import CurrencyService from './service'
import { CurrencyConvertForm } from './currency.form'
import { ApiOperation, ApiResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger'
import InternalAuthGuard from '../common/auth/guards/internal-auth.guard'

@Controller('currency')
@ApiTags('Currency')
export default class CurrencyController {
    @Inject()
    private readonly currencyService: CurrencyService

    @Get('/convert')
    @ApiUnprocessableEntityResponse({
        description: 'Currency does not supported',
    })
    @ApiResponse({
        description: 'List amount among with currency converted',
    })
    @ApiOperation({ summary: 'Convert currency' })
    convert(
        @Query(
            new ValidationPipe({
                transform: true,
            }),
        )
        params: CurrencyConvertForm,
    ) {
        return this.currencyService.convert({ base: 'usd', targets: '', ...params })
    }

    @Get('/')
    @ApiUnprocessableEntityResponse({
        description: 'Currency does not supported',
    })
    @ApiResponse({
        description: 'Currency rate',
    })
    @ApiOperation({ summary: 'Convert currency' })
    currency(@Query('currency') currency: string = 'TRVL') {
        return this.currencyService.currency(currency)
    }

    @Get('/convert/internal')
    @UseGuards(InternalAuthGuard)
    @ApiOperation({ summary: 'Convert currency for internal service' })
    convertInternal(
        @Query(
            new ValidationPipe({
                transform: true,
            }),
        )
        params: CurrencyConvertForm,
    ) {
        return this.currencyService.convertAllCurrencySupported({ base: 'usd', targets: '', ...params })
    }

    @Get('/support')
    currencies() {
        return this.currencyService.currencies()
    }

    @Get('/rates')
    @ApiResponse({
        description: 'Currency rate',
    })
    @ApiOperation({ summary: 'Convert currency' })
    rates() {
        return this.currencyService.rate()
    }
}
