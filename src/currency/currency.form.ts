import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CurrencyTarget {

}

export class CurrencyConvertForm {
    @ApiProperty({ default: 'usd' })
        // @IsString()
    base: string
    @ApiProperty({ default: 111 })
        // @IsNumber()
    value: number
    @ApiProperty({ default: ['trvl'] })
    @IsString()
    targets: string
    @ApiProperty({ default: 'crypto' })
        // @IsString()
    type: string
}
