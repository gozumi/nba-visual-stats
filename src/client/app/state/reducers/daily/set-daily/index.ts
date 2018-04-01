import { IAggregation } from 'client/app/components/partition-layout/partition-layout.component'
import { IDaily } from 'server/routes/api/players-daily/_interfaces'

import { IDailyState, STATUS_DAILY_RECEIVED } from '../default-state'

/**
 *
 * @param currentState
 * @param payload
 */
export default function setDaily (
  currentState: IDailyState,
  payload: {aggregations: IAggregation, data: IDaily}
): IDailyState {
  return {
    ...currentState,
    aggregations: payload.aggregations,
    data: payload.data,
    status: STATUS_DAILY_RECEIVED
  }
}
