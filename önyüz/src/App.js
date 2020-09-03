import React, {useContext } from 'react';
import './App.css';
import Gorevler from './Gorevler';
import Gorevver from './GorevVer';
import { BrowserRouter , Route, Switch} from "react-router-dom";
import Istatistik from './Istatistik';
import Navigation from './Navigation';
import {girisContext} from './Store'
import Kullanicilar from './Kullanicilar';



function App () {

    const [girisYapildi] = useContext(girisContext);
    return (
    <div className="App">
          <BrowserRouter>
         <Navigation/>
            <Switch>
                <Route path="/gorevler" exact strict component={ girisYapildi === "true" ? Gorevler  : null }/>
                <Route path="/gorevver" exact strict component={girisYapildi === "true" ? Gorevver  : null}/>
                <Route path="/istatistik" exact strict component={girisYapildi === "true" ? Istatistik  : null}/>
                <Route path="/kullanicilar" exact strict component={() => <Kullanicilar/>}/>
            </Switch>
          </BrowserRouter>
    </div>
    );
  
  
}

export default App;
