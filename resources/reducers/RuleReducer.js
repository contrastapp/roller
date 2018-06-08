import tinycolor from "tinycolor2"
const initialState = {
  colors: [],
  saved: false,
}


const pages = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKENS':
      colors = _.flatten(_.map(action.data.list.colors, (colorSection) => {
        return _.map(colorSection.colors, (c) => ({name: c.name, hex: c.value}))
      }))
      return {...state, colors: colors};
    case 'SET_COLORS':
      return {...state, colors: action.data};
    case 'SET_TYPE':
      return {...state, typography: action.data};
    case 'SAVED':
      return {...state, saved: action.data};
    case 'SET_ERROR_MESSAGE':
      return {...state, errorMsg: action.data};
    default:
      return state;
  }
};

export default pages;
