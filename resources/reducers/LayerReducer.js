const initialState = {
  layers: {},
  activeLayerId: null,
  page: 0,
}


const pages = (state = initialState, action) => {
  let layers;
  switch (action.type) {
    case 'SET_LAYERS':
      layers = _.groupBy(action.data, 'id')
      return {...state, layers: layers};
    case 'SET_ACTIVE_LAYER':
      layers = _.groupBy(action.data, 'id')
      return {...state, activeLayerId: _.keys(layers)[0], layers: {...state.layers, ...layers}};
    case 'SET_ACTIVE_LAYER_ID':
      return {...state, activeLayerId: action.id};
    case 'NEXT_PAGE':
      return {...state, page: state.page + 1};
    case 'PREV_PAGE':
      return {...state, page: state.page - 1};
    default:
      return state;
  }
};

export default pages;
