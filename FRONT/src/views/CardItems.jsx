import React from 'react';
import CardItem from './CardItem'
import api from "../api"

export default class CardItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.changeProduct = this.changeProduct.bind(this);
    this.checkChanges = this.checkChanges.bind(this);
  }

  changeProduct(id) {
    this.props.changeProduct(id)
  }

    componentWillMount() {
        if(!this.props.items) {
            api.getItemsPreferences()
                .then(res => {
                    this.setState({items: res.data})
                });
        } else {
            this.setState({items: this.props.items})
        }
    }

    checkChanges(){
        if(this.props.items) {
            if(this.props.items !== this.state.items) {
                this.setState({items: this.props.items, all: false})
            }
        } else {
            if(!this.state.all){
                api.getItems()
                    .then(res => {
                        if(res.data !== this.state.items) {
                            this.setState({items: res.data, all: true})
                        }
                    });
            }
        }
    }

  render() {
    this.checkChanges();
    return (
      <div className="text-center" >
        <br /><br /><br /> <br />
        {this.state.items.map((item, i) => {
          return <CardItem key={i} obj={item} changeProduct={this.changeProduct} reference={item.id} thumbnail={item.thumbnail} price={item.price} title={item.title} location={item.state_name} />
        })}
      </div>
    );
  }
}