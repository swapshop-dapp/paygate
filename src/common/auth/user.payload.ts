import { Expose } from 'class-transformer'

export default class UserPayload {
    id: string
    email: string
    @Expose({ name: 'first_name' })
    firstName: string
    @Expose({ name: 'last_name' })
    lastName: string
    phone: string
    address: string
    profileId: string
    scopes: string
}
