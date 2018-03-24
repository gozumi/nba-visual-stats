import { setNotificationsStatus } from 'app/state/action-creators/notifications'
import {
  INotification,
  STATUS_AGGREGATION_CHANGE_REQUEST_SENT,
  STATUS_WAITING_FOR_NOTIFICATIONS
} from 'app/state/reducers/notifications/default-state'
import { IAction } from 'app/state/store'
import { CHANGE_AGGREGATION, GET_NOTIFICATIONS, INITIALISE } from 'web-workers/_message-types'
import NotificationsWorker = require('worker-loader!web-workers/notifications')

import messageHandler from './message-handler'

const notificationsWorker: Worker = new NotificationsWorker()
notificationsWorker.onmessage = messageHandler

/**
 *
 * @param action
 */
export function getNotificationsFromWebWorker (action: IAction) {
  notificationsWorker.postMessage({
    type: GET_NOTIFICATIONS
  })

  return setNotificationsStatus(STATUS_WAITING_FOR_NOTIFICATIONS)
}

/**
 *
 * @param aggregationOrder
 * @param notificationList
 */
export function requestAggregationChangeFromWebWorker (
  aggregationOrder: string[],
  list: INotification[]
) {
  notificationsWorker.postMessage({
    payload: { aggregationOrder, list },
    type: CHANGE_AGGREGATION
  })
  return setNotificationsStatus(STATUS_AGGREGATION_CHANGE_REQUEST_SENT)
}
