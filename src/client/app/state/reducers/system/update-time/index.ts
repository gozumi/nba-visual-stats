import { ISystemState } from '../default-state'

export default function updateTime (currenState: ISystemState, payload: any): ISystemState {
  return {
    ...currenState,
    time : payload
  }
}
