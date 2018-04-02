import { GET_DAILY } from '../_message-types'
import { handleGetDaily } from './handle-get-daily'

const ctx: Worker = self as any

ctx.addEventListener('message', handler)

function handler (evt: MessageEvent) {
  const { payload, type } = evt.data
  const handlerMap: any = {
    [GET_DAILY]: () => handleGetDaily(ctx)
  }

  const handlerFunction = handlerMap[type]
  handlerFunction && handlerFunction()
}
