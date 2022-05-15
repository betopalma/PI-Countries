import {Route, Switch, Fragment} from 'react-router-dom';
import './App.css';
import "./Components/NavBar.js"
import NavBar from './Components/NavBar.js';
import Panel from './Components/Panel.js';
import Paises from './Components/Paises.js'
import Bienvenida from './Components/Bienvenida.js'


function App() {
  return (
    <div className='App'>
      <head>

      </head>
      <body>
      <div>
          <Route path='/'>
            <NavBar />
          </Route>
          <Switch> 
            <Route exact path='/'>
              <Bienvenida />
            </Route>
            <Route exact path='/home'>
              <Panel />
              <Paises />
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
