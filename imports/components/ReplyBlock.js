import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export class ReplyBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replyOpen: false,
        }
    }
    renderReplys() {
        return this.props.replys.map((reply, index) => {
            return (
                <ListGroupItem key={index}>
                    {reply.from}:@{reply.to}   {reply.content}
                </ListGroupItem>
            )
        });
    }
    render() {
        return (
            <div>
                <ListGroup>
                    {this.renderReplys()}
                </ListGroup>
            </div>
        )
    }
}

export default ReplyContainer = withTracker(({replys}) => {
    return {
        replys: replys,
    }
})(ReplyBlock);