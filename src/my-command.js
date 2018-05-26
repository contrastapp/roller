import BrowserWindow from 'sketch-module-web-view'
const UI = require('sketch/ui')
const sketch = require('sketch')
const toArray = require('sketch-utils/to-array')

  const options = {
    identifier: 'unique.id',
    width: 240,
    height: 180,
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
    UI.message(s)
    webContents.executeJavaScript(`setRandomNumber(${699999})`)
  })

  browserWindow.loadURL(require('../resources/webview.html'))
}

export function onSelectionChanged(context) {
  const action = context.actionContext
  const document = sketch.fromNative(action.document)

  const selection = toArray(action.newSelection)
  const count = selection.length

  if (count === 0) {
  } else {
    // If one or more items are selected, we want to show a message.
    // We check for a single item and handle that as a special case so that we can get the wording correct.

    const message =
      count === 1 ? '1 layer selected' : `${count} layers selected!`

    document.selectedLayers.forEach(layer => {
      if (layer.style.fills.length > 0) {
        const color = layer.style.fills[0].color
        if (color === '#d8d8d8ff') {
          webContents.executeJavaScript(`setRandomNumber('${color}')`)
        } else {
          sketch.UI.alert('INCONSISTENCY!', `${color} is NOT compliant`)
        }
      }
    })

  }
}
