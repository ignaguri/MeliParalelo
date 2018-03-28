import React from 'react';
import Banner from './Banner'
import CarouselDisplay from './CarouselDisplay'
import ListItems from './ListItems'
import CardItems from './CardItems'
import ChatSlide from './ChatSlide'
import SignIn from './SignIn'
import Login from './Login'
import Landing from './Landing'
import Preferences from './Preferences'
import ShoppingCart from './ShoppingCart'
import Producto from './Producto'
import Dashboard from './Dashboard'
import api from '../api'

export default class OurContainer extends React.Component {
    constructor() {
        super();
        this.selectedLang = this.selectedLang.bind(this);
        this.state = {
            displayType: "shoppingCart",
            language: 'spanish',
            product: {
                id: "MLA614976100",
                title: "Kit De Seguridad Para Auto 9 En 1 Tarjeta Patente Vtv Neokit",
                price: 436.5,
                original_price: 485.0,
                initial_quantity: 14574,
                available_quantity: 9250,
                sold_quantity: 5324,
                condition_item: "new",
                thumbnail: "http://mla-s1-p.mlstatic.com/684069-MLA26895991656_022018-I.jpg",
                category_id: "MLA5725",
                state_name: "Capital Federal",
                accepts_mercadopago: true,
                qualification: 5,
                description: "MATAFUEGOS ONLINE UNA UNIDAD DE EVER SAFE\n\n100% CALIFICACIONES POSITIVAS CON MÁS DE 85MIL VENTAS CONCRETADAS, SOMOS MERCADOLIDER PLATINUM Y LIDERES EN EL SECTOR\n_______________________________________________________________________\n\nKIT REGLAMENTARIO PARA AUTOS 9 EN 1 CON TARJETA PATENTE NEOKIT\n\nKit de seguridad para automotor de 9 elementos esenciales, apto para la VTV o circular por todo el territorio nacional. \n\nCARACTERÍSTICAS:\n• MATAFUEGO 1 KG RECONDICIONADO: Cargado con fecha de vencimiento a un año, cumple con normas IRAM y todas las exigencias legales, incluye soporte de plástico para fijarlo al auto, garantía de 1 año de la carga y 2 años por las partes mecánicas. \n\n• JUEGO DE 2 BALIZAS REGLAMENTARIAS: Balizas triangulares reglamentaria.\n\n• CHALECO REFLECTIVO REGLAMENTARIO: Puede elegir entre el color verde o naranja.\n\n• BOTIQUÍN DE PRIMEROS AUXILIOS: Estuche con elementos aprobados por ANMAT, no contiene comprimidos por no estar permitido. Imagen ilustrativa. \n\n• CUARTA REMOLQUE REGLAMENTARIA: Cuarta telescópica para remolque hasta 2 tn.\n\n• PAR DE GUANTES MOTEADOS: Guantes de algodón con motas, importantes para mantener el higiene, evitar cortes y quemaduras ante una emergencia mecánica.\n\n• MANTA MORTUORIA MULTIUSO OBLIGATORIA: Manta blanca multiuso, filtra los rayos UV que impide el paso del polvo. (Obligatoria en algunas provincias por disposiciones locales, Santa Fe, Córdoba y Entre Ríos). \n\n• PAÑO PARA AUTO: Útil para limpiar, quitar el polvo y secar la humedad del auto. El color puede variar por stock. \n\n• BOLSO ORGANIZADOR DE TELA: Cierre y manija de transporte, el color puede variar según disponible. Todos los elementos del kit caben en el bolso. Logo personalizable en compras mayoristas.\n\n_______________________________________________________________________\n\n\nFORMAS DE PAGO:\n• MERCADO PAGO (TODOS LOS MEDIOS DE PAGO)\n• EMITIMOS FACTURA A Y B\n\nCompra seguro en nuestro local ubicado en el Barrio San Cristóbal de Lunes a Viernes de 9 a 17 hs y Sábados de 9 a 14 hs., cerca de Av. San Juan y Jujuy y cerca del Hospital de Ojos Santa Lucia.\n\nTransportes que te dejan:\n- COLECTIVOS: 4, 6, 12, 37, 50, 53, 61, 62, 84, 86, 91, 95, 96, 97, 118, 126, 129, 133, 143, 150, 151, 168, 188, 195.\n- SUBTE: Línea E (Estación Pichincha), Línea H (Estación Humberto 1°).\n- AUTO: Autopista 25 de Mayo (Bajada Entre Ríos, Bajada Jujuy).",
                pictures: ["http://mla-s1-p.mlstatic.com/275715-MLA25300331694_012017-O.jpg", "http://mla-s1-p.mlstatic.com/760862-MLA26895969481_022018-O.jpg", "http://mla-s1-p.mlstatic.com/132111-MLA20475609206_112015-O.jpg", "http://mla-s1-p.mlstatic.com/287511-MLA20590108775_022016-O.jpg", "http://mla-s1-p.mlstatic.com/593815-MLA25300329353_012017-O.jpg", "http://mla-s1-p.mlstatic.com/684069-MLA26895991656_022018-O.jpg"]
            }
        }
        this.onGo = this.onGo.bind(this);
        this.getProduct = this.getProduct.bind(this);
    }

