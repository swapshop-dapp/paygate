import { Expose } from 'class-transformer'

export default class UserPayload {
    id: string
    @Expose({ name: 'profile_id' })
    profileId: string
    scope: UserScope[]
}

enum UserScope {
    admin = 'admin',
    host = 'host',
    guest = 'guest',
}
