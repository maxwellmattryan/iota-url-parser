import { IotaUnit, ShimmerUnit } from '@src/utils'

export interface ISendOperationParameters {
    amount: number
    unit: IotaUnit | ShimmerUnit
}
