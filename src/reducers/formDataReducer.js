const initialState = [];

const formDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FORM_DATA':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default formDataReducer;
