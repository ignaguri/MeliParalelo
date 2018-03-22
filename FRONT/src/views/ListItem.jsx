import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';

export default class ListItem extends React.Component {
    constructor() {
        super();
        this.state = { 
            hover: false
        }
        this.toggleHover = this.toggleHover.bind(this)
    }
    toggleHover() {
        this.setState({hover: !this.state.hover})
    }
    
    render() {
    var listItemStyle;
    if (this.state.hover) {
        listItemStyle = {
            width: "100%",
            background: "#fff",
            borderRadius: "2px",
            display: "inline-block",
            margin: "5px",
            position: "relative",
            boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 5px 2px rgba(0,0,0,0.22)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)"
        }
    } else {
        listItemStyle = {
            width: "100%",
            background: "#fff",
            borderRadius: "2px",
            display: "inline-block",
            margin: "5px",
            position: "relative",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
        }
    }
    const thumbnailStyle = {
        width: "30%",
        display: "inline-block"
    }
    const detailsStyle = {
        width: "70%",
        display: "inline-block"
    }
    const tittleStyle = {
        display: "inline-block",
        textOverflow: "ellipsis",
        fontSize: "18px",
        overflow: "hidden",
        WebkitLineClamp: "2",
        WebkitBoxOrient: "vertical"
    }
    const locationStyle = {
        color: "black"
    }
    var reference = this.props.reference;
    function testing() {
        // go to another page passing the link reference
        console.log(reference)
    }

    return (
        <Container style={ listItemStyle } onClick={ testing } onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
            <Row>
                <Col xs="3" style={ thumbnailStyle }>
                    <img src ={ this.props.thumbnail } alt={ "true" } />
                </Col>
                <Col xs="auto" style={ detailsStyle }>
                    <p style={ tittleStyle } >{ this.props.tittle }</p>
                    <p style={ locationStyle } >{ this.props.location }</p>
                    <h4 className="text-success" >${this.props.price}</h4>
                </Col>
            </Row>
        </Container>

    );
  }
}