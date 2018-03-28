import React from 'react'
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap'
import api from '../api'
import strings from '../assets/languages'

export default class InputComment extends React.Component {
    constructor() {
        super();
        this.state = {
            message: ""
        }
        this.updateInput = this.updateInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    updateInput(evt) {
        this.setState({ message: evt.target.value })
    }

    handleClick() {
        api.postComment(this.state.message)
            .then(r => {
                this.props.loadComments()
                this.setState({inputValue: ""})
            })
    }

    render() {
        const lang = strings[this.props.language];
        return (
            <InputGroup id="inputDiv">
                <Input value={this.state.inputValue} onChange={this.updateInput} maxLength="256" minLength="1" />
                <InputGroupAddon addonType="append">
                    <Button color="secondary" onClick={this.handleClick} >{lang.comment.enviar}</Button>
                </InputGroupAddon>
            </InputGroup>
        );
    }
}