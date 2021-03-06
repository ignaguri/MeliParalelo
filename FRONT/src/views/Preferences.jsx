import React, { Component } from 'react';
import api from "../api"
import strings from '../assets/languages'
import { Button, Jumbotron, Col, Container, Row, Badge } from 'reactstrap';

class Preferences extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCategories: [],
            categories: [],
            language: this.props.language
        }
        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
        this.onAcceptClick = this.onAcceptClick.bind(this);
    }

    componentWillMount() {
        api.getCategories()
            .then(res => {
                this.setState({ categories: res })
                console.log(this.state.categories)
            });

    }

    goPrincipal() {
        this.props.go('list');
    }

    onCheckboxBtnClick(selected) {
        const index = this.state.selectedCategories.indexOf(selected);
        if (index < 0) {
            this.state.selectedCategories.push(selected);
        } else {
            this.state.selectedCategories.splice(index, 1);
        }
        this.setState({ selectedCategories: [...this.state.selectedCategories] });
    }

    onAcceptClick() {
        const lang = strings[this.state.language];
        api.postPreferences(this.state.selectedCategories)
            .then(r => {
                console.log(r);
                if (r) {
                    this.goPrincipal();
                } else {
                    alert(lang.preferences.errorGuardar)
                }
            })
    }

    render() {
        const lang = strings[this.state.language];
        return (
            <Container style={{ "paddingTop": "10%" }}>
                <Jumbotron style={{ textAlign: "center" }} >
                    <h1> <Badge color="Light">{lang.preferences.preferences}</Badge></h1>
                    <Row>
                        {
                            this.state.categories.map((category, i) => {
                                return (
                                    <Col md="2" xs="4" key={i} style={{ margin: "10px", padding: "0px" }}>
                                        <Button outline color="info" style={{ "height": "50", "width": "100%", "whiteSpace": "normal" }} onClick={() => this.onCheckboxBtnClick(category.id)} active={this.state.selectedCategories.includes(category.id)}>{category.name}</Button>
                                    </Col>);
                            })
                        }
                    </Row>
                    {/* <p>Selección: {JSON.stringify(this.state.selectedCategories)}</p> */}
                    <Button color="success" onClick={() => this.onAcceptClick()}>{lang.preferences.ok}</Button>
                </Jumbotron>
            </Container>
        );
    }

}

export default Preferences;

