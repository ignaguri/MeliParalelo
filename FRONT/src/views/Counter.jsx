import React from 'react'
import {InputGroup, Button, Input, InputGroupAddon} from 'reactstrap';

export default class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contador: ""
        };
        this.restar = this.restar.bind(this);
        this.sumar = this.sumar.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({contador: event.target.value});
        this.emit(event.target.value);
    }
    restar() {
        const actual = Number(this.state.contador);
        if (actual - 1 >= this.props.min) {
            this.setState((prevState, props) => ({
                contador: Number(prevState.contador) - 1
            }));
            this.emit(actual - 1);
        }
    }
    sumar() {
        const actual = Number(this.state.contador);
        if (actual + 1 <= this.props.max) {
            this.setState((prevState, props) => ({
                contador: Number(prevState.contador) + 1
            }));
            this.emit(actual + 1);
        }
    }
    emit(value) {
        this.props.onChange(value);
    }
    render() {
        return (
            <div>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <Button type="button" className="btn btn-outline-danger" onClick={this.restar}>-</Button>
                    </InputGroupAddon>
                    <Input type="number" name="num" min={this.props.min} max={this.props.max} className="form-control" value={this.state.contador} onChange={this.handleChange} placeholder="Cantidad"/>
                    <InputGroupAddon addonType="append">
                        <Button type="button" className="btn btn-outline-success" onClick={this.sumar}>+</Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        );
    }
}