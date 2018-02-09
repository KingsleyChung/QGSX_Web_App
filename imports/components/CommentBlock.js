import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import { Image, Badge,Panel,Button, FormGroup,FormControl,Modal} from 'react-bootstrap';
import { Article, Comment ,Reply,User} from '../api/collection';
import {browserHistory} from 'react-router';
import ArticleReply from './ArticleReply.js';
import MarkdownBlock from '../components/MarkdownBlock';

export default class CommentBlock extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            open: false,
            replyopen:false,
            show: false,
            previewContent: '效果预览',
            showPreview: true,
        };
    }
    
    handleSubmit(id, user,currentUser,e) {
        e.preventDefault();
        // Find the text field via the React ref
        if (ReactDOM.findDOMNode(this.commentinput) != null) {
            const replyToComment = ReactDOM.findDOMNode(this.commentinput).value.trim();
            if (replyToComment.length == 0) {
                return;
            }
            ReactDOM.findDOMNode(this.commentinput).value = '';
            if (!Meteor.userId()) {
                browserHistory.push('/registerLogin');
            } else {
                Meteor.call('reply.insert', replyToComment, currentUser.username, user, this.props.article.title, id);
                this.handleClose();
            }
        }
    }

    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        if (!Meteor.userId()) {
            browserHistory.push('/registerLogin');
        } else {
            this.setState({ show: true });
        }
    }

    addCommentLike() {
        if (!Meteor.user()) {
            browserHistory.push('/registerLogin');
        }
        else {
            console.log("比较是否已经点赞了该文章评论");
            console.log(this.props.comment._id);
            const userLikeComment = User.find().fetch()[0].like_comment;
            const like_count = User.find().fetch()[0].like_comment_count + 1;
            for (i = 0; i < userLikeComment.length; ++i) {
                console.log(userLikeComment[i]);
                if (userLikeComment[i].toString() == this.props.comment._id.toString())
                    return;
            }
            Meteor.call('comment.addlike', this.props.comment._id, this.props.comment.like_count + 1);
            Meteor.call('user.updatelikecomment', this.props.currentUser.username, this.props.comment._id,like_count);
        }            
    }
        
    renderReply(commentId) {
        const allReply = Reply.find({comment: commentId}).fetch();
        return allReply.map((reply) => {
            return (
                <ArticleReply
                    key = {reply._id}
                    reply = {reply}
                    commentId = {commentId}
                    article = {this.props.article}
                    currentUser = {this.props.currentUser} 
                />
            )
        });
    }
    
    handleChange() {
        content = ReactDOM.findDOMNode(this.commentinput).value.trim();
        if (content == '') content = '效果预览';
        this.setState({previewContent: content});
    }

    togglePreview() {
        this.setState({showPreview: !this.state.showPreview});
    }

    render() {
        return (
            <Paper key={this.props.comment._id} className="container-fluid col-md-12 col-xs-12" style={{marginBottom: 20, paddingTop: 20}}>
                <div className="row container-fluid col-md-12 col-xs-12" style={{display: 'flex', alignItems:'center'}}>
                    <div className="col-md-1 col-xs-2" style={{marginLeft: -15, display: 'flex', alignItems:'center', justifyContent: 'center'}}>
                        <Image className="image-responsive" src={this.props.article.cover_image} style={{width: 50, height:50}} circle/>
                    </div>
                    <div className="col-md-11 col-xs-10 container-fluid">
                        <div className="row" >{this.props.comment.user}</div>
                        <div className="row" ><small style={{color:'#777'}}>{new moment(this.props.comment.date).format("YYYY-MM-DD")}</small></div>
                    </div>
                </div>
                <div className="row col-md-12 col-xs-12" style={{marginTop: 20, marginBottom: 20}}><MarkdownBlock content={this.props.comment.content}/></div>
                <Button onClick={this.addCommentLike.bind(this)} style={{ marginRight: 15}}> 
                     <i className="far fa-smile"  style={{ marginRight: 10, color:"#777"}}></i>
                     点赞数 | {this.props.comment.like_count}</Button>
                <Button onClick={this.handleShow}> <i className="far fa-comments"  style={{ marginRight: 10, color:"#777"}}></i>回复</Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header >
                    <Modal.Body className="container-fluid row">
                        <form onSubmit={this.handleSubmit.bind(this,this.props.comment._id, this.props.comment.user, this.props.currentUser)} className="container-fluid col-md-12 col-xs-12">
                            <FormGroup className="container-fluid col-md-12 col-xs-12" controlId="commentsubmit">
                                <FormControl
                                    componentClass="textarea"
                                    placeholder="发表评论" 
                                    inputRef={ref => { this.commentinput = ref; }}
                                    style={{width: "100%", height: 100, borderRadius:10}}
                                    className="col-md-12 col-xs-12 row"
                                    onChange={this.handleChange.bind(this)}
                                />
                                {this.state.showPreview && 
                                    <div className="row col-md-12 col-xs-12"><MarkdownBlock content={this.state.previewContent}/></div>
                                }
                                <Button type="submit" className="col-md-3 col-xs-6">发表</Button>
                                <div className="col-md-9 col-xs-6" style={{display: "flex", justifyContent: "flex-end"}}>
                                    <a onClick={this.togglePreview.bind(this)}>{this.state.showPreview ? '隐藏预览' : '显示预览'}</a>
                                </div>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                </Modal>
                <div className="col-md-12 col-xs-12" style={{marginTop: 20, marginBottom: 20, paddingLeft: 20, border: "2px solid #ccc", borderWidth: "0 0 0 2px"}}>
                    {this.renderReply(this.props.comment._id)}
                </div>
            </Paper>
        )
    }
}