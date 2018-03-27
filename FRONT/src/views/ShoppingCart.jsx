import React, { Component } from 'react';
import api from "../api"
import { Button, Col, Container, Row } from 'reactstrap';

const pointsPercentage = 0.1;
const textMap = {
    table: {
        header: {
            quantity: 'Cantidad',
            title: 'Titulo',
            price: 'Precio',
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

    componentWillMount() {
        const aux = api.getCarrito();
        if (aux != null) {

            this.setState({ purchases: aux });
        }
    }

    onAcceptClick() {
        api.postCheckout();
        console.log('Confirmar compra');
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
    }

    render() {
        var total = 0, points = 0;
        var purchasesRow = this.state.purchases.map((item) => {
            total += (item.quantity * item.price);
            points += item.quantity * item.price * pointsPercentage;
            return (
                <CartItem key={item.id} id={item.id} quantity={item.quantity} title={item.title} price={item.quantity * item.price} borrar={this.borrar} />
            );
        });
        this.setState({ totalPrice: total });
        this.setState({ totalPoints: points });

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
                        <table>
                            <thead>
                                <tr style={{ width: "100%" }}>
                                    <th>{textMap.table.header.quantity}</th>
                                    <th>{textMap.table.header.title}</th>
                                    <th>{textMap.table.header.price}</th>
                                    <th>{textMap.table.header.quit}</th>
                                </tr>
                            </thead>
                        </table>
                        {purchasesRow}


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


class CartItem extends Component {
    constructor(props) {
        super(props);
        this.borrar = this.borrar.bind(this);
    }

    borrar() {
        this.props.borrar(this.props.id);
    }

    render() {
        return (
            <div style={{ boxShadow: "0 1px 0 #e1e5e8", width: "100%", paddingLeft: "15px", fontWeight: "bold", marginBottom: "11px", height: "60px" }}>
                <span style={{ color: "#4ea6bc", float: "left", paddingTop: "20px", paddingBottom: "5px", width: "35px" }}>
                    {this.props.quantity}
                </span>
                <span style={{ color: "#727578", float: "left", paddingTop: "20px", paddingBottom: "5px", paddingLeft: "10px" }}>
                    {this.props.title}
                </span>
                <Button color="danger" size="sm" onClick={this.borrar} style={{ paddingTop: "20px", paddingBottom: "5px", float: "right" }}>x</Button>
                <span style={{ color: "#f06953", float: "right", paddingTop: "20px", paddingBottom: "5px", paddingRight: "5px" }}>
                    {this.props.price}
                </span>
            </div>
        )
    }
}

// <div class="container text-center">

//     <div class="col-md-5 col-sm-12">
//         <div class="bigcart"></div>
//         <h1>Your shopping cart</h1>
//         <p>
//             This is a free and <b><a href="http://tutorialzine.com/2014/04/responsive-shopping-cart-layout-twitter-bootstrap-3/" title="Read the article!">responsive shopping cart layout, made by Tutorialzine</a></b>. It looks nice on both desktop and mobile browsers. Try it by resizing your window (or opening it on your smartphone and pc).
// 				</p>
//     </div>

//     <div class="col-md-7 col-sm-12 text-left">
//         <ListGroup>
//             <li class="row list-inline columnCaptions">
//                 <span>QTY</span>
//                 <span>ITEM</span>
//                 <span>Price</span>
//             </li>
//             <li class="row">
//                 <span class="quantity">1</span>
//                 <span class="itemName">Birthday Cake</span>
//                 <span class="popbtn"><a class="arrow"></a></span>
//                 <span class="price">$49.95</span>
//             </li>
//             <li class="row">
//                 <span class="quantity">50</span>
//                 <span class="itemName">Party Cups</span>
//                 <span class="popbtn"><a class="arrow"></a></span>
//                 <span class="price">$5.00</span>
//             </li>
//             <li class="row">
//                 <span class="quantity">20</span>
//                 <span class="itemName">Beer kegs</span>
//                 <span class="popbtn"><a class="arrow"></a></span>
//                 <span class="price">$919.99</span>
//             </li>
//             <li class="row">
//                 <span class="quantity">18</span>
//                 <span class="itemName">Pound of beef</span>
//                 <span class="popbtn"><a class="arrow"></a></span>
//                 <span class="price">$269.45</span>
//             </li>
//             <li class="row">
//                 <span class="quantity">1</span>
//                 <span class="itemName">BListGrouplet-proof vest</span>
//                 <span class="popbtn" data-parent="#asd" data-toggle="collapse" data-target="#demo"><a class="arrow"></a></span>
//                 <span class="price">$450.00</span>
//             </li>
//             <li class="row totals">
//                 <span class="itemName">Total:</span>
//                 <span class="price">$1694.43</span>
//                 <span class="order"> <a class="text-center">ORDER</a></span>
//             </li>
//         </ListGroup>
//     </div>

// </div>
