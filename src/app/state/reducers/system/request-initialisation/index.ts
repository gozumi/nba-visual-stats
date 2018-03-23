import { ISystemState } from '../default-state'

export default function requestInitialisation (currenState: ISystemState): ISystemState {
  return {
    ...currenState,
    fetching: true
  }
}
