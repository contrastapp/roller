// import thunk from 'redux-thunk';
// import { SET_PAGES } from '../constants/helloWorldConstants';
// import accountService from '../services/accountService';


export const setLayers = data => ({
  type: 'SET_LAYERS',
  data,
});

export const activeLayer = data => ({
  type: 'SET_ACTIVE_LAYER',
  data,
});

export const setActiveLayerId = id => ({
  type: 'SET_ACTIVE_LAYER_ID',
  id,
});

export const nextPage = () => ({
  type: 'NEXT_PAGE',
});

export const prevPage = () => ({
  type: 'PREV_PAGE',
});



