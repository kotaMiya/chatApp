import React, { Component } from 'react';

export default class TypingIndicator extends Component {
    render() {
        if (this.props.usersWhoAreTyping.length === 0) {
            return <div />
        } else if (this.props.usersWhoAreTyping.length === 1) {
            return <p>{this.props.usersWhoAreTyping} is typing ...</p>
        } else if (this.props.usersWhoAreTyping.length > 1) {
            return <p>{this.props.usersWhoAreTyping.join(' and ')} are typing ...</p>
        }
    }
}