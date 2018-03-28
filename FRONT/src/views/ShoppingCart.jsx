import React, { Component } from 'react';
import api from "../api"
import { Button, Col, Container, Row, Table } from 'reactstrap';

const pointsPercentage = 0.1;
const textMap = {
    table: {
        header: {
            quantity: 'Cantidad',
            title: 'Titulo',
            price: 'Precio',
            subTotal: 'Subtotal',
            quit: 'Quitar',
        }
    },
    total: 'Total',
    points: 'Puntos',
    subtitle: 'Con cada compra sumas puntos',
    message: 'El 10% del total de tu compra',
    title: 'Productos seleccionados',
    buttons: {
        buy: 'Comprar'
    }
};


class ShoppingCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            purchases: [],
            totalPrice: 0,
            totalPoints: 0,
            language: this.props.language
        }
        this.onAcceptClick = this.onAcceptClick.bind(this);
        this.borrar = this.borrar.bind(this);
    }

    mockCarro() {
        api.agregarACarrito({ id: 'MLA614976100', title: 'Kit De Seguridad Para Auto 9 En 1 Tarjeta Patente Vtv Neokit', price: 436.5 }, 2)
        api.agregarACarrito({ id: 'MLA627579355', title: 'Practicuna Plegable Cuna Bebé Megababy+colchón. Creciendo', price: 2899 }, 3)
    }

    componentWillMount() {
        this.mockCarro();
        const aux = api.getCarrito();
        if (aux != null) {

            this.setState({ purchases: aux });
        }
        this.totals();
    }

    onAcceptClick() {
        api.postCheckout();
        console.log('Confirmar compra');
    }

    totals() {
        var totalPoints = 0;
        var totalPrice = 0;
        for (let index = 0; index < this.state.purchases.length; index++) {
            const element = this.state.purchases[index];
            totalPrice += element.price * element.quantity;
            totalPoints += element.price * element.quantity * pointsPercentage;
        }
        this.setState({ totalPoints: totalPoints });
        this.setState({ totalPrice: totalPrice });
    }

    borrar(idItem) {
        api.quitarACarrito(idItem);
        for (let index = 0; index < this.state.purchases.length; index++) {
            const element = this.state.purchases[index];
            if (element.id === idItem) {
                this.state.purchases.splice(index, 1);
                console.log("paso")
                break;
            }
        }
        this.setState({ purchases: this.state.purchases });
        this.totals();
    }

    render() {
        var total = 0, points = 0;
        var purchasesRow = this.state.purchases.map((item) => {
            total += (item.quantity * item.price);
            points += item.quantity * item.price * pointsPercentage;
            return (
                <tr>

                    <td>{item.quantity}</td>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity * item.price}</td>
                    <td><Button onClick={() => this.borrar(item.id)} color='danger' style={{ fontWeight: "bold" }}>x</Button> </td>
                </tr>
            );
        });

        return (
            <Container >
                <Row>
                    <Col md="5" sm="12">

                        <h1>{textMap.title}</h1>
                        <h3>{textMap.subtitle}</h3>
                        <p>
                            {textMap.message}
                        </p>
                    </Col>
                    <Col md="7" sm="12" >
                        <Table hover>
                            <thead>
                                <tr style={{ width: "100%" }}>
                                    <th>{textMap.table.header.quantity}</th>
                                    <th>{textMap.table.header.title}</th>
                                    <th>{textMap.table.header.price}</th>
                                    <th>{textMap.table.header.subTotal}</th>
                                    <th>{textMap.table.header.quit}</th>
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
                                                {textMap.total}:
                                            </span>
                                            <span style={{ color: "#f06953" }}>{this.state.totalPrice}</span>
                                        </Container>
                                    </Row>
                                    <Row>
                                        <Container style={{ fontWeight: "bold" }}>
                                            <span style={{ color: "#727578", float: "left" }}>
                                                {textMap.points}:
                                            </span>
                                            <span style={{ color: "#4CAF50" }}>{this.state.totalPoints}</span>
                                        </Container>
                                    </Row>
                                </Col>
                                <Col>
                                    <Button onClick={() => this.onAcceptClick()} color="success" size="lg" className="float-right" style={{ backgroundColor: "#f06953", border: "none", color: "white" }}>{textMap.buttons.buy}</Button>
                                </Col>
                            </Row>

                        </div>


                    </Col>
                </Row>
            </Container >
        )
    }


}
export default ShoppingCart;
