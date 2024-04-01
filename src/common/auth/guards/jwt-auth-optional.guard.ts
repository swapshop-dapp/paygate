import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthOptionalGuard extends AuthGuard('jwt-optional') {
    handleRequest(err, user, info, context, status) {
        if (err) return undefined
        return user
    }
}
