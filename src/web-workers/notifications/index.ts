import 'rxjs/add/observable/interval'
import 'rxjs/add/operator/timeInterval'

import { CHANGE_AGGREGATION, GET_NOTIFICATIONS, INITIALISE } from 'web-workers/_message-types'

import { handleChangeAggregation } from './handle-change-aggregation'
import { handleGetNotifications } from './handle-get-notifiactions'
import { handleInitialisation } from './handle-initialisation'

const ctx: Worker = self as any

ctx.addEventListener('message', handler)

/**
 * Works out the typ of message that has been received and routes the
 * event contents to the correct event handler.s
 * @param evt The event to be handled
 */
function handler (evt: MessageEvent) {
  const { payload, type } = evt.data
  const handlerMap: any = {
    [INITIALISE]: () => handleInitialisation(ctx),
    [GET_NOTIFICATIONS]: () => handleGetNotifications(ctx),
    [CHANGE_AGGREGATION]: () => handleChangeAggregation(ctx, payload)
  }

  const handlerFunction = handlerMap[type]
  handlerFunction && handlerFunction()
}
