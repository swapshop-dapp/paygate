import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString } from 'class-validator'

export default class PaymentForm {
}

export class UpdatePaymentMethodStatusForm {
    @ApiProperty()
    @IsString()
    id: string
    @ApiProperty()
    @IsBoolean()
    status: boolean
}

export class PaymentMethodAvailableDto {
    @IsString()
    userId: string
}
