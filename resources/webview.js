import pluginCall from 'sketch-module-web-view/client'
import React from 'react'
import ReactDOM from 'react-dom'
const _ = require('lodash')

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import history from './history'
import { Route } from 'react-router'

import { Redirect } from "react-router-dom"
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import AppContainer from './AppContainer'
import ItemContainer from './ItemContainer'
import layerReducer from './reducers/LayerReducer'
import * as layerActions from './actions/LayerActions';

// import reducers from './reducers' // Or wherever you keep your reducers

// Create a history of your choosing (we're using a browser history in this case)
// const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    // ...reducers,
  combineReducers({
    router: routerReducer,
    layers: layerReducer,
  }),
  applyMiddleware(middleware)
)
// Disable the context menu to have a more native feel
// document.addEventListener("contextmenu", function(e) {
//   e.preventDefault();
// });

let data = {}
let page = 0
let pages = 1



// pluginCall("getLocation")

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/list" component={AppContainer}/>
        <Route exact path="/item/:id" component={ItemContainer}/>
        <Redirect to={window.redirectTo} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

window.postData = function (compliantArr) {
  store.dispatch(layerActions.setLayers(JSON.parse(compliantArr)))
}

window.layerSelected = function (compliantArr) {
  store.dispatch(layerActions.activeLayer(JSON.parse(compliantArr)))
}
