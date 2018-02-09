import React, { Component } from 'react';
import QuestionDetailContainer, { TempQuestionDetail } from '../components/QuestionDetailComponent';

export default class QuestionDetail extends Component {
    render () {
        return (
            <div>
                <QuestionDetailContainer question_id={this.props.params.id}>
                    <TempQuestionDetail />
                </QuestionDetailContainer>
            </div>
        )
    }
}