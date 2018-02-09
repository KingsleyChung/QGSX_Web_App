import { Meteor } from 'meteor/meteor';

export const User = new Mongo.Collection('User');
export const Article = new Mongo.Collection("Article");
export const Comment = new Mongo.Collection('Comment');
export const Reply = new Mongo.Collection('Reply');
export const Question = new Mongo.Collection('Question');
export const Answer = new Mongo.Collection('Answer');
export const QuestionReply = new Mongo.Collection('QuestionReply');
export const HomeSuggest = new Mongo.Collection('HomeSuggest');

Meteor.methods({
  'reply.insert'(text,from,to,articleTitle,commentId) {
    //check(text, String);
    // Make sure the user is logged in before inserting a task
    if (! this.userId || Meteor.user().username != from) {
      //console.log(Meteor.user().username);
      throw new Meteor.Error('not-authorized');
    }

    Reply.insert({
      date: new Date(),
      from:from,
      to:to,
      content:text,
      article:articleTitle,
      comment:commentId,
    });
  },

  'article.addlike'(articleTitle, like_count) {
      Article.update({'title':articleTitle},{$set:{'like_count':like_count}})
  
  },
  
  'article.addstore'(articleTitle, like_count) {
      Article.update({'title':articleTitle},{$set:{'favorite_count':like_count}})
  },

  'article.addpageview'(articleTitle, view_count) {
      Article.update({'title':articleTitle},{$set:{'view_count':view_count}})
  },
  
  'comment.addlike'(commentId, like_count) {
      Comment.update({'_id':commentId},{$set:{'like_count':like_count}})
  },
  
  'comment.insert'(title, replyToComment, username, like_count, comment_count) {

    if (! this.userId || Meteor.user().username != username) {
      //console.log(Meteor.user().username);
      throw new Meteor.Error('not-authorized');
    }

    Comment.insert({
      date: new Date(),
      article:title,
      content:replyToComment,
      user:username,
      like_count:like_count,
    });
    
    Article.update({'title':title},{$set:{'comment_count':comment_count}})
    
  },
  
  'question.insert'(sponsor, title, description) {

    if (! this.userId || Meteor.user().username != sponsor) {
      //console.log(Meteor.user().username);
      throw new Meteor.Error('not-authorized');
    }

    Question.insert({
      sponser:sponsor,
      title:title,
      date: new Date(),
      content:description,
      answer:[],
      favorite_count:0,
      like_count:0,
      view_count:0
    });
    
  },

  
  'answer.insert'(username,questionId,answer) {

    if (! this.userId || Meteor.user().username != username) {
      //console.log(Meteor.user().username);
      throw new Meteor.Error('not-authorized');
    }

    Answer.insert({
      date: new Date(),
      sponser:username,
      question:questionId,
      content:answer,
      like_count:0,
      dislike_count:0,
      replys:[],
    });
    
  },
  
  'answerreply.insert'(from,to,content,answer_id, replys_count) {

    if (! this.userId || Meteor.user().username != from) {
      //console.log(Meteor.user().username);
      throw new Meteor.Error('not-authorized');
    }

    QuestionReply.insert({
      from:from,
      to:to,
      content:content,
      date: new Date(),
      answer:answer_id,
    });
    
    Answer.update({'_id':answer_id},{$set:{'replys_count':replys_count}})
    
  },
  
  'user.insert'(username) {
    User.insert({
      username:username,
      like_article:[],
      store_article:[],
      like_comment:[],
      follow_question:[],
      like_article_count:0,
      store_article_count:0,
      like_comment_count:0,
      follow_question_count:0,
    })
  },
  
  'user.updatelikearticle'(username, articleId, like_count) {
      if (! this.userId) {
      //console.log(Meteor.user().username);
        throw new Meteor.Error('not-authorized');
      }
    
    User.update({'username':username},{ $push: { like_article: articleId }, $set:{'like_article_count':like_count} })
  },

  'user.updatestorearticle'(username, articleId, like_count) {
      if (! this.userId) {
      //console.log(Meteor.user().username);
        throw new Meteor.Error('not-authorized');
      }
    
    User.update({'username':username},{ $push: { store_article: articleId }, $set:{'store_article_count':like_count} })
  },
  
  'user.updatelikecomment'(username, commentId, like_count) {
      if (! this.userId) {
      //console.log(Meteor.user().username);
        throw new Meteor.Error('not-authorized');
      }
    
    User.update({'username':username},{ $push: { like_comment: commentId }, $set:{'like_comment_count':like_count} })
  },
  
  'question.addlike'(questionId, like_count) {
      if (! this.userId) {
      //console.log(Meteor.user().username);
        throw new Meteor.Error('not-authorized');
      }
    
    Question.update({'_id':questionId},{$set:{'like_count':like_count} })
  },

  'question.addviewcount'(questionId, view_count) {
      if (! this.userId) {
      //console.log(Meteor.user().username);
        throw new Meteor.Error('not-authorized');
      }
    
    Question.update({'_id':questionId},{$set:{'view_count':view_count} })
  },
  
  'user.updatefollowquestion'(username, questionId, follow_question_count) {
      if (! this.userId) {
      //console.log(Meteor.user().username);
        throw new Meteor.Error('not-authorized');
      }
    
    User.update({'username':username},{ $push: { follow_question: questionId }, $set:{'follow_question_count':follow_question_count} })
  },
  
});
