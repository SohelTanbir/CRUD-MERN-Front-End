import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Header from './components/Header/Header.jsx';
import Home from './components/Home/Home';
import AllUsers from './components/AllUsers/AllUsers';
import AddUser from './components/AddUser/AddUser';
import UpdateUser from './components/UpdateUser/UpdateUser';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';


export const userContext = createContext([])


function App() {
  const [loggedInUser, setLoggedInUser] = useState();
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/alluser">
              <AllUsers />
            </Route>
            <Route path="/adduser">
              <AddUser />
            </Route>
            <Route path="/updateUser/:id">
              <UpdateUser />
            </Route>
            <Route path="/login">
              <Login />
            </Route>

          </Switch>
        </Router>

      </div>
    </userContext.Provider>
  );
}

export default App;
