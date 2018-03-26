import React from 'react';

export default class CommentBox extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <div className="commentBox" >
                <p className="userComment" >{this.props.user}</p>
                <p className="comment" >{this.props.comment}</p>
            </div>
        );
    }
}