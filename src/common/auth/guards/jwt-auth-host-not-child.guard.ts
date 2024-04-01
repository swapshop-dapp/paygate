import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthHostNotChildGuard extends AuthGuard('jwt-host-not-child') {}
