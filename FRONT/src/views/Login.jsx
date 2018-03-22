import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        alert('A name was submitted: ' + this.state.password);
    }

    // postearLogin() {
    //     api.postLogin('suario', 'pass')
    //         .then(r => {
    //             if (r) {
    //                 alert('logueado!')
    //             } else {
    //                 alert('hay un problema')
    //             }
    //         })
    // }

    render() {
        return (
            <Container>
                <Row >
                    <Col xs="3" style={{ "float": "none", "margin": "0 auto", "justifyContent": "center", "alignItems": "center" }}>
                        <Form onSubmit={this.handleSubmit}>

                            <FormGroup>
                                <Label for="user">Usuario</Label>
                                <Input type="text" name="user" id="user" placeholder="Ingrese su nombre de usuario" value={this.state.value} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Contraseña</Label>
                                <Input type="password" name="password" id="password" placeholder="Ingrese su contraseña" value={this.state.value} onChange={this.handleChange} />
                            </FormGroup>
                            <Button type="submit" value="Submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>


            </Container>
        );
    }
}

