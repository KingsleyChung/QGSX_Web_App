import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { Panel,FormGroup,FormControl,Button,Image,Modal } from 'react-bootstrap';
import { QuestionReply } from '../api/collection';
import ReplyContainer, { ReplyBlock} from '../components/ReplyBlock';
import AnswerReply from '../components/AnswerReply';
import {browserHistory} from 'react-router';
import MarkdownBlock from '../components/MarkdownBlock';

export class AnswerBlock extends Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            replyOpen: false,
            show: false,
            previewContent: '效果预览',
            showPreview: true,
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        // Find the text field via the React ref
        if (ReactDOM.findDOMNode(this.replyinput) != null) {
            const replyToAnswer = ReactDOM.findDOMNode(this.replyinput).value.trim();
            if (replyToAnswer.length == 0) {
                return;
            }
            ReactDOM.findDOMNode(this.replyinput).value = '';
            if (!Meteor.userId()) {
                browserHistory.push('/registerLogin');
            } else {
                Meteor.call('answerreply.insert', this.props.currentUser.username,this.props.answer.sponser,replyToAnswer,this.props.answer._id,this.props.answer.replys_count + 1);
                this.setState({show: false});
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

    renderReply() {
        return this.props.answer.replyContent.map((reply) => {
            console.log(reply.answer);
            console.log(this.props.answer._id);
            if (this.props.answer._id == reply.answer)
                return (
                    <AnswerReply
                        key = {reply._id}
                        reply = {reply}
                        currentUser = {this.props.currentUser}
                        answer = {this.props.answer}
                    />
                )
            else 
                return null;
        });
    }
    handleChange() {
        content = ReactDOM.findDOMNode(this.replyinput).value.trim();
        if (content == '') content = '效果预览';
        this.setState({previewContent: content});
    }
    togglePreview() {
        this.setState({showPreview: !this.state.showPreview});
    }
    render() {
        return (
            <div>
                <Paper className="container-fluid col-md-12 col-xs-12" style={{marginBottom: 20, paddingTop: 20}}>
                <div className="row container-fluid col-md-12 col-xs-12">
                    <div className="col-md-1 col-xs-2" style={{marginLeft: -15}}>
                        <Image className="image-responsive" src="/images/image.png" style={{width: 50, height:50}} circle/>
                    </div>
                    <div className="col-md-11 col-xs-10 container-fluid">
                        <div className="row">{this.props.answer.sponser}</div>
                        <div className="row"><small>{new moment(this.props.answer.date).format("YYYY-MM-DD")}</small></div>
                    </div>
                </div>
                <div className="row col-md-12 col-xs-12" style={{marginTop: 20, marginBottom: 20}}><MarkdownBlock content={this.props.answer.content}/></div>
                <div className="row col-md-12 col-xs-12" style={{display: "flex", justifyContent: "flex-start", marginBottom: 20}}>
                    <div style={{marginRight: 20}}>
                        <i className="far fa-thumbs-up"></i> {this.props.answer.like_count}
                    </div>
                    <div style={{marginRight: 20}}>
                        <i className="far fa-thumbs-down"></i> {this.props.answer.dislike_count}
                    </div>
                    <div style={{marginRight: 20}}>
                        <i className="fas fa-comments"></i> {this.props.answer.replys_count}
                    </div>
                </div>
                <div className="col-md-2 col-xs-6">
                    <Button onClick={this.handleShow}> <i className="far fa-comments"  style={{ marginRight: 10, color:"#777"}}></i>回复</Button>
                </div>
                {/* <div className="col-md-6 col-xs-6" style={{display: "flex", justifyContent: "flex-end"}}>
                    <div>评论量 | {this.props.answer.replys.length}</div>
                </div> */}
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header >
                    <Modal.Body className="container-fluid row">
                        <form onSubmit={this.handleSubmit.bind(this)} className="container-fluid col-md-12 col-xs-12">
                            <FormGroup className="container-fluid col-md-12 col-xs-12" controlId="formBasicText">
                                <FormControl
                                    componentClass="textarea"
                                    placeholder="评论回答" 
                                    inputRef={ref => { this.replyinput = ref; }}
                                    style={{width: "100%", height: 100, borderRadius:10}}
                                    className="col-md-12 col-xs-12 row"
                                    onChange={this.handleChange.bind(this)}
                                />
                                {this.state.showPreview && 
                                    <div className="row col-md-12 col-xs-12"><MarkdownBlock content={this.state.previewContent}/></div>
                                }
                                <Button type="submit" className="col-md-3 col-xs-6">提交</Button>
                                    <div className="col-md-9 col-xs-6" style={{display: "flex", justifyContent: "flex-end"}}>
                                        <a onClick={this.togglePreview.bind(this)}>{this.state.showPreview ? '隐藏预览' : '显示预览'}</a>
                                    </div>
                            </FormGroup>
                        </form>
                    </Modal.Body>
                </Modal>
                
                <div className="col-md-12 col-xs-12" style={{marginTop: 20, marginBottom: 20, paddingLeft: 10, paddingBottom: 10, border: "2px solid #ccc", borderWidth: "0 0 0 2px"}}>
                    {this.renderReply()}
                </div>
            </Paper>   
          </div>
        )
    }
}

export default AnswerContainer = withTracker(({answer}) => {
    const ReplyHandle = Meteor.subscribe('QuestionReply',answer._id);
    answer.replyContent = [];
    allreply = QuestionReply.find().fetch();
    that = answer.replyContent;
    if (ReplyHandle.ready()) {
        allreply.map((reply) => {
            that.push(reply);
        })
    }
    return {
        answer: answer,
        currentUser:Meteor.user(),
    }
})(AnswerBlock);
