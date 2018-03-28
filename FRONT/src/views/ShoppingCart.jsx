import React, { Component } from 'react';
import { Button, Col, Container, Row, Table, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import strings from '../assets/languages';
import api from "../api";

const pointsPercentage = 0.1;

class ShoppingCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            purchases: [
            ],
            totalPrice: 0,
            totalPoints: 0,
            language: this.props.language,
            modal: false
        };

        this.toggle = this.toggle.bind(this);
        this.onAcceptClick = this.onAcceptClick.bind(this);
        this.borrar = this.borrar.bind(this);
        this.goList = this.goList.bind(this);
    }

    mockCarro() {
        api.agregarACarrito({ id: 'MLA614976100', title: 'Kit De Seguridad Para Auto 9 En 1 Tarjeta Patente Vtv Neokit', price: 436.5 }, 2)
        api.agregarACarrito({ id: 'MLA627579355', title: 'Practicuna Plegable Cuna Bebé Megababy+colchón. Creciendo', price: 2899 }, 3)
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    goList() {
        api.vaciarCarrito();
        this.props.go('list');
    }

    componentWillMount() {
        // this.mockCarro();
        const aux = api.getCarrito();
        if (aux === null || aux === "") {
            console.log("No hay items en el carro");
        } else {

            this.setState({ purchases: aux }, function () {
                this.totals();
            });
        }

    }

    onAcceptClick() {
        api.postCheckout();
        this.toggle();

        console.log('Compra Confirmada');
    }

    totals() {

        var totalPoints = 0;
        var totalPrice = 0;
        for (let index = 0; index < this.state.purchases.length; index++) {
            const element = this.state.purchases[index];
            totalPrice += element.price * element.quantity;
            totalPoints += element.price * element.quantity * pointsPercentage;
        }
        totalPoints = parseInt(totalPoints, 10);
        this.setState({ totalPoints: totalPoints });
        this.setState({ totalPrice: totalPrice });
    }

    borrar(idItem) {
        api.quitarACarrito(idItem);
        for (let index = 0; index < this.state.purchases.length; index++) {
            const element = this.state.purchases[index];
            if (element.id === idItem) {
                this.state.purchases.splice(index, 1);
                break;
            }
        }
        this.setState({ purchases: this.state.purchases });
        this.totals();
    }

    render() {
        const lang = strings[this.state.language];
        let purchasesRow = this.state.purchases.map((item) => {
            return (
                <tr key={item.id}>

                    <td>{item.quantity}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity * item.price}</td>
                    <td><Button onClick={() => this.borrar(item.id)} color='danger' style={{ fontWeight: "bold" }}>x</Button> </td>
                </tr>
            );
        });

        var itemsList = this.state.purchases.map((item) => {
            return (
                <ul key={item.id}>
                    <li>{item.quantity} - {item.title} por ${item.quantity * item.price}</li>
                </ul>
            );
        });

        return (
            <Container >
                <Row>
                    <Col md="5" sm="12">

                        <h1>{lang.checkout.title}</h1>
                        <h3>{lang.checkout.subtitle}</h3>
                        <p>
                            {lang.checkout.message}
                        </p>
                    </Col>
                    <Col md="7" sm="12" >
                        <Table hover>
                            <thead>
                                <tr style={{ width: "100%" }}>
                                    <th>{lang.checkout.table.header.quantity}</th>
                                    <th>{lang.checkout.table.header.title}</th>
                                    <th>{lang.checkout.table.header.price}</th>
                                    <th>{lang.checkout.table.header.subTotal}</th>
                                    <th>{lang.checkout.table.header.quit}</th>
                                </tr>
                            </thead>
                            <tbody>

                                {purchasesRow}
                            </tbody>
                        </Table>


                        <div className="clearfix" style={{ padding: '.5rem' }}>
                            <Row>
                                <Col>
                                    <Row>
                                        <Container style={{ fontWeight: "bold" }}>
                                            <span style={{ color: "#727578", float: "left" }}>
                                                {lang.checkout.total}:
                                            </span>

                                            <span style={{ color: "#f06953" }}>{this.state.totalPrice}</span>
                                        </Container>
                                    </Row>
                                    <Row>
                                        <Container style={{ fontWeight: "bold" }}>
                                            <span style={{ color: "#727578", float: "left" }}>
                                                {lang.checkout.points}:
                                            </span>
                                            <span style={{ color: "#4CAF50" }}>{this.state.totalPoints}</span>
                                        </Container>
                                    </Row>
                                </Col>
                                <Col>
                                    <Button onClick={() => this.onAcceptClick()} color="success" size="lg" className="float-right" style={{ backgroundColor: "#f06953", border: "none", color: "white" }}>{lang.checkout.buttons.buy}</Button>
                                </Col>
                            </Row>
                            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                <ModalHeader toggle={this.toggle}>Compra Confirmada</ModalHeader>
                                <ModalBody>
                                    <span style={{ fontWeight: "bold" }}>

                                        Items comprados:
                                            </span>
                                    {itemsList}
                                    <span style={{ fontWeight: "bold" }}>
                                        Total compra:
                                            </span>$
                                    {this.state.totalPrice}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.goList}>Aceptar</Button>
                                </ModalFooter>
                            </Modal>
                        </div>


                    </Col>
                </Row>
            </Container >
        )
    }


}
export default ShoppingCart;
