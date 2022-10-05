import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';
import Account from "./Account";
import Country from "./Country";
import CreateAccount from "./CreateAccount";
import HeaderNavBar from "./HeaderNavBar";
import Home from "./Home";
import LogIn from "./LogIn";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    fetch("/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.id) {
          setUser(data);
        } else {
          console.log("Invalid username or password from /me");
        }
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <HeaderNavBar user={user} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Switch>
          <Route exact path="/">
            <Home user={user} />
          </Route>
          <Route path="/login">
            <LogIn setUser={setUser} setIsAuthenticated={setIsAuthenticated} />
          </Route>
          <Route path="/country">
            <Country user={user} />
          </Route>
          <Route path="/account">
            <Account user={user} setUser={setUser} />
          </Route>
          <Route path="/new">
            <CreateAccount setUser={setUser} setIsAuthenticated={setIsAuthenticated} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
