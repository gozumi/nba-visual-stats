import { IDailyState, STATUS_AWAITING_AGGREGATION_CHANGE } from '../default-state'

export default function requestAggregation (currentState: IDailyState): IDailyState {
  return {
    ...currentState,
    status: STATUS_AWAITING_AGGREGATION_CHANGE
  }
}
