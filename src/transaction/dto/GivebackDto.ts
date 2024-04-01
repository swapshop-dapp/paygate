import { IsISO8601, IsString } from 'class-validator'

export class GivebackDto {
    @IsString()
    @IsISO8601()
    dateFrom: string
    @IsString()
    @IsISO8601()
    dateTo: string
}
