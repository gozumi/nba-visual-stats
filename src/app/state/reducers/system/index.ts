import { INITIALISE_APPLICATION, UPDATE_TIME } from 'app/state/action-types'
import updateTime from 'app/state/reducers/system/update-time'
import { IAction } from 'app/state/store'
import DEFAULT_STATE, { ISystemState } from './default-state'
import requestInitialisation from './request-initialisation'

export default function systemReducer (
  currentState: ISystemState = DEFAULT_STATE,
  action: IAction
) {
  const { payload } = action
  const reducerMap: any = {
    [INITIALISE_APPLICATION]: () => requestInitialisation(currentState),
    [UPDATE_TIME]: () => updateTime(currentState, payload)
  }

  const reducer = reducerMap[action.type]
  return reducer ? reducer(currentState, payload) : currentState
}
