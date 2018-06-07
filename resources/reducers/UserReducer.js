const initialState = {
  user: {},
  onboarded: false
}


const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {...state, user: action.data}
    case 'SET_ONBOARDED':
      return {...state, onboarded: action.data}
    default:
      return state;
  }
};

export default user;
