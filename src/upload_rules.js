const sketch = require('sketch')
const _ = require('lodash')

var palette = [];

export default function onRun(context) {
  var openPanel = NSOpenPanel.openPanel()
  openPanel.setCanChooseDirectories(false)
  openPanel.setCanChooseFiles(true)
  openPanel.setCanCreateDirectories(false)
  openPanel.setDirectoryURL(NSURL.fileURLWithPath('~/Documents/'))

  openPanel.setTitle('Choose a file')
  openPanel.setPrompt('Choose')
  openPanel.runModal()

  var filePath = openPanel.URLs().firstObject().path();
  var fileContents = NSString.stringWithContentsOfFile(filePath);
  var paletteContents = JSON.parse(fileContents);

  // context.api().setSettingForKey('colors', [1,2,3])
  // console.log(context.api().settingForKey('colors'))
  context.api().setSettingForKey('colors', _.map(paletteContents.colors, 'value'))
  const colors = context.api().settingForKey('colors')
  console.log("colors upload")
  console.log(colors)

  // for(var x in paletteContents.colors){
  // }

}

