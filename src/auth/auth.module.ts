import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import JWTStrategy from './jwt.strategy'
import { ApiKeyStrategy } from './api-key.strategy'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [PassportModule, ConfigModule],
    providers: [JWTStrategy, ApiKeyStrategy],
    controllers: [],
})
export default class AuthModule {}
