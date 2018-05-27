import BrowserWindow from 'sketch-module-web-view'
const UI = require('sketch/ui')
const sketch = require('sketch')
const toArray = require('sketch-utils/to-array')
const tinycolor = require('tinycolor2')
const _ = require('lodash')

  const options = {
    identifier: 'unique.id',
    width: 240,
    height: 480,
    show: false,
    alwaysOnTop: true,
  }

var browserWindow = new BrowserWindow(options)
const webContents = browserWindow.webContents

export default function onRun(context) {
  const options = {
    identifier: 'unique.id',
    width: 240,
    height: 180,
    show: false,
    alwaysOnTop: true,
  }

  // only show the window when the page has loaded
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    UI.message('UI loaded!')
  })

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', (s) => {
    UI.message('Lint Placeholder')
    // webContents.executeJavaScript(`setRandomNumber(${699999})`)
  })

  browserWindow.loadURL(require('../resources/webview.html'))
}



function parseColor(layer) {
  let colors = context.api().settingForKey('colors')
  colors = _.map(colors, (c) => tinycolor(String(c)).toHex8())

  const styles = ['fills', 'borders']


  const cssString = layer.sketchObject.CSSAttributeString()
  debugger
  const jsonCss = JsonCSS.toJSON(cssString)

  const  layerColors = _.pick(layer.style, styles) // fills[0].color = #000;

  const compliance = _.groupBy(layerColors, (style) => _.includes(colors, tinycolor(style.color).toHex8()))
  webContents.executeJavaScript(`setCompliant('${JSON.stringify(compliance[false])}')`)
  // webContents.executeJavaScript(`setCompliant('${'color'}')`)
  // webContents.executeJavaScript(`setRandomNumber('${'color'}')`)


  // let color = layer.style.fills[0].color
  // if (_.includes(_.map(colors, (c) => tinycolor(String(c)).toHex8()), tinycolor(color).toHex8())) {
  //   color = `${color} is compliant!`
  //   webContents.executeJavaScript(`setRandomNumber('${color}')`)
  // } else {
  //   color = `${color} is NOT compliant!`
  //   webContents.executeJavaScript(`setRandomNumber('${color}')`)
  //   }
}

export function onSelectionChanged(context) {
  const action = context.actionContext
  const document = sketch.fromNative(action.document)

  const selection = toArray(action.newSelection)
  const count = selection.length

  if (count === 1) {
    document.selectedLayers.forEach(layer => {
      parseColor(layer)
    })
  }
}
