import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

export default class CardItem extends React.Component {
    constructor() {
        super();
        this.state = { 
            hover: false
        }
        this.clicked = this.clicked.bind(this)
        this.toggleHover = this.toggleHover.bind(this)
    }

    clicked() {
        this.props.changeProduct(this.props.reference)
        console.log(this.props.reference);
    }

    toggleHover() {
        this.setState({hover: !this.state.hover})
    }
    
    render() {
    var listItemStyle;
    if (this.state.hover) {
        listItemStyle = {
            height: "400px",
            background: "#fff",
            borderRadius: "2px",
            display: "inline-flex",
            margin: "5px",
            position: "relative",
            boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 5px 2px rgba(0,0,0,0.22)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)"
        }
    } else {
        listItemStyle = {
            height: "400px",
            background: "#fff",
            borderRadius: "2px",
            display: "inline-flex",
            margin: "5px",
            position: "relative",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        }
    }
    const thumbnailStyle = {
        padding: "40px",
        width: "100%",
        minHeight: "250px"
    }
    const detailsStyle = {
        width: "250px",
        display: "inline-block"
    }
    const titleStyle = {
        overflow: "hidden",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        fontSize: "18px"
    }
    const locationStyle = {
        color: "black"
    }
    const priceStyle = {
        color: "#39b54a",
        fontSize: "22px"
    }

    return (
        <Card style={ listItemStyle } onClick={ this.clicked } onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
            <CardImg top width="100%" src={ this.props.thumbnail } alt="Card image cap" style={ thumbnailStyle } />
            <CardBody style={ detailsStyle }>
                <CardTitle style={ titleStyle }>{ this.props.title }</CardTitle>
                <CardSubtitle style={ locationStyle }>{ this.props.location }</CardSubtitle>
                <CardText style={ priceStyle }>${ this.props.price }</CardText>
            </CardBody>
        </Card>
    );
  }
}