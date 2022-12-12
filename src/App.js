import React from 'react';
import { Switch } from 'react-router-dom';
import { BrowserRouter as Router,Route} from "react-router-dom";
import './App.css';
import AddressBookForm from "./components/addressbook-form"
import Home from "./components/home"
import Headers from "./components/headers"

function App(){
  
  return (
    <div className="App">
      <Headers/>
      <Router>
        <Switch>
          <Route exact path="/"><AddressBookForm/></Route>
          <Route  path="/home"><Home/></Route>
          <Route path="/AddressBookForm/:perId"><AddressBookForm/></Route>
        </Switch>
      </Router>
    </div>
  );
  }

export default App;
