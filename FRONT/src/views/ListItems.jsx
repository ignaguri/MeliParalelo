import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import ListItem from './ListItem'
import api from "../api"

export default class ListItems extends React.Component {
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
      <ListGroup>
        <ListGroupItem disabled tag="a" href="#" className="marginBanner" >
          {this.state.items.map((item, i) => {
            return <ListItem key={i} obj={item} changeProduct={this.changeProduct} reference={item.id} thumbnail={item.thumbnail} price={item.price} title={item.title} location={item.state_name} />
          })}
        </ListGroupItem>
      </ListGroup>
    );
  }
}