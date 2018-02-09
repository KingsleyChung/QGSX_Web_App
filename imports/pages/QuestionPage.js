import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button, Modal } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import MarkdownBlock from '../components/MarkdownBlock';
import { Question } from '../api/collection';
import QuestionList from '../components/QuestionList';

// App component - represents the whole app
class QuestionPage extends Component {   
    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
            previewContent: '效果预览',
            showPreview: true,
        };
    }
    
    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow() {
        this.setState({ show: true });
    }

    handleSubmit(event) {
        event.preventDefault();
    
        // Find the text field via the React ref
        const title = ReactDOM.findDOMNode(this.questiontitle).value.trim();
        const description = ReactDOM.findDOMNode(this.questiontdescription).value.trim();
        if (title == '') {
            return;
        }
    
        ReactDOM.findDOMNode(this.questiontitle).value = '';
        ReactDOM.findDOMNode(this.questiontdescription).value = '';
        if (!Meteor.userId()) {
            browserHistory.push('/registerLogin');
        } else {
            Meteor.call('question.insert', Meteor.user().username , title, description);
        }
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
            <div className="container">
                <div className="col-md-1 col-xs-0"/>
                <div className="col-md-10 col-xs-12 container-fluid">
                    <Button onClick={this.handleShow} style={{marginBottom: 20, marginLeft: 15}}>提问</Button>
                    <QuestionList questions={this.props.questions} />
                    <Modal show={this.state.show} onHide={this.handleClose} className="container-fluid">
                        <Modal.Header closeButton>
                        </Modal.Header >
                        <Modal.Body className="container-fluid">
                            <form className="row" onSubmit= {this.handleSubmit.bind(this)} className="container-fluid col-md-12 col-xs-12">
                                <FormGroup className="container-fluid col-md-12 col-xs-12">
                                    <span className="row">写下你的问题</span>
                                    <span className="row">问题描述得越精确会吸引更多的人回答哦~</span>
                                    <FormControl
                                        type="text"
                                        inputRef={ref => { this.questiontitle = ref; }}
                                        placeholder="问题标题"
                                        className="col-md-12 col-xs-12 row"
                                        style={{borderRadius:10, marginTop: 10, marginBottom: 20}}
                                    />
                                    <span className="row">问题描述(可选)</span>
                                    <FormControl
                                        componentClass="textarea"
                                        placeholder="问题背景、条件等详细信息……" 
                                        inputRef={ref => { this.questiontdescription = ref; }}
                                        style={{width: "100%", height: 100, borderRadius:10, marginTop: 10}}
                                        className="col-md-12 col-xs-12 row"
                                        onChange={this.handleChange.bind(this)}
                                    />
                                    {this.state.showPreview && 
                                        <div className="row col-md-12 col-xs-12"><MarkdownBlock content={this.state.previewContent}/></div>
                                    }
                                    <Button type="submit" className="col-md-3 col-xs-6" style={{marginTop: 20}}>提问</Button>
                                    <div className="col-md-9 col-xs-6" style={{display: "flex", justifyContent: "flex-end", marginTop: 20}}>
                                        <a onClick={this.togglePreview.bind(this)}>{this.state.showPreview ? '隐藏预览' : '显示预览'}</a>
                                    </div>
                                </FormGroup>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="col-md-1 col-xs-0"/>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe('Question');
    return {
        questions: Question.find().fetch(),
    };
})(QuestionPage);
