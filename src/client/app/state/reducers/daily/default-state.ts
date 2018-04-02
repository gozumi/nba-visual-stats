import { IAggregation } from 'client/app/components/partition-layout/partition-layout.component'
import { IDaily } from 'server/routes/api/players-daily/_interfaces'

export const STATUS_INITIAL = 'STATUS_INITIAL'
export const STATUS_DAILY_RECEIVED = 'STATUS_DAILY_RECEIVED'
export const STATUS_WAITING_FOR_DAILY = 'STATUS_WAITING_FOR_DAILY'
export const STATUS_AWAITING_AGGREGATION_CHANGE = 'STATUS_AWAITING_AGGREGATION_CHANGE'
export const STATUS_AGGREGATION_CHANGE_REQUEST_SENT = 'STATUS_AGGREGATION_CHANGE_REQUEST_SENT'

export interface IDailyState {
  status: string,
  aggregations: IAggregation,
  data: IDaily
}

export interface IAggregationPoints {
  [pointName: string]: string
}

const DEFAULT_STATE: IDailyState = {
  aggregations: null,
  data: null,
  status: STATUS_INITIAL
}

export default DEFAULT_STATE
