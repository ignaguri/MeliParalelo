import React from 'react';
import { Alert } from 'reactstrap';
import api from '../api'

class Banner extends React.Component {
    probando(){
        api.getCategories()
            .then(r => {
                console.log('desde el componente', r)
            })
    }
    render() {
        this.probando();
        return (
            <Alert color="success">
                Testeando un componente de bootstrap
            </Alert>
        );
    }
}
export default Banner;