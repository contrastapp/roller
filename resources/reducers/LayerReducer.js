const initialState = {
  layers: {},
  layerMap: {},
  activeLayer: null,
  page: 0,
}

function setLayers(state, action) {
  let layers = _.groupBy(action.data, 'primary')
  let layerMap = _.groupBy(action.data, 'id')
  textGroups = _.groupBy(_.filter(action.data, {prop: 'text'}), (l) => _.join(_.map(_.keys(l.styles), (k) => l.styles[k]), '-'))
  // _.each(textGroups, (arr, s) => _.each(arr, (l) => l.category = 'text'))


  let trendByColor = {}
  _.each(layers, (layers, hex) => {
    trendByColor[hex] = _.groupBy(layers, 'prop')
  })

  var trendByProp  = _.groupBy(action.data, 'prop')
  trendByProp = _.each(_.groupBy(action.data, 'prop'), (layers, prop) => trendByProp[prop] = _.groupBy(layers, 'primary'))

  return {...state, trendByProp: trendByProp, trendByColor: trendByColor, layers: {...state.layers, ...layers}, layerMap: {...state.layerMap, ...layerMap}};
}

function setActiveLayer(state, action) {
  state = setLayers(state, action)
  return {...state, activeLayer: action.data[0]}
}

const pages = (state = initialState, action) => {
  let layers;
  let layerMap;
  let textGroups;
  switch (action.type) {
    case 'SET_LAYERS':
      return setLayers(state, action)
    case 'SET_ACTIVE_LAYER':
      return setActiveLayer(state, action)
    case 'SET_ACTIVE_LAYER_SKETCH':
      return setActiveLayer({...state, selected: true}, action)
    case 'SET_ACTIVE_LAYER_ID':
      return {...state, selected: false, activeLayer: action.data};
    case 'NEXT_PAGE':
      return {...state, page: state.page + 1};
    case 'PREV_PAGE':
      return {...state, page: state.page - 1};
    default:
      return state;
  }
};

export default pages;
