import React, { Component } from 'react'

export default class OnlineUserList extends Component {
    render() {
        if (this.props.users) {
            return (
                <ul>
                    {this.props.users.map((user, i) => {
                        return <li key={i}>{user.name} ({ user.presence.state })</li>
                    })}
                </ul>
            )
        } else {
            return <p>Loading...</p>
        }
    }
}