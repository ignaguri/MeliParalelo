import React from 'react';
import api from '../api'
import strings from '../assets/languages'
import logo from '../assets/logo.png'
import carrito from '../assets/carrito.svg'
import logout from '../assets/logout.svg'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    NavLink,
    Nav,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';

import Icon from "./Icon";

export default class Banner extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            language: 'spanish',
            isOpen: false,
            locations: [],
            condicion: "",
            location: "",
            precioMin: "",
            precioMax: ""
        };
        this.handleConditionChange = this.handleConditionChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handlePriceMinChange = this.handlePriceMinChange.bind(this);
        this.handlePriceMaxChange = this.handlePriceMaxChange.bind(this);
        this.filtrar = this.filtrar.bind(this);
        this.verCarrito = this.verCarrito.bind(this);
        this.salir = this.salir.bind(this);
    }
    /*
    componentDidMount() {
        api.getLocations().then(response => {
            this.setState({
                locations: response
            });
        });
    }
    */
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    handleLocationChange(event) {
        this.setState({ location: event.target.value });
    }
    handleConditionChange(event) {
        this.setState({ condicion: event.target.value });
    }
    handlePriceMinChange(event) {
        this.setState({ precioMin: event.target.value });
    }
    handlePriceMaxChange(event) {
        this.setState({ precioMax: event.target.value });
    }
    filtrar(e) {
        let filtros = {};
        if (this.state.condicion !== "") {
            filtros.condicion = this.state.condicion;
        }
        if (this.state.location !== "") {
            filtros.location = this.state.location;
        }
        if (this.state.precioMin !== "") {
            filtros.precioMin = Number(this.state.precioMin);
        }
        if (this.state.precioMax !== "") {
            if (Number(this.state.precioMax) > Number(this.state.precioMin)) {
                filtros.precioMax = Number(this.state.precioMax);
            } else {
                alert('El precio máximo no puede ser menor que el precio mínimo');
                return;
            }
        }
        api.filtrar(filtros)
            .then(r => {
                if (r) {
                    alert('Mostrar filtrado!')
                } else {
                    alert('Error filtrando')
                }
            })
    }
    verCuadricula() {
        console.log('implementar')
    }
    verLista() {
        console.log('implementar')
    }
    verSlider() {
        console.log('implementar')
    }
    verCarrito(e) {
        e.preventDefault();
        console.log('ver carrito', e)
    }
    salir(e) {
        e.preventDefault();
        console.log('salir', e)
    }
    render() {
        const lang = strings[this.state.language];
        return (

            <div id="banner">
                <Navbar color="light" light expand="lg">
                    <NavbarBrand>
                        <img src={logo} width="80px" height="50px" alt="logo" />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <span className="align-self-center">{lang.bannerVer}:</span>
                            <Button className="btn btn-light" onClick={this.verCuadricula}><Icon icon="cuadricula" /></Button>{' '}
                            <Button className="btn btn-light" onClick={this.verLista}><Icon icon="lista" /></Button>{' '}
                            <Button className="btn btn-light" onClick={this.verSlider}><Icon icon="slider" /></Button>{' '}
                            <Form inline>

                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="condicion" className="mr-sm-2">Condición:</Label>
                                    <Input type="select" name="cmb_condicion" id="condicion" bsSize="sm" value={this.state.condicion} onChange={this.handleConditionChange} >
                                        <option value="">Sin filtro</option>
                                        <option value="nuevo">Nuevo</option>
                                        <option value="usado">Usado</option>
                                        <option value="refurbished">Restaurado</option>
                                    </Input>
                                </FormGroup>

                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="ubicacion" className="mr-sm-2">Ubicación:</Label>
                                    <Input type="select" name="cmb_ubicacion" id="ubicacion" bsSize="sm" value={this.state.location} onChange={this.handleLocationChange}>
                                        <option value="">Sin filtro</option>
                                        {this.state.locations.map((loc) =>
                                            <option key={loc} value={loc}>{loc}</option>
                                        )}
                                    </Input>
                                </FormGroup>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="precioMin" className="mr-sm-2">Precio $</Label>
                                    <Input type="number" name="number" id="precioMin" placeholder="Mínimo" bsSize="sm" value={this.state.precioMin} onChange={this.handlePriceMinChange} />
                                </FormGroup>
                                <FormGroup className="mb-1 mr-sm-1 mb-sm-0">
                                    <Input type="number" name="number" id="precioMax" placeholder="Máximo" bsSize="sm" value={this.state.precioMax} onChange={this.handlePriceMaxChange} />
                                </FormGroup>
                                {' '}
                                <Button color="success" onClick={this.filtrar}>Filtrar</Button>
                            </Form>
                            {'      '}
                            <NavLink href="#" onClick={this.verCarrito}><img src={carrito} width="40px" height="50px" alt="carrito" /></NavLink>
                            <NavLink href="#" onClick={this.salir}><img src={logout} width="40px" height="50px" alt="salir" /></NavLink>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}