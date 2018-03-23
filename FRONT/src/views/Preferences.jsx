import React, { Component } from 'react';
import api from "../api"
import { Button, ButtonGroup, Jumbotron, Col, Container, Row, Badge } from 'reactstrap';

class Example extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCategories: [],
            categories: []
        }
        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
        this.onAcceptClick = this.onAcceptClick.bind(this);
    }

    componentWillMount() {
        this.setState({ categories: api.getCategories() });
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
        //call de fucking bacon's app
    }

    render() {
        return (
            <Container style={{ "padding-top": "10%" }}>
                <Jumbotron style={{ textAlign: "center" }} >
                    <h1> <Badge color="Light">Preferencias</Badge></h1>
                    <Row>
                        {
                            this.state.categories.map((category, i) => {
                                return (
                                    <Col md="2" xs="4" style={{ margin: "10px", padding: "0px" }}>
                                        <Button outline color="info" style={{ "height": "50", "width": "100%" }} onClick={() => this.onCheckboxBtnClick(category)} active={this.state.selectedCategories.includes(category)}>{category}</Button>
                                    </Col>);
                            })
                        }
                    </Row>
                    {/* <p>Selección: {JSON.stringify(this.state.selectedCategories)}</p> */}
                    <Button color="success" onClick={() => this.onAcceptClick()}>Aceptar</Button>
                </Jumbotron>
            </Container>
        );
    }
}

export default Example;