    onGo(componente) {
        this.setState({ displayType: componente })
    }

    getProduct(id) {
        api.getProduct(id)
            .then(r => {
                if (r) {
                    this.setState({ product: r, displayType: "producto" })
                } else {
                    alert('Error filtrando')
                }
            })
    }

    selectedLang(lang) {
        this.setState({ language: lang })
    }

    render() {
        switch (this.state.displayType) {
            case "list":
                return (
                    <div>
                        <Banner go={this.onGo} language={this.state.language} />
                        <div style={{ textAlign: "left" }}>
                            <ChatSlide language={this.state.language} />
                            <ListItems language={this.state.language} />
                        </div>
                    </div>
                );
            case "card":
                return (
                    <div>
                        <Banner go={this.onGo} language={this.state.language} />
                        <div style={{ textAlign: "left" }}>
                            <ChatSlide language={this.state.language} />
                            <CardItems language={this.state.language} getProduct={this.getProduct} />
                        </div>
                    </div>
                );
            case "carousel":
                return (
                    <div>
                        <Banner go={this.onGo} language={this.state.language} />
                        <div style={{ textAlign: "left" }}>
                            <ChatSlide language={this.state.language} />
                            <CarouselDisplay language={this.state.language} />
                        </div>
                    </div>
                );
            case "login":
                return (
                    <div>
                        <div style={{ textAlign: "left" }}>
                            <Login go={this.onGo} language={this.state.language} />
                        </div>
                    </div>
                );
            case "landing":
                return (
                    <div>
                        <Landing go={this.onGo} langChange={this.selectedLang} />
                    </div>
                );
            case "preferences":
                return (
                    <div>
                        <div style={{ textAlign: "left" }}>
                            <ChatSlide language={this.state.language} />
                            <Preferences go={this.onGo} language={this.state.language} />
                        </div>
                    </div>
                );
            case "producto":
                return (
                    <div>
                        <Banner go={this.onGo} language={this.state.language} />
                        <br /><br /><br /> <br />
                        <div style={{ textAlign: "left" }}>
                            <ChatSlide language={this.state.language} />
                            <Producto producto={this.state.product} language={this.state.language} />
                        </div>
                    </div>
                );
            case "registration":
                return (
                    <div>
                        <div style={{ textAlign: "left" }}>
                            <SignIn go={this.onGo} language={this.state.language} />
                        </div>
                    </div>
                );
            case "dashboard":
                return (
                    <div>
                        <Banner language={this.state.language} isDashboard />
                        <br /><br /><br /><br />
                        <Dashboard language={this.state.language} />
                    </div>
                );
            case "shoppingCart":
                return (
                    <div>
                        <ShoppingCart go={this.onGo} language={this.state.language} />
                    </div>
                );
            default:
                break;
        }
    }
}