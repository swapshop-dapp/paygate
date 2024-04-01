import { Body, Controller, Get, Inject, Param, Post, Query, UseGuards } from '@nestjs/common'
import PaymentService from './payment.service'
import { AuthUser } from '../common/decorators/auth-user'
import { UpdatePaymentMethodStatusForm } from './payment.form'
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiUnprocessableEntityResponse,
} from '@nestjs/swagger'
import { UpdatePaymentMethodForm } from './dto/update-payment-method.form'
import InternalAuthGuard from '../common/auth/guards/internal-auth.guard'
import UserPayload from '../common/auth/user.payload'
import { FeeOptionDto } from './dto/fee-option.dto'
import { JwtAuthHostGuard } from '../common/auth/guards/jwt-auth-host.guard'
import { JwtHostOrReadGuard } from '../common/auth/guards/jwt-host-or-read.guard'

@Controller('payment')
@ApiTags('Payment')
export default class PaymentController {
    @Inject()
    private readonly paymentService: PaymentService

    @Get('/method/booking')
    @ApiResponse({
        status: 200,
        description: 'List payment method available for booking',
    })
    @ApiOperation({ summary: 'Get payment method available of host for booking' })
    async method(@Query('hostAddress') hostAddress: string) {
        return await this.paymentService.getPaymentMethodActiveByHostId(hostAddress)
    }

    @Get('/method/host')
    @UseGuards(JwtHostOrReadGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all payment method of' })
    async paymentMethods(@AuthUser() user) {
        return await this.paymentService.getPaymentMethods(user)
    }

    @Post('/method')
    @UseGuards(JwtAuthHostGuard)
    @ApiUnprocessableEntityResponse()
    @ApiOkResponse()
    @ApiOperation({ summary: 'On/Off payment method' })
    async togglePaymentMethod(@AuthUser() user, @Body() body: UpdatePaymentMethodStatusForm) {
        return await this.paymentService.togglePaymentMethod(user, body)
    }

    @Post('/support')
    @UseGuards(InternalAuthGuard)
    async support(@Body() paymentMethod) {
        return this.paymentService.createSupportPaymentMethod(paymentMethod)
    }

    @Get('/support')
    async supported() {
        return this.paymentService.supportPaymentMethod()
    }

    @Get('/internal/methods/:userId')
    @UseGuards(InternalAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all payment method of' })
    async getPaymentType(@Param('userId') userId: string) {
        return await this.paymentService.getPaymentType(userId)
    }

    @Post('/internal')
    @UseGuards(InternalAuthGuard)
    async updatePaymentMethodForPartner(@Body() data: UpdatePaymentMethodForm) {
        const dataRes = await this.paymentService.updatePaymentMethod(data)
        return {
            totalHostUpdated: dataRes.count,
        }
    }

    @Post('/fee-options')
    @UseGuards(JwtAuthHostGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Setup fee options' })
    async setupFeeOptions(@AuthUser() user: UserPayload, @Body() params: FeeOptionDto): Promise<any> {
        return this.paymentService.setupFeeOptions(user, params)
    }

    @Get('/fee-options')
    @UseGuards(JwtHostOrReadGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get fee options' })
    async getFeeOptions(@AuthUser() user: UserPayload): Promise<any> {
        return this.paymentService.getFeeOptions(user.id)
    }

    @Get('/internal/fee-options/:userId')
    @UseGuards(InternalAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get fee options' })
    async getFeePaymentOptions(@Param('userId') userId: string): Promise<any> {
        return this.paymentService.getFeeOptions(userId)
    }
}
