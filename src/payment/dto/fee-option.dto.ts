import { IsBoolean, IsDefined } from 'class-validator'

export class FeeOptionDto {
    @IsDefined()
    @IsBoolean()
    isGuestPayFee: boolean
}
