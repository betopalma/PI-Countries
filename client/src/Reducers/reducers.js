
  const initialState = {
    paisesLoaded: [],
  };
  
  function rootReducer(state = initialState, action) {
    if (action.type === "GET_COUNTRIES") {
        return {
          ...state,
          paisesLoaded: action.payload
        };
     } 
    return state
  }
  export default rootReducer;
  