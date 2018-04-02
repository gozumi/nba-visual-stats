import { setDailyStatus } from 'client/app/state/action-creators/daily'
import {
  STATUS_AGGREGATION_CHANGE_REQUEST_SENT,
  STATUS_WAITING_FOR_DAILY
} from 'client/app/state/reducers/daily/default-state'
import { IAction } from 'client/app/state/store'
import { CHANGE_AGGREGATION, GET_DAILY } from 'client/web-workers/_message-types'
import DailyWorker = require('worker-loader!web-workers/daily')

import messageHandler from './message-handler'

const dailyWorker: Worker = new DailyWorker()
dailyWorker.onmessage = messageHandler

/**
 *
 * @param action
 */
export function getDailyFromWebWorker (action: IAction) {
  dailyWorker.postMessage({
    type: GET_DAILY
  })

  return setDailyStatus(STATUS_WAITING_FOR_DAILY)
}

/**
 *
 * @param aggregationOrder
 * @param notificationList
 */
export function requestAggregationChangeFromWebWorker (
  aggregationOrder: string[]
) {
  dailyWorker.postMessage({
    payload: { aggregationOrder },
    type: CHANGE_AGGREGATION
  })
  return setDailyStatus(STATUS_AGGREGATION_CHANGE_REQUEST_SENT)
}
