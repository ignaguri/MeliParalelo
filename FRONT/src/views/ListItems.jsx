import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import ListItem from './ListItem'
import api from "../api"

export default class ListItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        all: true
    };
    this.changeProduct = this.changeProduct.bind(this);
    this.checkChanges = this.checkChanges.bind(this);
  }

  changeProduct(id) {
    this.props.changeProduct(id)
  }

  componentWillMount() {
    if(!this.props.items) {
        api.getItems()
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