import React from 'react';
import api from '../api'
import Counter from './Counter'
import Icon from './Icon'
import strings from '../assets/languages'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,
    Container, Row, Col, CardHeader, Button
} from 'reactstrap';

export default class Producto extends React.Component {
    constructor(props) {
        super(props);

        this.parsearEstado = this.parsearEstado.bind(this);
        this.agregarACarrito = this.agregarACarrito.bind(this);
        this.handleCounter = this.handleCounter.bind(this);
        this.state = {
            language: 'spanish',
            cantidad: 0
        };
    }

    handleCounter(cant) {
        if (cant !== '') {
            this.setState({ cantidad: cant });
        }
    }

    parsearEstado() {
        switch (this.props.producto.condition_item) {
            case "new":
                return "Nuevo";
            case "used":
                return "Usado";
            case "refurbished":
                return "Restaurado";
            default:
                return "Desconocido";
        }
    }

    agregarACarrito() {
        if (this.state.cantidad > 0) {
            api.agregarACarrito(this.props.producto, this.state.cantidad)
        } else {
            alert('La cantidad debe ser mayor a 0!')
        }
    }

    getEstrellas() {
        let aux = [];
        for (let i = 0; i < this.props.producto.qualification; i++) {
            aux.push(<Icon key={i} icon="star" size="24" color="gold" />)
        }
        return aux;
    }

    render() {
        const lang = strings[this.state.language];
        return (
            <Container>
                <Row>
                    <Col md="6">
                        <div className="text-center align-middle">
                            <Card inverse>
                                <CardImg width="100%" src={this.props.producto.pictures[0]} alt="producto" />
                            </Card>
                        </div>
                    </Col>
                    <Col md="6">
                        <Card>
                            <CardHeader tag="h3">{this.props.producto.title}</CardHeader>
                            <CardBody>
                                <div className="text-center">
                                    <CardTitle>
                                        {lang.producto.precioOriginal}: <del>$<span
                                            className="text-danger">{this.props.producto.original_price}</span></del>
                                        <span className="text-muted"> ➡ </span>
                                        {lang.producto.enGrupoB}: <strong>$<span
                                            className="text-success">{this.props.producto.price}</span></strong>
                                    </CardTitle>
                                    <CardSubtitle>
                                        <span>{lang.producto.estado}: <strong>{this.parsearEstado()}</strong></span>
                                        <span> – </span>
                                        <span>{lang.producto.ubicacion}: <strong>{this.props.producto.state_name}</strong></span>
                                    </CardSubtitle>
                                </div>
                                <hr />
                                <Row>
                                    <Col xs="5">
                                        <Counter min={0} max={5000} onChange={this.handleCounter} />
                                    </Col>
                                    <Col xs="7">
                                        <Button className="btn btn-block btn-info" onClick={this.agregarACarrito}>{lang.producto.agregar}</Button>
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col xs="6">
                                        {lang.producto.mercadoPago}:
                                        <span>{' '}{this.props.producto.accepts_mercadopago ?
                                            <Icon icon="tick" size="24" color="green" /> :
                                            <Icon icon="cross" size="24" color="red" />
                                        }</span>
                                    </Col>
                                    <Col>
                                        {lang.producto.clasificacion}: {this.getEstrellas()}
                                    </Col>
                                </Row>
                                <hr />
                                <CardText>{this.props.producto.description}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}