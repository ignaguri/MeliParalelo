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
        <ListGroupItem disabled tag="a" href="#" style={{ backgroundColor: "#dfd", width: "80%" }}>
          {this.state.items.map((item, i) => {

            return <ListItem key={i} obj={item} reference={"https://google.com.ar/" + i} thumbnail={item.thumbnail} price={item.price} title={item.title} location={item.state_name} />

          })}
        </ListGroupItem>
      </ListGroup>
    );
  }
}