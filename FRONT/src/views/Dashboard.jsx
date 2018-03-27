import React from 'react';
import api from '../api'
import Icon from './Icon'
import strings from '../assets/languages'
import {
    Card, Container, Row, Col
} from 'reactstrap';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: this.props.language
        };
    }

    render() {
        const lang = strings[this.state.language];
        return (
            <Container>
                <Row>
                    <Col md="6">
                        <div className="text-center align-middle">
                            <Card inverse>
                               <Icon icon="cross" color="red" size="48"/>
                            </Card>
                        </div>
                    </Col>
                    <Col md="6">
                        Aca van las estadísticas
                    </Col>
                </Row>
            </Container>
        );
    }
}