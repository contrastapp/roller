import pluginCall from 'sketch-module-web-view/client'
const _ = require('lodash')

// Disable the context menu to have a more native feel
// document.addEventListener("contextmenu", function(e) {
//   e.preventDefault();
// });

let data = {}
let page = 0
let pages = 1


document.getElementById('lint').addEventListener('click', function () {
  pluginCall('nativeLog', 'Called from the webview')

})

document.getElementById('details').addEventListener('click', function () {
  pluginCall('loadDetails')
})


document.getElementById('next').addEventListener('click', function () {
  if (page < pages - 1) {
    page = page + 1
  }

  updateAll(listCompliance(true))
})

document.getElementById('prev').addEventListener('click', function () {
  if (page > 0) {
    page = page - 1
  }

  updateAll(listCompliance(true))
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

function listCompliance(paginate) {
  let list = _.map(_.values(data), (layer) => { return layerMetadata(layer)})

  if (paginate) {
    let paginated = _.chunk(list, 25)
    pages = paginated.length
    setPages()
    list = paginated[page]
  }

  return list
}

function storeAndList(compliantArr, paginate = true) {
  // category: "color"
  // compliant: true
  // id: "C4A6A097-CF41-4D90-9594-BE32B3C426F2"
  // primary: "#ca1111ff"
  // prop: "fills"
  // styles: {fill: "Color", color: "#ca1111ff", gradient: Object, enabled: true}
  // suggestions: []
  data = _.merge(data, _.keyBy(JSON.parse(compliantArr), (layer) => [layer.id, layer.prop, layer.index].join('-')))

  if (paginate) {
    page = 0
  }

  return listCompliance(paginate)
}

window.setCompliant = function (compliantArr) {
  const list = storeAndList(compliantArr)
  updateAll(list)
}

function updateAll(list) {
  document.getElementById('page').innerHTML = page + 1
  document.getElementById('compliant').innerHTML = list
}

function setPages() {
  document.getElementById('pages').innerHTML = pages
}

window.setCompliantSelected = function (compliantArr) {
  const list = storeAndList(compliantArr, false)
  document.getElementById('compliant-selected').innerHTML = list
}
