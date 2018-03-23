import './app.component.css'

import { initialise } from 'app/state/action-creators/initialisation'
import store from 'app/state/store'
import * as React from 'react'
import { Provider } from 'react-redux'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'

import AppNavigation from 'app/blocks/app-navigation'
import Home from './features/home/home.component'
store.dispatch(initialise())

export default class App extends React.Component<{}, {}> {
  public render () {
    return (
        <Provider store={store}>
          <Router>
            <section className='app'>
              <div className='logo'/>
              <AppNavigation />
                <Switch>
                  <Route exact={true} path='/home' component={Home} />
                  <Redirect to='/home' />
                </Switch>
            </section>
          </Router>
        </Provider>
    )
  }
}
