import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'

import { updateTime } from 'app/state/action-creators/initialisation'
import { INITIALISE_APPLICATION } from 'app/state/action-types'
import store, { IAction, IState } from 'app/state/store'
import { ActionsObservable, combineEpics, Epic } from 'redux-observable'
import { INITIALISE } from 'web-workers/_message-types'
import DemoWorker = require('worker-loader!web-workers/demo')

const rootEpic: Epic<IAction, IState> = combineEpics(
  initialiseApp
)

export default rootEpic

///////////////////////////////////////////////////////////////////////////////

function initialiseApp (action$: ActionsObservable<IAction>) {
  return action$
    .filter((action) => action.type === INITIALISE_APPLICATION)
    .map(startListening)
}

function startListening (action: IAction) {
  const demoWorker = new DemoWorker()

  demoWorker.postMessage({
    type: INITIALISE
  })

  demoWorker.onmessage = (evt) => {
    const { newTime } = evt.data
    store.dispatch(updateTime(newTime))
  }

  return { type: 'DO_NOTHING' }
}
