import BrowserWindow from 'sketch-module-web-view'
const UI = require('sketch/ui')
const sketch = require('sketch')
const toArray = require('sketch-utils/to-array')
const tinycolor = require('tinycolor2')
const _ = require('lodash')
const momemt = require('moment')

const Papa = require('papaparse');
const emailKey = 'toyboxRollerUser'

const options = {
  identifier: 'unique.id',
  redirectTo: "/list",
  width: 480,
  minWidth: 300,
  height: 960,
  show: false,
  loaded: false,
  alwaysOnTop: true,
}

let browserWindow = new BrowserWindow(options)
let webContents = browserWindow.webContents
let loaded = false
let currentDocumentId = null

export default function onRun(context) {
  // only show the window when the page has loaded
  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
    setRules(context)
    setOnboarded(context)
    setUser(context)
    fetchEndpoint()
  })

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    UI.message('UI loaded!')
  })

  webContents.on('getLocation', (s) => {
          // webUI.eval("window.redirectTo=\"" + String(whereTo) + "\"");
    var whereTo = options.redirectTo;
    webContents.executeJavaScript("window.redirectTo=\"" + String(whereTo) + "\"")
  })

  webContents.on('openFile', () => {
    var openPanel = NSOpenPanel.openPanel()
    openPanel.setCanChooseDirectories(false)
    openPanel.setCanChooseFiles(true)
    openPanel.setCanCreateDirectories(false)
    openPanel.setAllowedFileTypes(['json', 'csv'])
    openPanel.setDirectoryURL(NSURL.fileURLWithPath('~/Documents/'))

    openPanel.setTitle('Choose a file')
    openPanel.setPrompt('Choose')
    openPanel.runModal()

    var file = openPanel.URLs().firstObject()
    var filePath = file.path();
    var fileContents = NSString.stringWithContentsOfFile(filePath);
    if (file.pathExtension() == 'json') {
      var paletteContents = JSON.parse(fileContents);

      var colors = paletteContents.colors
      const keys = _.uniq(_.flatten(_.map(colors, _.keys)))
      if (_.isEqual(keys.sort(),["name","hex"].sort())) {
        context.api().setSettingForKey('colors', JSON.stringify(colors))
      } else {
        postFileError('Please format JSON as { colors: [{name: "White", hex: "#FFFFFF"}]}')
      }
    }
    if (file.pathExtension() == 'csv') {
      var results = Papa.parse(String(fileContents), {header: true});
      validHeaders = _.isEqual(results.meta.fields.sort(),['name','hex'].sort())
      if (validHeaders) {
        context.api().setSettingForKey('colors', JSON.stringify(results.data))
      } else {
        postFileError('Please format CSV with headers: name, hex')
      }
    }
    setRules(context)
  })


  webContents.on('getData', (page) => {
    getData(context, page)
  })

  webContents.on('updateLayer', (id) => {
    updateLayer(id)
  })

  webContents.on('saveRules', (colors) => {
    context.api().setSettingForKey('colors', JSON.stringify(colors))
    setRules(context)
  })

  webContents.on('saveEndpoint', (endpoint) => {
    context.api().setSettingForKey('endpoint', endpoint)
    fetchEndpoint(context)
  })

  webContents.on('onboarded', (flag) => {
    context.api().setSettingForKey('onboarded', JSON.stringify(flag))
    setOnboarded(context)
  })

  webContents.on('importDocumentColors', () => {
    importDocumentColors(context)
  })

  webContents.on('openURL', (url) => {
    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString(url));
  })


  webContents.on('importGlobalColors', () => {
    importGlobalColors(context)
  })

  webContents.on('saveUser', (email) => {
    context.api().setSettingForKey(emailKey, JSON.stringify(email))
    if (email == null){
      context.api().setSettingForKey('onboarded', JSON.stringify(false))
      setOnboarded(context)
    }
    setUser(context)
  })

  webContents.on('setRules', () => {
    setRules(context)
  })

  webContents.on('selectLayer', (id) => {
    selectLayer(id)
  })

  webContents.on('swapProp', (id, prop, oldStyle, newStyle) => {
    let layers = selectLayer(id)

    _.each(layers, (l) => {
      if (prop === 'fills' || prop === 'borders') {
        // let props;

        // if (prop === 'fills') {
        //   props =l.style().fills()
        // }
        // if (prop === 'borders') {
        //   props =l.style().borders()
        // }


        // let respectiveProp = _.find(props, (r) => _.includes(newStyle.hex, String(r.color().immutableModelObject().hexValue())))
// // respectiveProp.setColor(MSImmutableColor.colorWithSVGString(newStyle.hex).newMutableCounterpart());


        sketch.fromNative(l).style[prop] = _.map(sketch.fromNative(l).style[prop], (fillOrBorder) => {
          return fillOrBorder.color === oldStyle ?  {color: '#' +tinycolor(newStyle.hex).setAlpha(tinycolor(fillOrBorder).getAlpha()).toHex8(), thickness: fillOrBorder.thickness, position: fillOrBorder.position, enabled: fillOrBorder.enabled, fillType: fillOrBorder.fillType, gradient: fillOrBorder.gradient} : fillOrBorder
        }

        )
      } else if ( prop === 'text') {
        var range = NSMakeRange(0,sketch.fromNative(l).text.length)
        var alpha = l.style().textStyle().attributes().MSAttributedStringColorAttribute.alpha()
        var color = hexToColor(newStyle.hex, alpha)
        l.setIsEditingText(true)
        l.addAttribute_value_forRange(NSForegroundColorAttributeName, color, range)
        l.setIsEditingText(false)
      }
    });
  })

  webContents.on('loadList', (s) => {
    browserWindow.loadURL(require('../resources/webview.html'))
  })

  browserWindow.loadURL(require('../resources/webview.html'))
}


