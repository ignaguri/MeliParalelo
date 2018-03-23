//const axios = require('axios');
//axios.defaults.headers.post['Content-Type'] = 'application/json';
//const API = "https://api.mercadolibre.com/";

export default {
    getLocations() {
        return Promise.resolve([{nombre: 'Cordoba'}])
    },
    agregarACarrito(producto, cantidad) {
        const prod = {
            id: producto.id,
            title: producto.title,
            price: producto.price,
            quantity: cantidad
        };
        let carrito = sessionStorage.getItem('carrito');
        if (carrito) {
            let aux = JSON.parse(carrito);
            aux.push(prod);
            sessionStorage.setItem('carrito', JSON.stringify(aux));
        } else {
            let aux = JSON.stringify([prod]);
            sessionStorage.setItem('carrito', aux);
        }
    },
    getCarrito() {
        return JSON.parse(sessionStorage.getItem('carrito'))
    }
}