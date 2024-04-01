import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import Strategy from 'passport-headerapikey'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
    constructor(private readonly configService: ConfigService) {
        super({ header: 'x-api-key', prefix: '' }, true, async (apiKey, done) => {
            return this.validate(apiKey, done)
        })
    }

    public validate = async (apiKey: string, done) => {
        if (this.configService.get('INTERNAL_API_KEY') === apiKey) {
            done(null, true)
        }
        done(new UnauthorizedException(), null)
    }
}
