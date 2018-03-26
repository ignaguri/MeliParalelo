import React from 'react';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

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
        this.setState({message: evt.target.value})
    }
    
    handleClick() {
        console.log(this.state.message)
    }

    render() {
        return (
            <InputGroup id="inputDiv">
                <Input value={this.state.inputValue} onChange={this.updateInput}/>
                <InputGroupAddon addonType="append">
                    <Button color="secondary" onClick={this.handleClick} >Enviar</Button>
                </InputGroupAddon>
            </InputGroup>
        );
    }
}