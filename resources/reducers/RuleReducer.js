const initialState = {
  colors: [],
}


const pages = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COLORS':
      return {...state, colors: action.data};
    case 'SET_TYPE':
      return {...state, typography: action.data};
    default:
      return state;
  }
};

export default pages;
