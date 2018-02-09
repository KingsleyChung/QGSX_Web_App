import React, { Component } from 'react';
import BriefQuestion from '../components/BriefQuestion';

export default class QuestionList extends Component {
    renderQuestions() {
        return this.props.questions.map((question) => {
            return (
                <BriefQuestion key={question._id} question={question}/>
            )
        })
    }

    render() {
        return (
            <div className="row container-fluid">
                {this.props.questions && this.renderQuestions()}
            </div>
        )
    }
}