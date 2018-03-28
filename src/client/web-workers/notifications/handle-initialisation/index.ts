import { DOM } from 'rx-dom'
import { INITIALISATION_COMPLETE } from 'client/web-workers/_message-types'
import { setFromRemote } from '../_config'

export function handleInitialisation (ctx: Worker) {
  DOM.ajax({
    responseType: 'json',
    url: 'app.config.json'
  })
  .subscribe(
      (data) => {
        setFromRemote(data.response)
        ctx.postMessage({ type: INITIALISATION_COMPLETE })
      }
    )

}
