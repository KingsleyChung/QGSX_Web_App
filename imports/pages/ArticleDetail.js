import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import ReactDOM from 'react-dom';
import { Image, Badge,Panel,Button, FormGroup, FormControl} from 'react-bootstrap';
import { Article, Comment ,Reply,User} from '../api/collection';
import CommentBlock from '../components/CommentBlock';
import {browserHistory} from 'react-router';

import MarkdownBlock from '../components/MarkdownBlock';
var Remarkable = require('remarkable');
var hljs = require('highlight.js');

class ArticleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            previewContent: '效果预览',
            showPreview: true,
        };
    }
    
    componentDidMount() {
        if (this.props.article) {
            Meteor.call('article.addpageview', this.props.article.title, this.props.article.view_count + 1);
        }
    }
    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});
    
    addArticleLike() {
        if (!Meteor.user()) {
            browserHistory.push('/registerLogin');
        }
        else {
            const userLikeArticle = User.find().fetch()[0].like_article;
            const like_count = User.find().fetch()[0].like_article_count + 1;
            for (i = 0; i < userLikeArticle.length; ++i) {
                if (userLikeArticle[i].toString() == this.props.article._id.toString())
                    return;
            }
            Meteor.call('article.addlike', this.props.article.title, this.props.article.like_count + 1);
            Meteor.call('user.updatelikearticle', this.props.currentUser.username, this.props.article._id, like_count);
        }
    }
    addArticleStore() {
        if (!Meteor.user()) {
            browserHistory.push('/registerLogin');
        }
        else {
            const userStoreArticle = User.find().fetch()[0].store_article;
            const store_count = User.find().fetch()[0].store_article_count + 1;
            for (i = 0; i < userStoreArticle.length; ++i) {
                if (userStoreArticle[i].toString() == this.props.article._id.toString())
                    return;
            }
            Meteor.call('article.addstore', this.props.article.title, this.props.article.favorite_count + 1);
            Meteor.call('user.updatestorearticle', this.props.currentUser.username, this.props.article._id, store_count);
        }
    }
    
    renderComments() {
        return this.props.comments.map((comment) => {
            return (
                <div className="row container col-md-12 col-xs-12" key={comment._id}>
                    <CommentBlock
                        comment = {comment}
                        article = {this.props.article}
                        currentUser = {this.props.currentUser}
                    />
                </div>
            )
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (ReactDOM.findDOMNode(this.givecommentinput) != null) {
            const replyToComment = ReactDOM.findDOMNode(this.givecommentinput).value.trim();
            if (replyToComment.length == 0) {
                return;
            }
            ReactDOM.findDOMNode(this.givecommentinput).value = '';
            if (!Meteor.userId()) {
                browserHistory.push('/registerLogin');
            } else {
                Meteor.call('comment.insert', this.props.article.title, replyToComment, this.props.currentUser.username, 0,this.props.article.comment_count + 1);
            }
        }
    }
    renderGiveComment() {
        return (
            <div className="container-fluid">
                <form className="row container-fluid col-md-12 col-xs-12" onSubmit={this.handleSubmit.bind(this)}>
                    <Image className="col-md-2 col-xs-2" src="/images/image.png" circle style={{marginLeft: -15, marginRight: 15, width:70, height:70}}/>
                    <FormGroup className="col-md-10 col-xs-10 container-fluid" controlId="commentsubmit">
                        {/* <FormControl
                            componentClass="textarea"
                            placeholder="发表评论" 
                            inputRef={ref => { this.givecommentinput = ref; }}
                            style={{width: "100%", height: 100, borderRadius:10}}
                        />
                        <div style={{height:10}}/>
                        <Button type="submit">发表</Button> */}

                        <FormControl
                            componentClass="textarea"
                            placeholder="发表评论" 
                            inputRef={ref => { this.givecommentinput = ref; }}
                            style={{width: "100%", height: 100, borderRadius:10}}
                            className="col-md-12 col-xs-12 row"
                            onChange={this.handleChange.bind(this)}
                        />
                        {this.state.showPreview && 
                            <div className="row col-md-12 col-xs-12"><MarkdownBlock content={this.state.previewContent}/></div>
                        }
                        <Button type="submit" className="col-md-3 col-xs-6" style={{marginTop: 20}}>发表</Button>
                        <div className="col-md-9 col-xs-6" style={{display: "flex", justifyContent: "flex-end", marginTop: 20}}>
                            <a onClick={this.togglePreview.bind(this)}>{this.state.showPreview ? '隐藏预览' : '显示预览'}</a>
                        </div>
                    </FormGroup>
                </form>
            </div> 
        )
    }
  
    handleChange() {
        content = ReactDOM.findDOMNode(this.givecommentinput).value.trim();
        if (content == '') content = '效果预览';
        this.setState({previewContent: content});
    }

    togglePreview() {
        this.setState({showPreview: !this.state.showPreview});
    }

    render() {
        return (
            <div className="container">
                 <RaisedButton
                    label="打开目录 ▶"
                    onClick={this.handleToggle}
                    style={{position: "fixed", bottom: 100, left: 0, visibility: "hidden"}}
                />
                <Drawer
                    docked={false}
                    width={280}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>
                    <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
                    <Divider />
                    <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
                </Drawer>
                <div className="col-md-1 col-xs-0" />
                {this.props.article &&
                    <div className="row container-fluid col-md-10 col-xs-12">
                        <Paper className="row container col-md-12 col-xs-12" zDepth={2} style={{marginBottom: 30}}>
                            <div className="col-md-1 col-xs-1"/>
                            <div className="col-md-10, col-xs-10">
                                <div className="row text-center" style={{width: "100%", fontSize: 40, marginTop: 20, overflow: "hidden", textOverflow: "ellipsis"}}>
                                    {this.props.article.title}
                                </div>
                                <h4 className="text-center"><small className="row">{this.props.article.description}</small></h4>
                                <Image className="row image-responsive center-block" src={this.props.article.cover_image} style={{width: "100%", padding:50}} />
                                <div className="container-fluid row" style={{marginBottom: 30}}>
                                    <div className="row">
                                        <MarkdownBlock content={this.props.article.content} />
                                    </div>
                                </div>
                                <Divider />
                                <Button className="row" onClick={this.addArticleLike.bind(this)} style={{marginTop: 10, marginRight: 15, backgroudColor:"rgb(96, 177, 131)"}}>喜欢 | {this.props.article.like_count}</Button>
                                <Button className="row" onClick={this.addArticleStore.bind(this)} style={{marginTop: 10, marginRight: 15}}>收藏 | {this.props.article.favorite_count}</Button>
                                {this.renderGiveComment()}
                            </div>
                            <div className="col-md-1 col-xs-1"/>
                        </Paper>
                        <div style={{marginBottom: 10}}>评论总数<Badge>{this.props.article.comment_count}</Badge></div>
                        {this.renderComments()}
                    </div>
                }
                <div className="col-md-1 col-xs-0" />
            </div>
        );
    }
}

export default withTracker(({params}) => {
    Meteor.subscribe("OneArticle",params.name);
    Meteor.subscribe("Comment", params.name);
    Meteor.subscribe("Reply", params.name);
    if (Meteor.user())
        Meteor.subscribe("UserInformation", Meteor.user().username);
    
    return {
        article: Article.find().fetch()[0],
        comments:Comment.find({}, { sort: { date: -1 } }).fetch(),
        replys:Reply.find().fetch(),
        currentUser:Meteor.user(),
    };
})(ArticleDetail);
