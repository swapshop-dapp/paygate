import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdatePaymentMethodForm {
    @IsString()
    key: string
    @IsBoolean()
    status: boolean
    @IsString()
    userId: string
    @IsString()
    @IsOptional()
    type: string
}
