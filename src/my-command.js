import BrowserWindow from 'sketch-module-web-view'
const UI = require('sketch/ui')
const sketch = require('sketch')
const toArray = require('sketch-utils/to-array')
const tinycolor = require('tinycolor2')
const _ = require('lodash')
const momemt = require('moment')

const options = {
  identifier: 'unique.id',
  redirectTo: "/list",
  width: 240,
  height: 480,
  show: false,
  alwaysOnTop: true,
}
let browserWindow;
let webContents;
let loaded = false

export default function onRun(context) {
  browserWindow = new BrowserWindow(options)
  webContents = browserWindow.webContents
  // only show the window when the page has loaded
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    loaded = true
    UI.message('UI loaded!')
  })

  webContents.on('getLocation', (s) => {
          // webUI.eval("window.redirectTo=\"" + String(whereTo) + "\"");
    var whereTo = options.redirectTo;
    webContents.executeJavaScript("window.redirectTo=\"" + String(whereTo) + "\"")
  })

  // add a handler for a call from web content's javascript
  webContents.on('nativeLog', (s) => {
    UI.message('Lint')
    parseDocument(context)
    // webContents.executeJavaScript(`setRandomNumber(${699999})`)
  })

  webContents.on('getData', (s) => {
    getData(context)
  })

  webContents.on('selectLayer', (id) => {
    const page = context.document.currentPage()
    if(page.deselectAllLayers){
      page.deselectAllLayers();
    }else{
      page.changeSelectionBySelectingLayers_([]);
    }
    page.layersWithIDs([id])[0].select_byExpandingSelection(true, true);
  })

  webContents.on('loadDetails', (s) => {
    browserWindow.loadURL(require('../resources/details.html'))
  })

  webContents.on('loadList', (s) => {
    browserWindow.loadURL(require('../resources/webview.html'))
  })

  browserWindow.loadURL(require('../resources/webview.html'))
}

function pageLayers(page) {
  if (page.layers) {
    let layers = page.layers

    while (_.find(layers, (layer) => layer.type == 'Artboard' || layer.type == 'Group')) {
      layers = _.flattenDeep(_.map(layers, (groupOrLayer) => _.get(groupOrLayer, 'layers', groupOrLayer)))
    }

    return layers
  }

  return page
}

function getData(context) {
  const document = sketch.fromNative(context.document)

  // let layers = _.flattenDeep(_.map(document.pages, (page) => pageLayers(page)))
  let layers = _.flattenDeep(pageLayers(document.pages[0]))

  console.log(layers.length)

  layers = _.chunk(layers, 100)[0]

  postData(compliance(layers))
}

function parseDocument(context) {
  const document = sketch.fromNative(context.document)

  let layers = _.flattenDeep(_.map(document.pages, (page) => pageLayers(page)))

  console.log(layers.length)

  layers = _.chunk(layers, 100)[0]

  postCompliance(compliance(layers))
}

function compliance(layers) {
  layers = _.flattenDeep(layers)

  return (_.flattenDeep(_.compact(_.map(layers, (l, i) => {
    return parseColor(l)
  }))))
}
function postCompliance(compliance) {
  webContents.executeJavaScript(`setCompliant('${JSON.stringify(compliance)}')`)
}

function postCompliance(compliance) {
  webContents.executeJavaScript(`setCompliant('${JSON.stringify(compliance)}')`)
}

function postData(compliance) {
  webContents.executeJavaScript(`postData('${JSON.stringify(compliance)}')`)
}

function postComplianceSelected(compliance) {
  webContents.executeJavaScript(`layerSelected('${JSON.stringify(compliance)}')`)
}

function parseColor(layer) {
  let colors = context.api().settingForKey('colors')
  colors = _.map(colors, (c) => tinycolor(String(c)).toHex8())

  let props = ['fills', 'borders']

  if (layer.type === 'Text') {
    props.push('text')
  }


  const category = 'color'

  let parsed = []

  parsed =  (_.compact(_.map(props, (prop) => {
    if (_.get(layer, 'style')) {
      let attrs = {
        id: layer.id,
        name: layer.name,
        category: category,
        prop: prop,
        createdAt: Date.now(),
        suggestions: []
      }

      if (prop === 'text') {
        let color = layer.sketchObject.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue()
        color = `#${color}`

        return ([{
          ...attrs,
          index: 0,
          styles: layer.style.toJSON(),
          primary: color,
          compliant: _.includes(colors, tinycolor(color).toHex8()),
        }])
      }

      if (_.get(layer.style, prop)) {
        const styles = _.get(layer.style, prop)

        let i = -1
        return _.map(styles, (style) => {
          const color = style.color
          i = i + 1
          return ({
            ...attrs,
            index: i,
            styles: style.toJSON(),
            primary: color,
            compliant: _.includes(colors, tinycolor(color).toHex8()),
          })
        })
      }




    } else {
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


let oldSelection = []
let newSelection = []

export function onSelectionChanged(context) {
  if (loaded) {
    const action = context.actionContext
    const document = sketch.fromNative(action.document)

    const selection = toArray(action.newSelection)

    const count = selection.length
    if (count <= 1) {
      oldSelection = newSelection
      newSelection = document.selectedLayers

      _.map([oldSelection, newSelection], (s) => {
        let layers = s.map(layer => {
          return pageLayers(layer)
        })

        postComplianceSelected(compliance(layers))
      })
    }
  }
}
