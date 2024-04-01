import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'

import UserPayload from './user.payload'

@Injectable()
export default class JwtOptionalStrategy extends PassportStrategy(Strategy, 'jwt-optional') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    validate(userPayload: Record<string, any>): UserPayload {
        return plainToInstance(UserPayload, userPayload)
    }
}
