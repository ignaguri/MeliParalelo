import React from 'react';
import logo from '../assets/logo.png'
import strings from '../assets/languages'
import { Button, ButtonGroup, Container } from 'reactstrap';

export default class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.registrar = this.registrar.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            language: 'spanish'
        }
    }

    registrar() {
        this.props.go('registration')
    }
    login() {
        this.props.go('login')
    }

    render() {
        const lang = strings[this.state.language];
        return (
            <Container fluid style={{ backgroundColor: 'white' }}>
                <div className="text-center">
                    <h1 className="display-4">{lang.landing.bienvenido}</h1>
                    <img src={logo} width="600px" height="250px" alt="logo" />
                    <h3>{lang.landing.slogan}</h3>
                    <hr />
                    <ButtonGroup>
                        <Button color="primary" onClick={this.registrar}>{lang.landing.signin}</Button>{' '}
                        <Button color="success" onClick={this.login}>{lang.landing.login}</Button>
                    </ButtonGroup>
                </div>
            </Container>
        );
    }
}

