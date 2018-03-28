import React from 'react';
import CardItem from './CardItem'
import api from "../api"

export default class CardItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
    this.changeProduct = this.changeProduct.bind(this);
  }

  changeProduct(id) {
    this.props.changeProduct(id)
  }

  componentWillMount() {
    api.getItems()
      .then(res => {
        this.setState({ items: res.data })
      });
  }

  render() {
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