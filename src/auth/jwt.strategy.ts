import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import UserPayload from './user.payload'

@Injectable()
export default class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('jwtKey'),
            // algorithms: ['RS256'],
        })
    }

    validate(userPayload: Record<string, any>): UserPayload {
        console.log(userPayload)
        return <UserPayload>userPayload
    }
}
