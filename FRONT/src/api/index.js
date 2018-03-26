const axios = require('axios');
//axios.defaults.headers.post['Content-Type'] = 'application/json';
const API = "http://localhost:8080/";


export default {
    //login
    //401 unathoraized devuelve error: "usuario inexistente"/"contraseña incorrecta"
    //500 otro error
    //200 ok    //devuelve username, name lastname
    postLogin(user, password) {
        return axios.post(API + 'user/login', { username: user, password: password })
            .then(function (response) {
                console.log('response', response);
                sessionStorage.setItem('user', JSON.stringify(response.data));
                return [true]
            })
            .catch(err => {
                console.log('err', err);
                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    return [false, err.response.data]
                }
                return [false]
            })
    },
    //Crear Usuario
    postSingin(user, password, name, lastname, birthdate, email) {
        const body = {
            username: user,
            password: password,
            name: name,
            lastname: lastname,
            email: email,
            birthdate: birthdate,
            loyaltyPoints: "0"
        };
        console.log("body", body);
        return axios.post(API + 'user', body)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(err => {
                console.error(err);
                return [false, err.response.data]
            })
    },
    getCategories() {
        return axios.get(API + 'category')
            .then(r => {
                return r.data
            })
            .catch(err => {
                console.error(err);
                return false
            })
    },
    postPreferences(categories) {
        //return axios.post('/preferences', { user: this.getUser, categories: categories })
        return axios.post(API + 'preferences', { user: 'admin', categories: categories })
            .then(function (response) {
                return response
            })
            .catch(err => {
                console.error(err);
                return false
            })
    },
    //Pagina Principal
    getItems() {
        return axios.get(API + 'item')
            .then(r => {
                console.log(r);
                return r
            })
            .catch(err => {
                console.error(err);
                return false
            })
    },
    //cargar combo filtros
    //arreglo strings
    getLocations() {
        return Promise.resolve([{ name: 'Cordoba' }])
        // return axios.get(API + 'localidades')
        //     .then(r => {
        //         console.log(r);
        //         return r
        //     })
        //     .catch(err => {
        //         console.error(err);
        //         return false
        //     })
    },
    //get categorias ya esta arriba


    getUser() {
        return JSON.parse(sessionStorage.getItem('user')).username;
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
    quitarACarrito(idProducto) {
        let carrito = sessionStorage.getItem('carrito');
        if (carrito) {
            let aux = JSON.parse(carrito);
            const index = aux.indexOf(idProducto);
            if (index >= 0) {
                aux.splice(index, 1);
                sessionStorage.setItem('carrito', JSON.stringify(aux));
            }
        }
    },

    getCarrito() {
        return JSON.parse(sessionStorage.getItem('carrito'))
    },

    postCheckout() {
        return axios.post(API + '/checkout/save', { username: this.getUser(), items: this.getCarrito() })
            .then(function (response) {
                return response
            })
            .catch(err => {
                console.error(err);
                return false
            })
    },

    getComents() {
        return axios.get(API + 'comment')
            .then(r => {
                console.log(r);
                return r
            })
            .catch(err => {
                console.error(err);
                return false
            })
    },

    postComents(comment) {
        return axios.post(API + 'comment/save', { username: this.getUser(), comment: comment })
            .then(function (response) {
                return response
            })
            .catch(err => {
                console.error(err);
                return false
            })
    },
}

