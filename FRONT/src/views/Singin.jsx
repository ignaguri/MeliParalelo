
import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Jumbotron } from 'reactstrap';

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            email: '',
            name: '',
            lastName: '',
            birthdate: '',
            loyaltyPoints: ''
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
                    <Col xs="6" style={{ "display": "flex", "margin": "0 auto", "justify-Content": "center", "align-Items": "center" }}>
                        {/* <Col xs="6  " style={{ "aling-items": "center", "justify-content": "center" }}> */}
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col md="6" xs="3">
                                    <Jumbotron>
                                        <FormGroup>
                                            <Label for="name">Nombre</Label>
                                            <Input type="text" name="name" id="name" placeholder="Ingrese su nombre" value={this.state.value} onChange={this.handleChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="lastName">Apellido</Label>
                                            <Input type="text" name="lastName" id="lastName" placeholder="Ingrese su apellido" value={this.state.value} onChange={this.handleChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="birthdate">Fecha Nacimiento</Label>
                                            <Input type="date" name="birthdate" id="birthdate" value={this.state.value} onChange={this.handleChange} />
                                        </FormGroup>
                                    </Jumbotron>
                                </Col>
                                <Col md="6" xs="3">
                                    <Jumbotron>
                                        <FormGroup>
                                            <Label for="email">E-mail</Label>
                                            <Input type="email" name="email" id="email" placeholder="Ingrese su correo" value={this.state.value} onChange={this.handleChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="user">Usuario</Label>
                                            <Input type="text" name="user" id="user" placeholder="Ingrese un usuario" value={this.state.value} onChange={this.handleChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="password">Contraseña</Label>
                                            <Input type="password" name="password" id="password" placeholder="Ingrese una contraseña" value={this.state.value} onChange={this.handleChange} />
                                        </FormGroup>
                                    </Jumbotron>
                                </Col>
                                <Button type="submit" value="Submit" style={{ "margin": "0 auto", "justify-Content": "center", "align-Items": "center" }}>Submit</Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>


            </Container>
        );
    }
}



