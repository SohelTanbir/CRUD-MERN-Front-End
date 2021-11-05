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


function App() {
  return (
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
            <AllUsers/>
          </Route>
          <Route path="/adduser">
            <AddUser title="Add New User"/>
          </Route>
          <Route path="/updateUser">
            <AddUser title="Update User"/>
          </Route>

        </Switch>
      </Router>

    </div>
  );
}

export default App;
