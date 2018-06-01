import pluginCall from 'sketch-module-web-view/client'
import React from 'react'
import ReactDOM from 'react-dom'
const _ = require('lodash')

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux'

import history from './history'
import { IndexRedirect, Route } from 'react-router'

import { Redirect } from "react-router-dom"
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import AppContainer from './AppContainer'
import SettingsContainer from './containers/SettingsContainer'
import ItemContainer from './ItemContainer'
import layerReducer from './reducers/LayerReducer'
import ruleReducer from './reducers/RuleReducer'
import { reducer as formReducer } from 'redux-form'
import * as layerActions from './actions/LayerActions';
import * as ruleActions from './actions/RuleActions';

import mockData from './mockData'

import './global.scss';
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
    rules: ruleReducer,
    form: formReducer
  }),
  applyMiddleware(middleware, createLogger())
)
// Disable the context menu to have a more native feel
// document.addEventListener("contextmenu", function(e) {
//   e.preventDefault();
// });

// Disable the context menu to have a more native feel
document.addEventListener("focus", function(e) {
  e.preventDefault();
});

let data = {}
let page = 0
let pages = 1

//// WEB
window.mock = true
ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" component={AppContainer}/>
        <Route exact path="/settings" component={SettingsContainer}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
store.dispatch(layerActions.setLayers(mockData))
// // analytics.identify('jono@toyboxsystems.com');
// let colors = ["#660000", "#990000", "#cc0000", "#cc3333", "#ea4c88", "#993399", "#663399", "#333399", "#0066cc", "#0099cc", "#66cccc", "#77cc33", "#669900", "#336600", "#666600", "#999900", "#cccc33", "#ffff00", "#ffcc33", "#ff9900", "#ff6600", "#cc6633", "#996633", "#663300", "#000000", "#999999", "#cccccc", "#ffffff"]

data = [{ name: 'blue', hex: '#d3d3d3' } ]
store.dispatch(ruleActions.setColors(data))
data = [
  { name: 'h1', fontSize: 14, weight: 400,  lineHeight: 20},
  { name: 'h2', fontSize: 10, weight: 400,  lineHeight: 14},
] //fontFamily syntax is confusing ".SFNSText"
store.dispatch(ruleActions.setType(data))

////SKETCH
// pluginCall("getLocation")
// ReactDOM.render(
//   <Provider store={store}>
//     { /* ConnectedRouter will use the store from Provider automatically */ }
//     <ConnectedRouter history={history}>
//       <div>
//         <Route exact path="/list" component={AppContainer}/>
//         <Route exact path="/settings" component={SettingsContainer}/>
//         <Redirect to={window.redirectTo} />
//       </div>
//     </ConnectedRouter>
//   </Provider>,
//   document.getElementById('root')
// )

window.postData = function (compliantArr) {
  console.log(compliantArr)
  store.dispatch(layerActions.setLayers(JSON.parse(compliantArr)))
}

window.layerSelected = function (compliantArr) {
  store.dispatch(layerActions.selectLayerFromSketch(JSON.parse(compliantArr)))
  window.blur()
}

window.setRules = function (rules) {
  store.dispatch(ruleActions.setColors(JSON.parse(rules)))
}

console.log('loaded')
