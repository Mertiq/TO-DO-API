import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Store from './Store';
import { BrowserRouter , Route, Switch} from "react-router-dom";
import Giris from './Giris'
import Kayit from './Kayit'
import Gorevler from './superamir/Gorevler';
import Gorevver from './superamir/GorevVer';
import Kullanicilar from './superamir/Kullanicilar';
import kGorevler from './calisan/Gorevler';
import kKullanicilar from './calisan/Kullanicilar';
import aGorevler from './amir/Gorevler';
import aGorevver from './amir/GorevVer';
import aKullanicilar from './amir/Kullanicilar';

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
            <Route path="/superamir/gorevler" exact strict component={ Gorevler }/>
            <Route path="/superamir/gorevver" exact strict component={Gorevver}/>
            <Route path="/superamir/kullanicilar" exact strict component={Kullanicilar}/>
            <Route path="/calisan/gorevler" exact strict component={ kGorevler }/>
             <Route path="/calisan/kullanicilar" exact strict component={kKullanicilar}/>
            <Route path="/amir/gorevler" exact strict component={ aGorevler }/>
            <Route path="/amir/gorevver" exact strict component={aGorevver}/>
            <Route path="/amir/kullanicilar" exact strict component={aKullanicilar}/>
            
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
