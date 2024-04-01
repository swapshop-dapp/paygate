import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import JWTStrategy from './jwt.strategy'
import JWTHostStrategy from './jwt-host.strategy'
import JWTAdminStrategy from './jwt-admin.strategy'
import JWTGuestStrategy from './jwt-guest.strategy'
import InternalStrategy from './internal.strategy'
import JwtOptionalStrategy from './jwt-optional.strategy'
import JwtHostNotChildStrategy from './jwt-host-not-child.strategy'
import JwtHostOrReadStrategy from './jwt-host-or-read.strategy'

@Module({
    imports: [PassportModule, ConfigModule],
    controllers: [],
    providers: [
        JWTStrategy,
        JWTHostStrategy,
        JWTAdminStrategy,
        JWTGuestStrategy,
        ConfigService,
        InternalStrategy,
        JwtOptionalStrategy,
        JwtHostNotChildStrategy,
        JwtHostOrReadStrategy,
    ],
    exports: [],
})
export class AuthModule {}
