

export function getCountries(data) {
  //Ordenar x primera vez
  function SortArray(x, y){
      return x.name.localeCompare(y.name);
  }
  var dataO = data.sort(SortArray);
    return async function(dispatch) {
      console.log('En action get_countries',data)

      return dispatch({
        type: 'GET_COUNTRIES',
        payload: dataO
      })
    };
  }

  export function getActivities(data) {
    //Ordenar x primera vez

      return async function(dispatch) {
 
        return dispatch({
          type: 'GET_ACTIVITIES',
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

    export function setearOrden(data) {
      return async function(dispatch) {
       console.log('En action filtered', data)
       return dispatch({
         type: 'SET_ORDER',
         payload: data
       })
      };
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

    export function setCountryCheck(data) {
      return async function (dispatch) {
        return dispatch({
          type: 'SET_COUNTRY_CHECK',
          payload: data
        });
      }
    }
    
 // export default getCountries;