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
    UI.message('Lint')
    parseLayers(context)
    // webContents.executeJavaScript(`setRandomNumber(${699999})`)
  })

  browserWindow.loadURL(require('../resources/webview.html'))
}

function pageLayers(page) {
  let layers = page.layers

  while (_.find(layers, (layer) => layer.type == 'Artboard' || layer.type == 'Group')) {
    layers = _.flattenDeep(_.map(layers, (groupOrLayer) => _.get(groupOrLayer, 'layers', groupOrLayer)))
  }

  return layers
}

function parseLayers(context) {
  const document = sketch.fromNative(context.document)

  let layers = _.flattenDeep(_.map(document.pages, (page) => pageLayers(page)))

  console.log(layers.length)

  layers = _.chunk(layers, 100)[0]

  const compliance = _.flattenDeep(_.compact(_.map(layers, (l, i) => {
    console.log(i);
    return parseColor(l)
  })))
  webContents.executeJavaScript(`setCompliant('${JSON.stringify(compliance)}')`)
}



function parseColor(layer) {
  let colors = context.api().settingForKey('colors')
  colors = _.map(colors, (c) => tinycolor(String(c)).toHex8())

  const props = ['fills', 'borders']


  // const cssString = layer.sketchObject.CSSAttributeString()

  // const  layerColors = _.pick(layer.style, styles) // fills[0].color = #000;

  // const compliance = _.groupBy(layerColors, (style) => _.includes(colors, tinycolor(style.color).toHex8()))

  const category = 'color'

  const parsed =  (_.compact(_.map(props, (prop) => {
    if (_.get(layer, 'style')) {
      if (_.get(layer.style, prop)) {
        const styles = _.get(layer.style, prop)

        return _.map(styles, (style, i) => {
          const color = style.color
          return ({
            id: layer.id,
            index: i,
            primary: color,
            compliant: _.includes(colors, tinycolor(color).toHex8()),
            styles: style.toJSON(),
            category: category,
            prop: prop,
            suggestions: []
          })
        })
      }
    } else {
      debugger
      return null
    }
  }))
  )

  return parsed

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
    const layers = document.selectedLayers.map(layer => {
      parseColor(layer)
    })

    const compliance = _.flattenDeep(layers)
    webContents.executeJavaScript(`setCompliant('${JSON.stringify(compliance)}')`)
  }
}
