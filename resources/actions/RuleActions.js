// import thunk from 'redux-thunk';
// import { SET_PAGES } from '../constants/helloWorldConstants';
// import accountService from '../services/accountService';


export const setColors = data => ({
  type: 'SET_COLORS',
  data,
});

export const setType = data => ({
  type: 'SET_TYPE',
  data,
});

export const saved = data => ({
  type: 'SAVED',
  data,
});

export const setErrorMessage = data => ({
  type: 'SET_ERROR_MESSAGE',
  data,
});
