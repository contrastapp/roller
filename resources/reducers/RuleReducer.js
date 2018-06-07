const initialState = {
  colors: [],
  saved: false,
}


const pages = (state = initialState, action) => {
  switch (action.type) {
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
