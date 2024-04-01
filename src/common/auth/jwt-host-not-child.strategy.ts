import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { plainToClass } from 'class-transformer'

import UserPayload from './user.payload'

@Injectable()
export default class JwtHostNotChildStrategy extends PassportStrategy(Strategy, 'jwt-host-not-child') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    validate(userPayload: Record<string, any>): UserPayload {
        if (userPayload.partnerId)
            throw new ForbiddenException({
                statusCode: 403,
                error: 'CHILD_HOST_FORBIDDEN',
                message: 'Your account(sub-host) does not allow to do this action.',
            })
        const scopes = userPayload.scopes
        if (scopes && Array.isArray(scopes) && scopes.includes('host')) return plainToClass(UserPayload, userPayload)
        throw new UnauthorizedException()
    }
}
