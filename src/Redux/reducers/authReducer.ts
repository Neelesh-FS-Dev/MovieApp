const initialState = {
  isAuthenticated: false,
  userData: {}, // Make sure userData is initialized
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHENTICATE_USER':
      return {
        ...state,
        isAuthenticated: true,
        userData: action.payload, // Set userData from action payload
      };
    // ...
    default:
      return state;
  }
};

export default authReducer;
