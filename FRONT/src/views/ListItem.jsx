import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class ListItem extends React.Component {
    constructor() {
        super();
        this.state = {
            hover: false
        };
        this.toggleHover = this.toggleHover.bind(this);
        this.clicked = this.clicked.bind(this);
    }
    toggleHover() {
        this.setState({ hover: !this.state.hover })
    }
    clicked() {
        try {
            this.props.onSelected(this.props.reference);
        } catch (e) {
            this.props.changeProduct(this.props.reference)
        }
    }
    render() {
        let listItemStyle;
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
        };
        const detailsStyle = {
            width: "70%",
            display: "inline-block"
        };
        const titleStyle = {
            display: "inline-block",
            textOverflow: "ellipsis",
            fontSize: "18px",
            overflow: "hidden",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical"
        };
        const locationStyle = {
            color: "black"
        };

        return (
            <Container className="text-left" style={listItemStyle} onClick={this.clicked} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}>
                <Row>
                    <Col xs="3" style={thumbnailStyle}>
                        <img src={this.props.thumbnail} alt={"true"} />
                    </Col>
                    <Col xs="auto" style={detailsStyle}>
                        <p style={titleStyle} >{this.props.title}</p>
                        <p style={locationStyle} >{this.props.location}</p>
                        <h4 className="text-success" >${this.props.price}</h4>
                    </Col>
                </Row>
            </Container>

        );
    }
}