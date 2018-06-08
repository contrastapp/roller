// import thunk from 'redux-thunk';
import externalDesignSystemService from '../services/externalDesignSystemService';


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

export const setTokens = data => ({
  type: 'SET_TOKENS',
  data,
});

export function fetchRules(endpoint) {
  return dispatch => {
    return (
      externalDesignSystemService
      .fetchTokens(endpoint)
      .then(res => {dispatch(setTokens(res['data']))})
      .catch(res => {})
    );
  }
}
