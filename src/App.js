import React, { Component } from 'react';
import UserName from './components/UserForm';
import ChatScreen from './components/ChatScreen';
import './App.css';

// import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentScreen: 'UserFormScreen',
      currentUserName: ''
    }
    this.onUserNameSubmitted = this.onUserNameSubmitted.bind(this);
  }

  onUserNameSubmitted(username) {
    fetch('http://localhost:3001/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username })
    })
    .then(res => {
      console.log('success');
      this.setState({
        currentScreen: 'ChatScreen',
        currentUserName: username
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    if (this.state.currentScreen === 'UserFormScreen') {
      return <UserName onSubmit={this.onUserNameSubmitted} />
    } else if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen username={this.state.currentUserName} />
    }
  }
}

export default App;
