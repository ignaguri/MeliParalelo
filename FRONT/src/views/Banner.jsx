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
            language: this.props.language,
            isOpen: false,
            locations: [],
            categorias: [],
            categoria: "",
            condicion: "",
            location: "",
            precioMin: "",
            precioMax: ""
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleConditionChange = this.handleConditionChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handlePriceMinChange = this.handlePriceMinChange.bind(this);
        this.handlePriceMaxChange = this.handlePriceMaxChange.bind(this);
        this.verCuadricula = this.verCuadricula.bind(this);
        this.verLista = this.verLista.bind(this);
        this.verSlider = this.verSlider.bind(this);
        this.filtrar = this.filtrar.bind(this);
        this.verCarrito = this.verCarrito.bind(this);
        this.salir = this.salir.bind(this);
    }
    componentDidMount() {
        api.getLocations().then(response => {
            this.setState({
                locations: response
            });
        });
        api.getCategories().then(response => {
            this.setState({
                categorias: response
            });
        });
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    handleLocationChange(event) {
        this.setState({ location: event.target.value });
    }
    handleCategoryChange(event) {
        this.setState({ categoria: event.target.value });
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
        if (this.state.categoria !== "") {
            filtros.categoria = this.state.categoria;
        }
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
        if(!filtros.categoria){
            this.props.filtered(null);
            return;
        }
        api.getItemsWithFilter(filtros.categoria, filtros.condicion, filtros.precioMin, filtros.precioMax, filtros.location)
            .then(r => {
                if (r) {
                    this.props.filtered(r);
                } else {
                    alert('Error filtrando')
                }
            })
    }
    verCuadricula() {
        this.props.go('card')
    }
    verLista() {
        this.props.go('list')
    }
    verSlider() {
        this.props.go('carousel')
    }
    verCarrito(e) {
        e.preventDefault();
        const aux = api.getCarrito();
        if (aux === null || aux === "") {

        } else {
            this.props.go('carrito')
        }
    }
    salir(e) {
        e.preventDefault();
        api.logout();
        this.props.go('landing')
    }
    render() {
        const lang = strings[this.props.language];
        return (
            <div id="banner">
                <Navbar color="light" light expand="lg">
                    <NavbarBrand>
                        <img src={logo} width="70px" height="45px" alt="logo" />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        {
                            this.props.isDashboard?
                            <Nav className="ml-auto" navbar>
                                <NavLink href="#" onClick={this.salir}><img src={logout} width="40px" height="50px" alt="salir" /></NavLink>
                            </Nav>
                            :
                            <Nav className="ml-auto" navbar>
                                <span className="align-self-center">{lang.banner.ver}:</span>
                                <Button className="btn btn-light" onClick={this.verCuadricula}><Icon icon="cuadricula" /></Button>{' '}
                                <Button className="btn btn-light" onClick={this.verLista}><Icon icon="lista" /></Button>{' '}
                                <Button className="btn btn-light" onClick={this.verSlider}><Icon icon="slider" /></Button>{' '}
                                <Form inline>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="cmb_categoria" className="mr-sm-2">{lang.banner.categoria}:</Label>
                                        <Input type="select" name="cmb_categoria" id="cmb_categoria" bsSize="sm" value={this.state.categoria} onChange={this.handleCategoryChange} style={{width: '82px'}}>
                                            <option value="">{lang.banner.noFilter}</option>
                                            {this.state.categorias.map((c) =>
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            )}
                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="cmb_condicion" className="mr-sm-2">{lang.banner.condicion}:</Label>
                                        <Input type="select" name="cmb_condicion" id="cmb_condicion" bsSize="sm" value={this.state.condicion} onChange={this.handleConditionChange} style={{width: '82px'}}>
                                            <option value="">{lang.banner.noFilter}</option>
                                            <option value="new">{lang.banner.new}</option>
                                            <option value="used">{lang.banner.used}</option>
                                            <option value="refurbished">{lang.banner.refurbished}</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="cmb_ubicacion" className="mr-sm-2">{lang.banner.location}:</Label>
                                        <Input type="select" name="cmb_ubicacion" id="cmb_ubicacion" bsSize="sm" value={this.state.location} onChange={this.handleLocationChange} style={{width: '82px'}}>
                                            <option value="">{lang.banner.noFilter}</option>
                                            {this.state.locations.map((loc) =>
                                                <option key={loc} value={loc}>{loc}</option>
                                            )}
                                        </Input>
                                    </FormGroup>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Label for="precioMin" className="mr-sm-2">{lang.banner.price} $</Label>
                                        <Input type="number" name="number" id="precioMin" placeholder={lang.banner.min} bsSize="sm" value={this.state.precioMin} onChange={this.handlePriceMinChange} style={{width: '82px'}}/>
                                    </FormGroup>
                                    <FormGroup className="mb-1 mr-sm-1 mb-sm-0">
                                        <Input type="number" name="number" id="precioMax" placeholder={lang.banner.max} bsSize="sm" value={this.state.precioMax} onChange={this.handlePriceMaxChange} style={{width: '82px'}}/>
                                    </FormGroup>
                                    {' '}
                                    <Button color="success" onClick={this.filtrar}>{lang.banner.filtrar}</Button>
                                </Form>
                                {'      '}
                                <NavLink href="#" onClick={this.verCarrito}><img src={carrito} width="40px" height="50px" alt="carrito" /></NavLink>
                                <NavLink href="#" onClick={this.salir}><img src={logout} width="40px" height="50px" alt="salir" /></NavLink>
                            </Nav>
                        }
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}