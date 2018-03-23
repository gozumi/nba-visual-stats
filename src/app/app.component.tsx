import './app.component.css'

import { initialise } from 'app/state/action-creators/initialisation'
import store from 'app/state/store'
import * as React from 'react'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'

import Home from './features/home/home.component'

store.dispatch(initialise())

export default class App extends React.Component<{}, {}> {
  public render () {
    return (
        <Provider store={store}>
          <Router>
            <Home />
          </Router>
        </Provider>
    )
  }
}
