const axios = require('axios');
const API = "http://localhost:8080/";


export default {
    //login
    //401 unathoraized devuelve error: "usuario inexistente"/"contraseña incorrecta"
    //500 otro error
    //200 ok    //devuelve username, name lastname
    postLogin(user, password) {
        return axios.post(API + 'user/login', { username: user, password: password })
            .then(function (response) {
                sessionStorage.setItem('user', JSON.stringify(response.data));
                const rol = response.data.role;
                return [true, rol]
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
    postSignin(user, password, name, lastname, birthdate, email) {
        const body = {
            username: user,
            password: password,
            name: name,
            lastname: lastname,
            email: email,
            birthdate: birthdate,
            loyaltyPoints: "0"
        };
        return axios.post(API + 'user', body)
            .then(function (response) {
                const user = {
                    username: response.data.created.username,
                    role: 'user'
                };
                sessionStorage.setItem('user', JSON.stringify(user));
                return [response.data]
            })
            .catch(err => {
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
        const user = this.getUser();
        return axios.post(API + 'user/preferences', { username: user, preferences: categories })
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
    getItem(id) {
        const user = this.getUser();
        return axios.get(API + 'item/show/' + id + '?username=' + user)
            .then(r => {
                return r.data
            })
            .catch(err => {
                console.error(err);
                return false
            })
    },
    getItemsById(items) {
        const user = this.getUser();
        let promesas = [];
        items.forEach(i => {
            promesas.push(axios.get(API + 'item/show/' + i + '?username=' + user)
                .then(r => {
                    return r.data
                })
                .catch(err => {
                    console.error(err);
                    return false
                })
            )
        });
        return Promise.all(promesas)
            .then(r => {
                return r;
            })
            .catch(err => {
                console.error(err);
                return false
            })
    },
    getItemsWithFilter(categoryId, condition, price_min, price_max, statename) {
        const condicion = condition? '&condition=' + condition : '';
        const min = price_min? '&price_min=' + price_min : '';
        const max = price_max? '&price_max=' + price_max : '';
        const location = statename? '&statename=' + statename : '';
        return axios.get(API + 'item/filter?category=' + categoryId + condicion + min + max + location)
            .then(r => {
                return r.data
            })
            .catch(err => {
                console.error(err);
                return false
            })
    },
    getItemsPreferences() {
        return axios.get(API + 'item/preferences?username=' + this.getUser())
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
        //return Promise.resolve([{ name: 'Buenos Aires' }, { name: 'Capital Federal' }])
        return axios.get(API + '/item/locations')
            .then(r => {
                console.log(r);
                return r.data
            })
            .catch(err => {
                console.error(err);
                return false
            })
    },
    getUser() {
        return JSON.parse(sessionStorage.getItem('user')).username;
    },
    isLoggedIn() {
        return sessionStorage.getItem('user');
    },
    logout() {
        sessionStorage.removeItem('user');
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
        let aux = JSON.parse(carrito);
        if (carrito) {
            for (let index = 0; index < aux.length; index++) {
                const element = aux[index];
                if (element.id === idProducto) {
                    aux.splice(index, 1);
                    sessionStorage.setItem('carrito', JSON.stringify(aux));
                    break;
                }
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
    getComments() {
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
    postComment(comment) {
        return axios.post(API + 'comment/save', { username: this.getUser(), comment: comment })
            .then(function (response) {
                return response
            })
            .catch(err => {
                console.error(err);
                return false
            })
    },
    getStats() {
        const user = this.getUser();
        return axios.get(API + 'visit/generateStatistics?username=' + user)
            .then(r => {
                return r.data
            })
            .catch(err => {
                console.error(err);
                return false
            })
    }
}

