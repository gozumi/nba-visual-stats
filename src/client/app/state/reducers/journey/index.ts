import { IAction } from 'client/app/state/store'
import DEFAULT_STATE, { IJourney } from './default-state'

export default function journeyReducer (
  currentState: IJourney = DEFAULT_STATE,
  action: IAction
) {
  return currentState
}
