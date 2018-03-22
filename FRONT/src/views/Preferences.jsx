import React, { Component } from 'react';
import { Button, ButtonGroup, Jumbotron, Col, Container, Row, Badge } from 'reactstrap';

class Example extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCategories: [],
            categories: ["Autos", "Frutas", "Bebidas", "Juguetes", "Musica", "Celulares", "Notebooks", "Heladeras", "Ropa"]
        }
        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
    }


    onCheckboxBtnClick(selected) {
        console.log(selected);
        const index = this.state.selectedCategories.indexOf(selected);
        if (index < 0) {
            this.state.selectedCategories.push(selected);
        } else {
            this.state.selectedCategories.splice(index, 1);
        }
        this.setState({ selectedCategories: [...this.state.selectedCategories] });
    }

    render() {
        return (
            <Container >
                <Jumbotron style={{ textAlign: "center" }} >
                    <h1> <Badge color="Light">Preferencias</Badge></h1>
                    <Row>
                        {
                            this.state.categories.map((category, i) => {
                                return (
                                    <Col md="2" xs="4" style={{ margin: "10px", padding: "0px" }}>
                                        <Button outline color="info" style={{ "height": "50", "width": "100%" }} onClick={() => this.onCheckboxBtnClick(category)} active={this.state.selectedCategories.includes(category)}>{category}</Button>
                                        {console.log(category)}
                                    </Col>);
                            })
                        }
                    </Row>
                    <p>Selección: {JSON.stringify(this.state.selectedCategories)}</p>
                </Jumbotron>
            </Container>
        );
    }
}

export default Example;



