import React, { Component } from 'react';

export default class MessageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: ''
        }

        this.onChangeForm = this.onChangeForm.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onChangeForm(e) {
        this.setState({
            userName: e.target.value
        })
        this.props.onChange();
    }

    onSubmitForm(e) {
        e.preventDefault();
        this.props.onSubmit(this.state.userName);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitForm}>
                    <input type="text" placeholder="Text here" onChange={this.onChangeForm} />
                    <input type="submit" />
                </form>
            </div>
        );
    }
}