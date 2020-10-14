import React, {useContext } from 'react';
import './App.css';
import { BrowserRouter , Route, Switch} from "react-router-dom";
import {girisContext} from './Store'



function App () {

    const [girisYapildi] = useContext(girisContext);
    return (
    <div className="App">
          <BrowserRouter>
         
            <Switch>
                
            </Switch>
          </BrowserRouter>
    </div>
    );
  
  
}

export default App;
