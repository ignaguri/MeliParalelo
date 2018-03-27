import React from 'react';
import logo from '../assets/logo.png'
import strings from '../assets/languages'
import eng from '../assets/eng-flag.svg'
import esp from '../assets/esp-flag.svg'
import prt from '../assets/prt-flag.svg'
import { Button, ButtonGroup, Container } from 'reactstrap';

export default class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.registrar = this.registrar.bind(this);
        this.login = this.login.bind(this);
        this.onLangChange = this.onLangChange.bind(this);

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
    onLangChange(lang) {
        this.setState({ language: lang });
        this.props.langChange(lang)
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
                    <hr />
                    <ButtonGroup>
                        <Button outline color="secondary" onClick={() => this.onLangChange('spanish')} active={this.state.language === 'spanish'}><img src={esp} width="30px" height="30px" alt="spanish" /></Button>{' '}
                        <Button outline color="secondary" onClick={() => this.onLangChange('english')} active={this.state.language === 'english'}><img src={eng} width="30px" height="30px" alt="english" /></Button>{' '}
                        <Button outline color="secondary" onClick={() => this.onLangChange('portuguese')} active={this.state.language === 'portuguese'}><img src={prt} width="30px" height="30px" alt="portuguese" /></Button>
                    </ButtonGroup>
                </div>
            </Container>
        );
    }
}

