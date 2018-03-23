import { setNotifications } from 'app/state/action-creators/notifications'
import store from 'app/state/store'
import { INITIALISATION_COMPLETE, SET_NOTIFICATIONS } from 'web-workers/_message-types'

export default function messageHandler (evt: MessageEvent) {
  const { aggregations, notifications, type } = evt.data

  const handlerMap: any = {
    [SET_NOTIFICATIONS]: () => store.dispatch(setNotifications(notifications, aggregations))
  }

  const handler = handlerMap[type]
  handler && handler()
}
