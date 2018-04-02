import { IDailyState } from '../default-state'

export default function setStatus (
  currenState: IDailyState,
  newStatus: string
): IDailyState {
  return {
    ...currenState,
    status: newStatus
  }
}
