import React from 'react';
import api from '../api'
import strings from '../assets/languages'
import {
    Container, Row, Col, ListGroup, ListGroupItem, Alert, Jumbotron
} from 'reactstrap';
import ListItem from "./ListItem";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.handleSelected = this.handleSelected.bind(this);
        this.state = {
            language: this.props.language,
            stats: null,
            producto: null,
            items: []
        };
    }
    componentDidMount() {
        api.getStats().then(response => {
            this.setState({
                stats: response
            });
            let ids = response.map(r => r.Item);
            api.getItemsById(ids)
                .then(res => {
                    this.setState({items: res})
                })
        });
    }

    handleSelected(p) {
        let prod = this.state.stats.find(o => o.Item === p);
        const item = this.state.items.find(i => i.id === p);
        prod.title = item.title;
        this.setState({producto: prod});
    }

    render() {
        const lang = strings[this.state.language];
        let stat = null;
        if (this.state.producto) {
            stat = <Container fluid>
                    <h1 className="display-4">{this.state.producto.title}</h1>
                    <ul style={{listStyleType: 'none'}}>
                        <li><h4>{lang.dashboard.visitado}: <span className="text-warning">{this.state.producto.Visits} {this.state.producto.Visits === 1? lang.dashboard.vez : lang.dashboard.veces}</span></h4></li>
                        <li><h4>{lang.dashboard.comprado}: <span className="text-info">{this.state.producto.Purchases} {this.state.producto.Purchases === 1? lang.dashboard.vez : lang.dashboard.veces}</span></h4></li>
                        <li><h4>{lang.dashboard.ratioCompra}: <span className="text-success">{this.state.producto.Purchases / this.state.producto.Visits} {lang.dashboard.veces}</span></h4></li>
                    </ul>
                </Container>
        } else {
            stat = <Container fluid>
                <Alert color="primary">
                    {lang.dashboard.select}
                    </Alert>
                </Container>
        }
        return (
            <Container>
                <Row>
                    <Col md="5">
                        <div className="text-center align-middle">
                            <h3>{lang.dashboard.productos}</h3>
                            <ListGroup>
                                <ListGroupItem disabled tag="a" href="#">
                                    {this.state.items.length > 0?
                                        this.state.items.map((item, i) => {
                                        return <ListItem key={i} obj={item} reference={item.id} thumbnail={item.thumbnail} price={item.price} title={item.title} location={item.state_name} onSelected={ this.handleSelected }/>
                                    })
                                    :
                                    <p>No data yet</p>}
                                </ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col md="7">
                        <Container fluid>
                            <h3>{lang.dashboard.stats}</h3>
                            <div className="text-center">
                                <Jumbotron fluid>
                                    {stat}
                                </Jumbotron>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}