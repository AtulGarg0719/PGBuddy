
import './App.css';

import React from 'react';
import {BrowserRouter as Router , Switch, Route} from 'react-router-dom';
import Login from './mainpages/login';
import Register from './mainpages/register';

function App() {
  return (
   <Router>
     <Switch>
       <Route exact path='/' component={Login}></Route>
       <Route  path='/register' component={Register}></Route>
     </Switch>
   </Router>
  );
}

export default App;
