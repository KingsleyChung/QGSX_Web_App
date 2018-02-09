import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import ArticleList from '../components/ArticleList';
import { Image, Tab, Nav, Row, Col, NavItem } from 'react-bootstrap';
import { Article,User,Question} from '../api/collection';
import Divider from 'material-ui/Divider';
import QuestionList from '../components/QuestionList';


class Profile extends Component {
    componentdidMount() {
        if (!Meteor.user()) {
            console.log("dfdfdf");
            browserHistory.push('/RegisterLogin');
        }
    }
    renderstore() {
        <ArticleList articles={likeList} />
    }
    renderlike() {
        
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="col-md-2 col-xs-1"/>
                
                <div className="col-md-8 col-xs-10 container-fluid">
                    <div className="row container-fluid">
                        <div className="col-md-2 col-xs-3">
                            <Image src="/images/image.png" circle style={{width: "100%"}}/>
                        </div>
                        <div className="col-md-10 col-xs-9 container-fluid">
                            <div className="row" style={{fontSize: 36}}>{this.props.currentUser && this.props.currentUser.username}</div>
                            <div className="row">关注 | {this.props.follow}</div>
                        </div>
                    </div>
                    <Divider className="row" style={{marginTop: 16}}/>
                    <Tab.Container defaultActiveKey="first" className="container-fluid col-md-12 col-xs-12" style={{marginTop: 10, marginBottom: 10}}>
                        <Row className="clearfix col-md-12 col-xs-12 container-fluid">
                            <Nav bsStyle="pills">
                                <NavItem eventKey="first" >我的收藏</NavItem>
                                <NavItem eventKey="second">我赞过的</NavItem>
                                <NavItem eventKey="third" >我的关注</NavItem>
                                <NavItem eventKey="fourth">我的问题</NavItem>
                            </Nav>
                            <Tab.Content animation className="col-md-12 col-xs-12 container-fluid" style={{marginLeft: -15, marginRight: -15}}>
                                <Tab.Pane eventKey="first" className="col-md-12 col-xs-12 container-fluid" style={{marginLeft: -15, marginRight: -15}}>
                                    <ArticleList articles={this.props.storeList} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second"className="col-md-12 col-xs-12 container-fluid" style={{marginLeft: -15, marginRight: -15}}>
                                    <ArticleList articles={this.props.likeList} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="third"className="col-md-12 col-xs-12 container-fluid" style={{marginLeft: -15, marginRight: -15}}>
                                    <QuestionList questions={this.props.followquesionlist} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="fourth"className="col-md-12 col-xs-12 container-fluid" style={{marginLeft: -15, marginRight: -15}}>
                                    <QuestionList questions={this.props.sponquestionlist} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Row>
                    </Tab.Container>
                </div>
                
                <div className="col-md-2 col-xs-1"/>
            </div>
        )
    }
}

export default withTracker(() => {

    Meteor.subscribe('Article');
    Meteor.subscribe("Question");

    const articles = Article.find().fetch();
    const questions = Question.find().fetch();
        
    const likeList = [];
    const storeList=[];
    const followquesionlist = [];
    const sponquestionlist = [];
    const follow = 0;    
    if (Meteor.user() && User.find() && User.find().fetch().length > 0) {
        const userArticle =User.find().fetch()[0].like_article;
        const userstoreArticle =User.find().fetch()[0].store_article;
        follow = User.find().fetch()[0].follow_question_count;
        for (var i = 0; i < articles.length; ++i) {
            for (var j = 0; j < userArticle.length; ++j) {
                if (articles[i]._id.toString() ==userArticle[j].toString())
                    likeList.push(articles[i]);
            }
            for (var k = 0; k < userstoreArticle.length; ++k) {
                if (articles[i]._id.toString() ==userstoreArticle[k].toString())
                    storeList.push(articles[i]);
            }            
        }

        const followquestion = User.find().fetch()[0].follow_question;
        for (var l = 0; l < questions.length; ++l) {
            for (var m = 0; m < followquestion.length; ++m) {
                if (questions[l]._id.toString() ==followquestion[m].toString())
                    followquesionlist.push(questions[l]);
            }
        }
        sponquestionlist = Question.find({"sponser": Meteor.user().username}).fetch();
    }
    
    return {
        currentUser: Meteor.user(),
        likeList:likeList,
        storeList:storeList,
        follow:follow,
        followquesionlist:followquesionlist,
        sponquestionlist: sponquestionlist,        
    }    
        
})(Profile);