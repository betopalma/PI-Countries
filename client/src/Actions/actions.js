

export function getCountries(data) {
    return async function(dispatch) {
      console.log('En action get_countries',data)
      return dispatch({
        type: 'GET_COUNTRIES',
        payload: data
      })
    };
  }

 export function getFilteredCountries(data) {
   return async function(dispatch) {
    console.log('En action filtered', data)
    return dispatch({
      type: 'GET_FILTERED_COUNTRIES',
      payload: data
    })
   };
  }

  export function setOffset(data) {
    return async function(dispatch) {
     console.log('En action offset', data)
     return dispatch({
       type: 'SET_OFFSET',
       payload: data
     });
    };
  };

    export function mostrarTodos () {
      return async function (dispatch) {
        return dispatch({
          type: 'SET_TODOS'
        });
      }
    }

    export function getCountriesDetails(data) {
      return async function(dispatch) {
       console.log('En action detail', data)
       return dispatch({
         type: 'GET_COUNTRIES_DETAILS',
         payload: data
       });
      };
    };
    
 // export default getCountries;