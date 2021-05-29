import React from "react";
import { BrowserRouter as Router, Switch, Route/*, Link*/ } from "react-router-dom";
import { observer } from "mobx-react";

//COMPONENTS
import UserStore from "./stores/UserStore";
import LoginForm from "./components/Loginform";
import Loading from "./components/Loading";

//PAGES
import Dashboard from "./pages/Dashboard";

import "./assets/css/App.css";

class App extends React.Component {
  async componentDidMount() {
    try {
      let res = await fetch("/isLoggedIn", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      } else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    } catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  async doLogout() {
    try {
      let res = await fetch("/logout", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = "";
      }
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (UserStore.loading) {
      return (
        <div className="app">
          <div className="container">
            <Loading />
          </div>
        </div>
      );
    } else {
      if (UserStore.isLoggedIn) {
        return (
          <Router>
            {/* A <Switch> looks through its children <Route>s and
                  renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/dashboard">
                <div className="app">
                  <div className="container">
                    <Dashboard />
                  </div>
                </div>
              </Route>
            </Switch>
          </Router>
        );
      }

      return (
        <Router>
          {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/">
              <div className="app">
                <div className="container">
                  <LoginForm />
                </div>
              </div>
            </Route>
          </Switch>
        </Router>
      );
    }
  }
}

export default observer(App);
