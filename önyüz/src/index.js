import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Store from './Store';
import { BrowserRouter , Route, Switch} from "react-router-dom";
import Giris from './Giris'
import Kayit from './Kayit'

/*
const [ girisYapildi, setgirisYapildi] = useContext(girisContext)

function SecuredRoute(props){
  return(
    <Route path={props.path} render = {data => girisYapildi?(
      <props.component {...data}></props.component>):
     (<Redirect to={{pathname:'/'}}></Redirect>)}></Route>

  )
}
*/

ReactDOM.render(
  <React.StrictMode>
    <Store>
    <BrowserRouter>
              <Switch>
            <Route path="/" exact strict component={() => <Giris/>}/>
            <Route path="/kayit" exact strict component={() => <Kayit/>}/>
            <Route path="/app" exact strict component={() => <App/>}/>
                  <App/>
                </Switch>
          </BrowserRouter>
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
