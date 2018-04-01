import { GET_DAILY, REQUEST_NEW_DAILY_AGGREGATION, SET_DAILY, SET_DAILY_STATUS } from 'client/app/state/action-types'
import { IAction } from 'client/app/state/store'
import { IDaily } from 'server/routes/api/players-daily/_interfaces'

import { IAggregation } from 'client/app/components/partition-layout/partition-layout.component'

export function getDaily () {
  return {
    type: GET_DAILY
  }
}

export function setDailyStatus (newStatus: string) {
  return {
    payload: newStatus,
    type: SET_DAILY_STATUS
  }
}

export function setDaily (data: IDaily) {
  return {
    payload: { data },
    type: SET_DAILY
  }
}

export function requestAggregation (aggregationOrder: string[]): IAction {
  return {
    payload: aggregationOrder,
    type: REQUEST_NEW_DAILY_AGGREGATION
  }
}
