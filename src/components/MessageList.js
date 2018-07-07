import React, { Component } from 'react';

export default class MessageList extends Component {
    render() {
        return (
            <ul>
                { this.props.messages.map((message, i) => (
                    <li key={i}> 
                        <span>{message.senderId}</span>
                        <p>{message.text}</p>
                    </li>
                ))}
            </ul>
        )
    }
}