export function blurAfterSelection(context) {
  browserWindow.blur()
}

export function onSelectionChanged(context) {
  if (browserWindow.isVisible() == 1) {
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

function hexToColor(hex, alpha) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
    red = parseInt(result[1], 16) / 255,
    green = parseInt(result[2], 16) / 255,
    blue = parseInt(result[3], 16) / 255,
    alpha = (typeof alpha !== 'undefined') ? alpha : 1;
  return NSColor.colorWithCalibratedRed_green_blue_alpha(red, green, blue, alpha)
}

function pageLayers(page) {
  let layers;
  if (page.layers) {
    layers = page.layers

    while (_.find(layers, (layer) => layer.type == 'Artboard' || layer.type == 'Group')) {
      layers = _.flattenDeep(_.map(layers, (groupOrLayer) => _.get(groupOrLayer, 'layers', groupOrLayer)))
      console.log(layers.length)
    }
  } else {
    layers = page
  }

  postData(compliance(layers))
}

function getData(context) {
  var document = require('sketch/dom').getSelectedDocument()
  if (_.get(document, 'id') != currentDocumentId) {
    currentDocumentId = document.id
    webContents.executeJavaScript(`resetLayers()`)
  }

  let layers = _.flattenDeep(_.map(document.pages, (page) => {
    return pageLayers(page)
  }))
  // let layers = _.flattenDeep(pageLayers(document.pages[0]))

  // console.log(layers.length)

  // layers = _.chunk(layers, 100)[0]

}

function compliance(layers) {
  layers = _.flattenDeep(layers)

  return (_.flattenDeep(_.compact(_.map(_.reject(layers,'hidden') , (l, i) => {
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

function postFileError(msg) {
  webContents.executeJavaScript(`postFileError('${msg}')`)
}

function postComplianceSelected(compliance) {
  webContents.executeJavaScript(`layerSelected('${JSON.stringify(compliance)}')`)
  browserWindow.blur()
}

function setRules() {
  let colors = context.api().settingForKey('colors')
  try {
    webContents.executeJavaScript(`setRules('${String(String(JSON.stringify(JSON.parse(String(colors)))))}')`)
  } catch (e) {
    console.log(e)
  }
}

function fetchEndpoint() {
  if(context.api().settingForKey('endpoint')) {
    fetch(context.api().settingForKey('endpoint'))
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let colors = _.flatten(_.map(data.list.colors, (colorSection) => {
        return _.map(colorSection.colors, (c) => ({name: c.name, hex: c.value}))
      }))
      context.api().setSettingForKey('colors', JSON.stringify(colors))
      setRules()
    });
  }
}

function setOnboarded(context) {
  let onboarded = context.api().settingForKey('onboarded')
  webContents.executeJavaScript(`setOnboarded('${String(String(JSON.stringify(JSON.parse(String(onboarded)))))}')`)
}

function setUser() {
  let email = context.api().settingForKey(emailKey)
  webContents.executeJavaScript(`setUser('${String(String(JSON.stringify(JSON.parse(String(email)))))}')`)
}

function parseColor(layer) {
  let colors = [];
  try {
    colors = JSON.parse(context.api().settingForKey('colors'))
  } catch (e) {
    colors = []
  }

  colors = _.map(colors, (c) => tinycolor(String(c.hex)).toHex8())

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
        name: escape(layer.name),
        category: category,
        prop: prop,
        createdAt: Date.now(),
        suggestions: []
      }

      if (prop === 'text') {
        let weights = [100,100,100,200,300,400,500,500,600,700,800,900,900,900,900,900]
        let weightIndex = NSFontManager.sharedFontManager().weightOfFont_(layer.sketchObject.font())

        let weight = weights[weightIndex]
        var fontSize = layer.sketchObject.fontSize()
        var lineHeight = layer.sketchObject.lineHeight()

        let fontFamily;
        let color = '000';
        if (layer.sketchObject.style().textStyle()) {
          fontFamily = String(layer.sketchObject.style().textStyle().attributes().NSFont.fontDescriptor().objectForKey(NSFontNameAttribute))
          if (layer.sketchObject.style().textStyle().attributes().MSAttributedStringColorAttribute) {
            color = layer.sketchObject.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue()
          }
        }
        color = `#${tinycolor(`#${color}`).toHex8()}`

        return ([
          {
            ...attrs,
            index: 0,
            styles: {...layer.style, ...{weight: weight, fontSize: fontSize, lineHeight: lineHeight, fontFamily: fontFamily}},
            primary: color,
            compliant: _.includes(colors, tinycolor(color).toHex8()),
          }
        ])
      }

      if (_.get(layer.style, prop)) {
        const styles = _.get(layer.style, prop)

        let i = -1
        return _.map(_.filter(styles, 'enabled'), (style) => {
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

function updateLayer(id) {
  const document = sketch.fromNative(context.document)
  let layers = _.compact(_.flattenDeep(_.map(document.pages, (page) => {
    page = page.sketchObject
    if(page.deselectAllLayers){
      page.deselectAllLayers();
    }else{
      page.changeSelectionBySelectingLayers_([]);
    }
    return page.layersWithIDs([id])
  })))

  layers = _.map(layers, (layer) => _.map(_.flattenDeep(layer), (l) => {l.select_byExpandingSelection(true, true); return sketch.fromNative(l)}));

  layers = _.flatten(layers)

  return postData(compliance(layers))
}

let oldSelection = []
let newSelection = []

function importDocumentColors() {
  var app = NSApp.delegate();
  var documentColors = _.map(context.document.documentData().assets().colors(), (color,i) => {

    var hexValue = tinycolor.fromRatio({r: color.red(), g: color.green(), b: color.blue(), a: color.alpha()}).toHex8()


    return ({name: ('Document Color ' + i), hex: '#' + hexValue})
  })

  var colors = JSON.parse(context.api().settingForKey('colors'))
  var hexs = _.map(colors, 'hex')
  documentColors = _.filter(documentColors, (c) => !_.includes(hexs, c.hex))
  documentColors.push(colors)
  context.api().setSettingForKey('colors', JSON.stringify(_.flatten(documentColors)))
  setRules(context)
}

function importGlobalColors() {
  var app = NSApp.delegate();
  var colors = app.globalAssets().colors();
  var globalColors = _.map(colors, (color,i) => {
    var hexValue = tinycolor.fromRatio({r: color.red(), g: color.green(), b: color.blue(), a: color.alpha()}).toHex8()

    return ({name: ('Global Color ' + i), hex: '#' + hexValue})
  })

  colors = JSON.parse(context.api().settingForKey('colors'))
  var hexs = _.map(colors, 'hex')
  globalColors = _.filter(globalColors, (c) => !_.includes(hexs, c.hex))
  globalColors.push(colors)
  context.api().setSettingForKey('colors', JSON.stringify(_.flatten(globalColors)))
  setRules(context)
}


function selectLayer(id) {
  var document = require('sketch/dom').getSelectedDocument()
  let layers = _.compact(_.flattenDeep(_.map(document.pages, (page) => {
    page = page.sketchObject
    if(page.deselectAllLayers){
      page.deselectAllLayers();
    }else{
      page.changeSelectionBySelectingLayers_([]);
    }
    return page.layersWithIDs([id])
  })))

  layers = _.map(layers, (layer) => _.map(_.flattenDeep(layer), (l) => {l.select_byExpandingSelection(true, true); return l}));

  layers = _.flatten(layers)

  let layer = layers[0]
  let rect = layer.absoluteRect().rect()

  let x = rect.origin.x - 50
  let y = rect.origin.y - 50
  let width = rect.size.width + 100
  let height = rect.size.height + 100
  rect = NSMakeRect(x, y, width, height)

  // MSDocument.currentDocument().contentDrawView().zoomToFitRect(layers[0].absoluteRect().rect())

  let parent = sketch.fromNative(layer).parent
  while (parent.type != 'Page') {
    parent = parent.parent
  }

  document.sketchObject.setCurrentPage(parent.sketchObject)


  MSDocument.currentDocument().contentDrawView().zoomToFitRect(rect)

  return layers
}
