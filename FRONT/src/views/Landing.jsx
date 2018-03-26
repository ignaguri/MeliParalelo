import React from 'react';
import logo from '../assets/logo.png'
import {Button, ButtonGroup, Container} from 'reactstrap';

export default class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.registrar = this.registrar.bind(this);
        this.login = this.login.bind(this);
    }
    registrar() {
        this.props.go('registration')
    }
    login() {
        this.props.go('login')
    }

    render() {
        return (
            <Container fluid style={{backgroundColor: 'white'}}>
                <div className="text-center">
                <h1 className="display-4">Bienvenido a</h1>
                <img src={logo} width="600px" height="250px" alt="logo"/>
                    <h3>Comprá lo que quieras, ¡al mejor precio!</h3>
                    <hr />
                    <ButtonGroup>
                        <Button color="primary" onClick={this.registrar}>Registrarme</Button>{' '}
                        <Button color="success" onClick={this.login}>Iniciar Sesión</Button>
                    </ButtonGroup>
                </div>
            </Container>
        );
    }
}

