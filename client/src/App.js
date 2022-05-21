import {Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import "./Components/NavBar.js"
import NavBar from './Components/NavBar.js';
import Panel from './Components/Panel.js';
import Paises from './Components/Paises.js'
import Bienvenida from './Components/Bienvenida.js'
import Detail from './Components/PaisDetalle.js';
import FormularioAct from './Components/Actividades.js'


function App() {

  return (
    <div className='App'>
      <head>

      </head>
      <body>
      <div>
          <Switch> 
            <Route exact path='/'>
              <Bienvenida />
            </Route>
            <Route exact path='/home'>
              <NavBar/>
              <Panel/>
              <Paises/>
            </Route>
            <Route exact path='/detallepais'>
              <NavBar/>
              <Detail/>
            </Route>  
            <Route exact path='/activity'>
              <NavBar/>
              <FormularioAct/>
            </Route>  
            {/* <Route path='*'>
              <h1>Error 404</h1>
            </Route> */}
          </Switch>
        </div>
      </body>
    </div>

  )
}

export default App;
