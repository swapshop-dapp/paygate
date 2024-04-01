import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        try {
            return super.canActivate(context)
        } catch (e) {
            console.log(e)
        }
        console.log(context.switchToHttp().getRequest().user)
    }

    handleRequest(err, user) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw err || new UnauthorizedException()
        }
        return user
    }
}
