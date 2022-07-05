
  const initialState = {
    paisesLoaded: [],
    paisesAmostrar: [],
    offset:-1,
    checked:0,
  };
  
  function rootReducer(state = initialState, action) {
    if (action.type === "GET_COUNTRIES") {
        return {
          ...state,
          paisesLoaded: action.payload,
          paisesAmostrar: action.payload,
          checked:0
        };
      }
      if (action.type === "GET_ACTIVITIES") {
      return {
        ...state,
        activities: action.payload
      };
    }


     
    if (action.type === "GET_COUNTRIES_DETAILS") {
      return {
        ...state,
        paisesDetail: action.payload,
      };
    } 

    if (action.type === "GET_FILTERED_COUNTRIES") {
      return {
        ...state,
        paisesAmostrar: action.payload,
        offset:0
      };
    }

    if (action.type === "SET_OFFSET") {
      return {
        ...state,
        offset:action.payload
      };
    }

    if (action.type === "SET_TODOS") {
      return {
        ...state,
        offset:0,
        paisesAmostrar: state.paisesLoaded
      };
    }

    if (action.type === "SET_COUNTRY_CHECK") {
      return {
        ...state,
        paisesLoaded: action.payload.data,
        checked: action.payload.checked
      };
    }

    if (action.type === "SET_ORDER") {
      return {
        ...state,
        paisesAmostrar: action.payload
      };
    }
    return state
  }

  export default rootReducer;
  