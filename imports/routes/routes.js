import React from 'react';
import { Router, Route, browserHistory,IndexRoute } from 'react-router';
import App from '../pages/App';
import MainPage from '../pages/MainPage';
import ArticleDetail from '../pages/ArticleDetail';
import RegisterLogin from '../pages/RegisterLogin';
import QuestionPage from '../pages/QuestionPage';
import QuestionDetail from '../pages/QuestionDetail';
import Profile from '../pages/Profile';
import FormulaPage from '../pages/FormulaPage';
// import ArticlePage from '../pages/ArticlePage.js';

// import QuestionList from '../pages/QuestionList.js';
// import QuestionPage from '../pages/QuestionPage.js';
// import AskQuestion from '../pages/AskQuestion.js';

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/registerLogin" component = {RegisterLogin}/>
        <Route path="/" component={App}>
            <IndexRoute component={MainPage} />
            <Route path="question" component={QuestionPage} />
            <Route path="profile" component={Profile} />
            <Route path="formula" component={FormulaPage} />
            <Route path="questiondetail/:id" component={QuestionDetail} />
            <Route path="article/:name" component={ArticleDetail} />
            <Route path="like" component={MainPage} />
            <Route path="store" component={MainPage} />
            <Route path="*" component = {MainPage}/>
            {/* <Route path="articlePage/:id" component={ArticlePage}/>
            <Route path="questionList" component={QuestionList}/> */}
        </Route>
    </Router>
);
