import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
import MarkdownBlock from './MarkdownBlock';

export default class EditQuestion extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            previewContent: '效果预览',
            showPreview: true,
        };
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
            <div>
                <span className="row">写下你的问题</span>
                <span className="row">问题描述得越精确会吸引更多的人回答哦~</span>
                <form className="row" onSubmit= {this.handleSubmit.bind(this)} className="container-fluid col-md-12 col-xs-12">
                    <FormGroup className="container-fluid col-md-12 col-xs-12">
                        <FormControl
                            type="text"
                            inputRef={ref => { this.questiontitle = ref; }}
                            placeholder="问题标题"
                        />
                    </FormGroup>
                    <span className="row">问题描述(可选)</span>
                    <FormControl
                        componentClass="textarea"
                        placeholder="问题背景、条件等详细信息……" 
                        inputRef={ref => { this.questiontdescription = ref; }}
                        style={{width: "100%", height: 100, borderRadius:10}}
                        className="col-md-12 col-xs-12 row"
                        onChange={this.handleChange.bind(this)}
                    />
                    {this.state.showPreview && 
                        <div className="row col-md-12 col-xs-12"><MarkdownBlock content={this.state.previewContent}/></div>
                    }
                    <Button type="submit" className="col-md-3 col-xs-6">提问</Button>
                    <div className="col-md-9 col-xs-6" style={{display: "flex", justifyContent: "flex-end"}}>
                        <a onClick={this.togglePreview.bind(this)}>{this.state.showPreview ? '隐藏预览' : '显示预览'}</a>
                    </div>
                </form>
            </div>
        )
    }
}
                        