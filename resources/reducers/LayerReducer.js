const initialState = {
  layers: {},
  layerMap: {},
  activeLayer: null,
  page: 0,
}


const pages = (state = initialState, action) => {
  let layers;
  let layerMap;
  switch (action.type) {
    case 'SET_LAYERS':
      layers = _.groupBy(action.data, 'primary')
      return {...state, layers: layers, layerMap: _.groupBy(action.data, 'id')};
    case 'SET_ACTIVE_LAYER':
      layers = _.groupBy(action.data, 'primary')
      layerMap = _.groupBy(action.data, 'id')
      return {...state, activeLayer: action.data[0], layers: {...state.layers, ...layers}, layerMap: {...state.layerMap, ...layerMap}};
    case 'SET_ACTIVE_LAYER_ID':
      return {...state, activeLayer: action.data};
    case 'NEXT_PAGE':
      return {...state, page: state.page + 1};
    case 'PREV_PAGE':
      return {...state, page: state.page - 1};
    default:
      return state;
  }
};

export default pages;
