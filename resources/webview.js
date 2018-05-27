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

function layerMetadata(layer) {
  return (`
    <li>
      <h3><span style="color: ${layer.primary}">${layer.primary}</span> is ${layer.compliant ? '' : 'NOT'} compliant as ${layer.category} ${layer.prop}</h3>
      <a href="#">View</a>
      <div>Category: ${layer.category}</div>
      <div>Value: ${layer.primary}</div>
      <div>Prop: ${layer.prop}</div>
      <div>Compliant: ${layer.compliant}</div>
      <br/>
      <br/>
      <br/>
    </li>
    `)

}

window.setCompliant = function (compliantArr) {
  // category: "color"
  // compliant: true
  // id: "C4A6A097-CF41-4D90-9594-BE32B3C426F2"
  // primary: "#ca1111ff"
  // prop: "fills"
  // styles: {fill: "Color", color: "#ca1111ff", gradient: Object, enabled: true}
  // suggestions: []
  data = _.merge(data, _.keyBy(JSON.parse(compliantArr), (layer) => [layer.id, layer.prop, layer.index].join('-')))

  var list = _.join(_.map(_.values(data), (layer) => { return layerMetadata(layer)}),'')
  document.getElementById('compliant').innerHTML = list
}

