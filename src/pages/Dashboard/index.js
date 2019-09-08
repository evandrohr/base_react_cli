import React, { Component } from 'react';
import Header from '../../components/Header';

class Dashboard extends Component {

  componentDidMount() {
    const auth_token = localStorage.getItem('auth_token');
  }

  render() {
    return (
      <div>
        <Header title={"Dashboard"}/>
        <hr className="my-3" />
        <p>

        </p>
      </div>
    );
  }
}

export default Dashboard;