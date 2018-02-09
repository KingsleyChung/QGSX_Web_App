import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Article,User } from '../api/collection';
import {browserHistory} from 'react-router';

import ArticleList from '../components/ArticleList';

export default ArticleListContainer = withTracker(({ sortType }) => {
    const ArticlesHandle = Meteor.subscribe('Article');
    const list = Article.find({}, sortType).fetch();
    console.log("sorttype改变了");
    if (browserHistory.getCurrentLocation().pathname == '/like' && Meteor.user()) {
            const user = User.find().fetch();
            if (user && user.length > 0) {
                userArticle = user[0].like_article;
                likeList = [];
                for (var i = 0; i < list.length; ++i) {
                    for (var j = 0; j < userArticle.length; ++j) {
                        if (list[i]._id.toString() ==userArticle[j].toString())
                            likeList.push(list[i]);
                    }
                }
                return {
                    articles: likeList,
                };
            }

    }

    return {
        articles: list,
    };
})(ArticleList);