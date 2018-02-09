import { Meteor } from 'meteor/meteor';
import '../imports/api/collection'; 

import { User, Article, Comment, Reply, Question, Answer, QuestionReply, HomeSuggest } from '../imports/api/collection';


Meteor.publish('User', function() {
    return User.find();
});

Meteor.publish('Article', function() {
  
    return Article.find();
});


Meteor.publish('OneArticle', function(titleName) {
  
    return Article.find({title:titleName});
});

Meteor.publish('Comment', function(titleName) {
  
    return Comment.find({article:titleName});
});

Meteor.publish('Reply', function(titleName) {
  
    return Reply.find({article:titleName});
});

Meteor.publish('Question', function(question_id) {
    return Question.find();
});

Meteor.publish('OneQuestion', function(question_id) {
    return Question.find({_id:question_id});
});

Meteor.publish('Answer', function(question_id) {
    return Answer.find({question:question_id});
});

Meteor.publish('QuestionReply', function(answer_id) {
    return QuestionReply.find({answer:answer_id});
});

Meteor.publish('HomeSuggest', function() {
    return HomeSuggest.find();
});

Meteor.publish('UserInformation', function(username) {
    return User.find({username:username});
});
