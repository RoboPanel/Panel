import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { observer } from 'mobx-react';
import UserStore from './stores/UserStore';
import LoginForm from './components/Loginform';
import SubmitButton from './components/SubmitButton';
import Loading from './components/Loading';

import './assets/css/App.css';

class App extends React.Component {

  async componentDidMount() {

    try {
      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }

      else {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }

    }

    catch (e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  async doLogout() {

    try {
      let res = await fetch('/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = '';
      }

    }

    catch (e) {
      console.log(e)
    }
  }

  render() {

    if (UserStore.loading) {
      return (
        <div className="app">
          <div className='container'>
            <Loading/>
          </div>
        </div>
      );
    }

    else {

      if (UserStore.isLoggedIn) {
        return (
          <div className="app">
            <div className='container'>
              Welcome {UserStore.username}

              <SubmitButton
                text={'Log out'}
                disabled={false}
                onClick={() => this.doLogout()}
              />

            </div>
          </div>
        );
      }

      return (
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">LoginForm</Link>
                </li>
              </ul>
            </nav>
    
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/">
                <LoginForm />
              </Route>
            </Switch>
          </div>
        </Router>
      );
    }
  }

}

export default observer(App);
