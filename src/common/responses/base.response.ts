import { Paging } from './paging'
import { ErrorResponse } from './error.response'

export class BaseResponse {
    public success: boolean
    public data: any
    public error?: ErrorResponse
    public paging?: Paging

    constructor(data = null) {
        this.data = data
        this.success = true
    }

    public static ok(data: any, paging?: Paging): BaseResponse {
        return <BaseResponse>{ success: true, data, paging }
    }
}
