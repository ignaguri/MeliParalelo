import api from "../api";
import React from 'react';
import strings from '../assets/languages';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Jumbotron } from 'reactstrap';


export default class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            email: '',
            name: '',
            lastName: '',
            birthdate: '',
            loyaltyPoints: '',
            language: this.props.language
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
        this.postearSignIn();
    }

    postearSignIn() {
        api.postSignin(this.state.user, this.state.password, this.state.name, this.state.lastName, this.state.birthdate, this.state.email)
            .then(r => {
                if (r[0]) {
                    this.props.go('preferences');
                } else {
                    alert(r[1].error);
                }
            })
    }

    render() {
        const lang = strings[this.state.language];
        return (
            <Container>
                <Row style={{ "paddingTop": "10%" }}>
                    <Col xs="12" md="6" style={{ "display": "flex", "margin": "0 auto", "justifyContent": "center", "alignItems": "center" }}>
                        <Form onSubmit={this.handleSubmit}>
                            <Row>
                                <Col md="6" xs="12">
                                    <Jumbotron>
                                        <FormGroup>
                                            <Label for="name">{lang.signIn.nombre}</Label>
                                            <Input type="text" name="name" id="name" placeholder={lang.signIn.placeholders.nombre} value={this.state.value} onChange={this.handleChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="lastName">{lang.signIn.apellido}</Label>
                                            <Input type="text" name="lastName" id="lastName" placeholder={lang.signIn.placeholders.apellido} value={this.state.value} onChange={this.handleChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="birthdate">{lang.signIn.fechaNacimiento}</Label>
                                            <Input type="date" name="birthdate" id="birthdate" value={this.state.value} onChange={this.handleChange} />
                                        </FormGroup>
                                    </Jumbotron>
                                </Col>
                                <Col md="6" xs="12">
                                    <Jumbotron>
                                        <FormGroup>
                                            <Label for="email">{lang.signIn.email}</Label>
                                            <Input type="email" name="email" id="email" placeholder={lang.signIn.placeholders.mail} value={this.state.value} onChange={this.handleChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="user">{lang.signIn.usuario}</Label>
                                            <Input type="text" name="user" id="user" placeholder={lang.signIn.placeholders.user} value={this.state.value} onChange={this.handleChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="password">{lang.signIn.pass}</Label>
                                            <Input type="password" name="password" id="password" placeholder={lang.signIn.placeholders.pass} value={this.state.value} onChange={this.handleChange} />
                                        </FormGroup>
                                    </Jumbotron>
                                </Col>
                                <Button type="submit" value="Submit" color="success" style={{ "margin": "0 auto", "justifyContent": "center", "alignItems": "center" }}>{lang.signIn.crearCuenta}</Button>
                            </Row>
                        </Form>
                    </Col>
                </Row>


            </Container>
        );
    }
}



