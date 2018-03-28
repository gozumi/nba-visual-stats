import { SET_NOTIFICATIONS } from '../../_message-types'
import { aggregateNotifications } from '../data-mapper'

interface INotifications {
  aggregationOrder: string[],
  list: any
}

/**
 * Returns an aggregations of the give array of notifications, ordered by the given
 * aggregation order.
 * @param ctx The web worker context
 * @param notifications The notifications to be re-aggregated
 */
export function handleChangeAggregation (ctx: Worker, notifications: INotifications) {
  const { list, aggregationOrder } = notifications
  ctx.postMessage({
    aggregations: aggregateNotifications(list, aggregationOrder),
    notifications: list,
    type: SET_NOTIFICATIONS
  })
}
