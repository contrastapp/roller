const initialState = {
  colors: [],
}


const pages = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COLORS':
      return {...state, colors: action.data};
    default:
      return state;
  }
};

export default pages;
