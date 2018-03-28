import 'rxjs/add/observable/interval'
import 'rxjs/add/operator/timeInterval'

import { Observable } from 'rxjs/Observable'
import { INITIALISE } from 'client/web-workers/_message-types'

const ctx: Worker = self as any

ctx.addEventListener('message', handler)

function handler (evt: MessageEvent) {
  const { type } = evt.data
  const handlerMap: any = {
    [INITIALISE]: () => handleInitialisation()
  }

  const handlerFunction = handlerMap[type]
  handlerFunction && handlerFunction()
}

function handleInitialisation () {
  const subject = Observable
    .interval(1000)
    .timeInterval()

  subject
    .subscribe((n) => {
      ctx.postMessage({ newTime: new Date() })
    })
}
