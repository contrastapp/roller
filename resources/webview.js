import pluginCall from 'sketch-module-web-view/client'
const _ = require('lodash')

// Disable the context menu to have a more native feel
// document.addEventListener("contextmenu", function(e) {
//   e.preventDefault();
// });

let data = {}
document.getElementById('button').addEventListener('click', function () {
  pluginCall('nativeLog', 'Called from the webview')
})

window.setCompliant = function (compliantArr) {
  data = _.merge(data, {compliant: JSON.parse(compliantArr)})

  var list = _.join(_.map(data.compliant, (comp) => { return `<li>${JSON.stringify(comp)}</li>` }),'')
  document.getElementById('compliant').innerHTML = list
}

