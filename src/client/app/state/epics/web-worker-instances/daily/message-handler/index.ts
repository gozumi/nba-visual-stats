import { setDaily } from 'client/app/state/action-creators/daily'
import store from 'client/app/state/store'
import { SET_DAILY } from 'client/web-workers/_message-types'

export default function messageHandler (evt: MessageEvent) {
  const { daily, type } = evt.data

  const handlerMap: any = {
    [SET_DAILY]: () => store.dispatch(setDaily(daily))
  }

  const handler = handlerMap[type]
  handler && handler()
}
