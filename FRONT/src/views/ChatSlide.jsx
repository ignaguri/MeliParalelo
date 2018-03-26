import React from 'react';
import CommentBox from './CommentBox'
import InputComment from './InputComment'
import api from "../api"

export default class OurContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            isToggleOn: false,
            currentClass: "slide-out",
            comments: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.loadComments = this.loadComments.bind(this);
    }

    changeState() {
        this.setState({ isToggleOn: !this.state.isToggleOn })
    }

    handleClick() {
        if (this.state.isToggleOn === true) {
            this.changeState()
            this.setState({
                currentClass: "slide-out"
            });
        } else {
            this.changeState()
            this.setState({
                currentClass: "slide-in"
            });
        }
    }

    componentWillMount() {
        this.loadComments();
    }

    loadComments() {
        api.getComments()
            .then(res => {
                this.setState({ comments: res.data })
            });
    }

    render() {

        return (
            <div>
                <div id="slider" className={this.state.currentClass} style={{ zIndex: "102", right: "0px", bottom: "0px", position: "fixed" }}>
                    <div style={{ margin: "10px" }} >
                        {this.state.comments ? this.state.comments.map((comment, i) => <CommentBox key={i} obj={comment} user={comment.username} comment={comment.comment} />) : <div></div>}
                    </div>
                    <InputComment loadComments={this.loadComments} />
                </div>
                <div id="toggle" className="chatButton" onClick={this.handleClick}></div>
            </div>
        );
    }
}