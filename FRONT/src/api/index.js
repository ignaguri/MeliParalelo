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
        return axios.post('/singin', { username: user, password: password, name: name, lastname: lastname, birthdate: birthdate, email: email })
            .then(function (response) {
                return response
            })
            .catch(err => {
                console.error(err);
                return false
            })
    },

    getCategories() {
        return axios.get(API + 'categories')
            .then(r => {
                return r.data
            })
            .catch(err => {
                console.error(err);
                return false
            })
    },

    postPreferences(categories) {
        return axios.post('/preferences', { cateegories: categories })
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
        return axios.get(API + 'items')
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
        return axios.get(API + 'localidades')
            .then(r => {
                console.log(r);
                return r
            })
            .catch(err => {
                console.error(err);
                return false
            })
    },

    //get categorias ya esta arriba













}

