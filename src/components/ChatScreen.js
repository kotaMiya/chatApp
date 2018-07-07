import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import TypingIndicator from './TypingIndicator';
import OnlineUserList from './OnlineUserLIst';

import styles from '../styles/ChatScreenStyle';

export default class ChatScreen extends Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            currentRoom: {},
            currentUser: {},
            usersWhoAreTyping: []
        }

        this.sendMessage = this.sendMessage.bind(this);
        this.typingEvent = this.typingEvent.bind(this);
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'INSTANCE',
            userId: this.props.username,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'http://localhost:3001/auth'
            })
        })

        chatManager
            .connect()
            .then(currentUser => {
                this.setState({ currentUser })
                return currentUser.subscribeToRoom({
                    roomId: 11089229,
                    messageLimit: 100,
                    hooks: {
                        onNewMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message],
                            })
                        },
                        onUserStartedTyping: user => {
                            this.setState({
                                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
                            })
                        },
                        onUserStoppedTyping: user => {
                            this.setState({
                                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                                    username => username !== user.name
                                )
                            })
                        },
                        onUserCameOnline: () => this.forceUpdate(),
                        onUserWentOffline: () => this.forceUpdate(),
                        onUserJoined: () => this.forceUpdate(),
                    }
                })
            })
            .then(currentRoom => { this.setState({ currentRoom }) })
            .catch(err => console.log(err))
    }

    sendMessage(text) {
        this.state.currentUser.sendMessage({
            roomId: this.state.currentRoom.id,
            text
        })
    }

    typingEvent() {
        this.state.currentUser
            .isTypingIn({
                roomId: this.state.currentRoom.id
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div style={styles.root}>
                <div style={styles.sideBar}>
                    <div style={styles.header}>
                        <h1>Chat app</h1>
                        <p>Hello, {this.props.username}</p>
                    </div>

                    <div>
                        <OnlineUserList users={this.state.currentRoom.users} />
                    </div>
                </div>
                
                <MessageList messages={ this.state.messages } />
                <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />

                <div style={styles.messageForm}>
                    <MessageForm 
                        onSubmit={ this.sendMessage } 
                        onChange={ this.typingEvent}
                    />
                </div>
            </div>
        )
    }
}