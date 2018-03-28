import {
  CLEAR_CURRENT_NOTIFICATION,
  REQUEST_NEW_NOTIFICATION_AGGREGATION,
  SET_CURRENT_NOTIFICATION,
  SET_NOTIFICATIONS,
  SET_NOTIFICATIONS_STATUS
} from 'client/app/state/action-types'
import { INotification } from 'client/app/state/reducers/notifications/default-state'
import { IAction } from 'client/app/state/store'

import { IAggregation } from '../../../components/partition-layout/partition-layout.component'

export function setCurrentNotification (id: number): IAction {
  return {
    payload: id,
    type: SET_CURRENT_NOTIFICATION
  }
}

export function clearCurrentNotification (): IAction {
  return {
    type: CLEAR_CURRENT_NOTIFICATION
  }
}

export function setNotificationsStatus (newStatus: string) {
  return {
    payload: newStatus,
    type: SET_NOTIFICATIONS_STATUS
  }
}

export function setNotifications (notifications: INotification[], aggregations: IAggregation) {
  return {
    payload: { aggregations, notifications },
    type: SET_NOTIFICATIONS
  }
}

export function requestAggregation (aggregationOrder: string[]): IAction {
  return {
    payload: aggregationOrder,
    type: REQUEST_NEW_NOTIFICATION_AGGREGATION
  }
}
