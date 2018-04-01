import { SET_DAILY, SET_DAILY_STATUS } from 'client/app/state/action-types'
import { IAction } from 'client/app/state/store'

import DEFAULT_STATE, { IDailyState } from './default-state'
import setDaily from './set-daily'
import setStatus from './set-status'

export default function systemReducer (
  currentState: IDailyState = DEFAULT_STATE,
  action: IAction
) {
  const { payload } = action
  const reducerMap: any = {
    [SET_DAILY]: () => setDaily(currentState, payload),
    [SET_DAILY_STATUS]: () => setStatus(currentState, payload)
  }

  const reducer = reducerMap[action.type]
  return reducer ? reducer(currentState, payload) : currentState
}
