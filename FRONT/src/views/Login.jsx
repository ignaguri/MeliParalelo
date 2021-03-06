import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Jumbotron } from 'reactstrap';
import api from "../api"
import strings from '../assets/languages'

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            language: this.props.language
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    goPrincipal() {
        this.props.go('list');
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
        this.postearLogin();
    }

    postearLogin() {
        api.postLogin(this.state.user, this.state.password)
            .then(r => {
                if (r[0]) {
                    if(r[1] === 'user') {
                        this.props.go('list');
                    }
                    if(r[1] === 'admin') {
                        this.props.go('dashboard');
                    }
                } else {
                    alert(r[1].error)
                }
            })
    }

    render() {
        const lang = strings[this.state.language];
        return (
            <Container>
                <Row style={{ "paddingTop": "10%" }}>
                    <Col xs="12" md="4" style={{ "float": "none", "margin": "0 auto", "justifyContent": "center", "alignItems": "center" }}>
                        <Form onSubmit={this.handleSubmit}>
                            <Jumbotron>
                                <FormGroup>
                                    <Label for="user">{lang.login.usuario}</Label>
                                    <Input type="text" name="user" id="user" placeholder={lang.login.placeholders.user} value={this.state.value} onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">{lang.login.pass}</Label>
                                    <Input type="password" name="password" id="password" placeholder={lang.login.placeholders.pass} value={this.state.value} onChange={this.handleChange} />
                                </FormGroup>
                                <Button type="submit" value="Submit" color="success" >{lang.login.ingresar}</Button>
                            </Jumbotron>
                        </Form>
                    </Col>
                </Row>


            </Container>
        );
    }
}

