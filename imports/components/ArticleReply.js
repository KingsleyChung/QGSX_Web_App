import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import { Image, Badge,Panel,Button, FormGroup,FormControl,Modal} from 'react-bootstrap';
import { Article, Comment ,Reply,User} from '../api/collection';
import {browserHistory} from 'react-router';
import MarkdownBlock from '../components/MarkdownBlock';
import FlatButton from 'material-ui/FlatButton';

export default class ArticleReply extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            replyopen: false,
            replyState: "hidden",
            show: false,
            previewContent: '效果预览',
            showPreview: true,
        };
    }
    
    handleSubmit(id, user,currentUser,e) {
        e.preventDefault();
        // Find the text field via the React ref
        if (ReactDOM.findDOMNode(this.replycommentinput) != null) {
            const replyToComment = ReactDOM.findDOMNode(this.replycommentinput).value.trim();
            console.log("feiwu");
            console.log(ReactDOM.findDOMNode(this.replycommentinput));
            if (replyToComment.length == 0) {
                console.log("youkong")
                return;
            }
            ReactDOM.findDOMNode(this.replycommentinput).value = '';
            if (!Meteor.userId()) {
                browserHistory.push('/registerLogin');
            } else {
                Meteor.call('reply.insert', replyToComment, currentUser.username, user, this.props.article.title, id);
                this.setState({show: false})
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

    handleMouseEnter() {
        this.setState({replyState: "visible"});
    }

    handleMouseLeave() {
        this.setState({replyState: "hidden"});
    }

    handleChange() {
        content = ReactDOM.findDOMNode(this.replycommentinput).value.trim();
        if (content == '') content = '效果预览';
        this.setState({previewContent: content});
    }

    togglePreview() {
        this.setState({showPreview: !this.state.showPreview});
    }

    render() {
        return (
            // <div className="row" key={this.props.reply._id}>
            //     <div className="col-md-10 col-xs-9" style={{marginTop: 7, marginBottom: 7}}> <MarkdownBlock content={this.props.reply.from + '回复' + this.props.reply.to + ': ' + this.props.reply.content} /></div>
            //     <Button className="col-md-2 col-xs-3" bsSize="small" onClick={this.handleShow}>回复</Button>
                
            <div className="row" key={this.props.reply._id}>
                <div className="col-md-12 col-xs-12 row" style={{marginLeft: 4}} onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)}>
                    <div className="col-md-11 col-xs-10" style={{marginTop: 7, marginBottom: 7}}><MarkdownBlock content={this.props.reply.from + '回复' + this.props.reply.to + ': ' + this.props.reply.content} /></div>
                    <div className="col-md-1 col-xs-2">
                        <FlatButton label="回复" onClick={this.handleShow} style={{color: "rgb(99,175,131)", visibility: this.state.replyState}} />
                    </div>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header >
                    {/* <Modal.Body>
                        <form onSubmit={this.handleSubmit.bind(this,this.props.commentId, this.props.reply.from, this.props.currentUser)}>
                            <FormGroup controlId="replycommentsubmit">
                                <FormControl 
                                    type="text" 
                                    placeholder="发表评论" 
                                    inputRef={ref => { this.replycommentinput = ref; }}
                                />
                                <Button type="submit">发表</Button>
                            </FormGroup>
                        </form>
                    </Modal.Body> */}
                    <Modal.Body className="container-fluid row">
                        <form onSubmit={this.handleSubmit.bind(this,this.props.commentId, this.props.reply.from, this.props.currentUser)} className="container-fluid col-md-12 col-xs-12">
                            <FormGroup className="container-fluid col-md-12 col-xs-12" controlId="replycommentsubmit">
                                <FormControl
                                    componentClass="textarea"
                                    placeholder="发表评论" 
                                    inputRef={ref => { this.replycommentinput = ref; }}
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
                <Divider className="col-md-12 col-xs-12"/>
            </div>
        )
    }
}