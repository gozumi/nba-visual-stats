import { IAggregation } from 'app/components/partition-layout/partition-layout.component'

export const STATUS_INITIAL = 'STATUS_INITIAL'
export const STATUS_INITIALISING = 'STATUS_INITIALISING'
export const STATUS_WAITING_FOR_WEB_WORKER_INITIALISATION = 'STATUS_WAITING_FOR_WEB_WORKER_INITIALISATION'
export const STATUS_WEB_WORKER_INITIALISED = 'STATUS_WEB_WORKER_INITIALISED'
export const STATUS_WAITING_FOR_NOTIFICATIONS = 'STATUS_WAITING_FOR_NOTIFICATIONS'
export const STATUS_NOTIFICATIONS_RECEIVED = 'STATUS_NOTIFICATIONS_RECEIVED'
export const STATUS_AWAITING_AGGREGATION_CHANGE = 'STATUS_AWAITING_AGGREGATION_CHANGE'
export const STATUS_AGGREGATION_CHANGE_REQUEST_SENT = 'STATUS_AGGREGATION_CHANGE_REQUEST_SENT'

export interface INotificationState {
  status: string,
  selected: number,
  list: INotification[],
  aggregations: IAggregation
}

export interface INotification {
  message: string,
  aggregationPoints: IAggregationPoints
}

export interface IAggregationPoints {
  [pointName: string]: string
}

const DEFAULT_STATE: INotificationState = {
  aggregations: null,
  list: [],
  selected: null,
  status: STATUS_INITIAL
}

export default DEFAULT_STATE
