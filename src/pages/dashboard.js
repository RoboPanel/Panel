import React from 'react';
import SubmitButton from '../components/SubmitButton';
import UserStore from '../stores/UserStore';
import '../assets/css/App.css';

class Dashboard  {

  render() {
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

}

export default Dashboard;