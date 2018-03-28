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
import Producto from './Producto'
import Dashboard from './Dashboard'
import Carrito from './ShoppingCart'
import api from '../api'

export default class OurContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            displayType: "landing",
            language: 'spanish',
            productId: "MLA627579355",
            product: null,
            filtered: null
        };
        this.onGo = this.onGo.bind(this);
        this.changeProduct = this.changeProduct.bind(this);
        this.getProduct = this.getProduct.bind(this);
        this.selectedLang = this.selectedLang.bind(this);
        this.pushItems = this.pushItems.bind(this);
    }
    componentDidMount() {
        let logged = api.isLoggedIn();
        if (logged) {
            logged = JSON.parse(logged);
            if(logged.role === 'admin') {
                this.setState({displayType: 'dashboard'})
            } else {
                this.setState({displayType: 'list'})
            }
        }
    }
    onGo(componente) {
        this.setState({ displayType: componente })
    }

    changeProduct(id) {
        this.setState({ productId: id }, function () {
            this.getProduct()
        })
    }

    getProduct() {
        api.getItem(this.state.productId)
            .then(r => {
                if (r) {
                    this.setState({ product: r, displayType: "producto" })
                } else {
                }
            })
    }
    pushItems(items) {
        this.setState({ filtered: items })
    }

    selectedLang(lang) {
        this.setState({ language: lang })
    }

    render() {
        switch (this.state.displayType) {
            case "list":
                return (
                    <div>
                        <Banner go={this.onGo} language={this.state.language} filtered={this.pushItems}/>
                        <div style={{ textAlign: "left" }}>
                            <ChatSlide language={this.state.language}/>
                            <ListItems changeProduct={this.changeProduct} language={this.state.language} items={this.state.filtered}/>
                        </div>
                    </div>
                );
            case "card":
                return (
                    <div>
                        <Banner go={this.onGo} language={this.state.language} filtered={this.pushItems}/>
                        <div style={{ textAlign: "left" }}>
                            <ChatSlide language={this.state.language} />
                            <CardItems changeProduct={this.changeProduct} language={this.state.language} getProduct={this.getProduct} items={this.state.filtered}/>
                        </div>
                    </div>
                );
            case "carousel":
                return (
                    <div>
                        <Banner go={this.onGo} language={this.state.language} filtered={this.pushItems}/>
                        <div style={{ textAlign: "left" }}>
                            <ChatSlide language={this.state.language} />
                            <CarouselDisplay changeProduct={this.changeProduct} language={this.state.language} items={this.state.filtered}/>
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
                        <Banner go={this.onGo} language={this.state.language} filtered={this.pushItems}/>
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
                        <Banner go={this.onGo} language={this.state.language} isDashboard />
                        <br /><br /><br /><br />
                        <Dashboard language={this.state.language} />
                    </div>
                );
            case "carrito":
                return (
                    <div>
                        <Banner go={this.onGo} language={this.state.language} filtered={this.pushItems}/>
                        <br /><br /><br /><br />
                        <Carrito go={this.onGo} language={this.state.language} />
                    </div>
                );
            default:
                break;
        }
    }
}