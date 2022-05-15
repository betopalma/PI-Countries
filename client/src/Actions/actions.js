
export function getCountries() {
    return function(dispatch) {
      console.log('En action')
      fetch(`http://localhost:3001/countries`)
      .then(response => response.json())
      .then(json => {
        return dispatch({
          type: 'GET_COUNTRIES',
          payload: json
        })
      });
    };
  }

  export default getCountries;