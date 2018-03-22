const axios = require('axios');
//axios.defaults.headers.post['Content-Type'] = 'application/json';
const API = "https://api.mercadolibre.com/";


export default {
    getCategories() {
        return axios.get(API + 'sites/MLA/categories')
            .then(r => {
                console.log(r);
                return r
            })
            .catch(err => {
                console.error(err);
                return false
            })
    }
}