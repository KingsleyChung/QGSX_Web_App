import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Image } from 'react-bootstrap';
import {browserHistory} from 'react-router';

export default class BriefQuestion extends Component {
    skip() {
        browserHistory.push('/questiondetail/' + this.props.question._id);

    }
    render() {
        return (
            <Paper style={{marignTop: 10, marginBottom: 10, paddingTop: 10, paddingBottom: 10}} className="container-fluid row col-md-12 col-xs-12" onClick={this.skip.bind(this)}>
                <div className="row">
                    <div className="col-md-1 col-xs-2" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <Image src="/images/image.png" circle style={{width: 50, height:50}}/>
                    </div>
                    <div className="col-md-11 col-xs-10 container-fluid">
                        <span className="row">{this.props.question.sponser}</span>
                        <span className="row">{new moment(this.props.question.date).format("YYYY-MM-DD")}</span>
                    </div>
                </div>
                <div className="container-fluid">
                    <span className="row" style={{fontSize: 34, marginTop: 16, marginBottom: 10}}>{this.props.question.title}</span>
                    <span className="row" style={{fontSize: 20, color: "grey"}}>{this.props.question.content}</span>
                    <div className="row">
                        <span style={styles.statistic}>
                            <Image src={"images/eye.png"} style={styles.icon}/>
                            {this.props.question.view_count}
                        </span>
                        <span style={styles.statistic}> 
                            <Image src="images/comment.png" style={styles.icon}/>
                            {this.props.question.answer_count}
                        </span>
                        <span style={styles.statistic}>
                            <Image src="images/like.png" style={styles.icon}/>
                            {this.props.question.like_count}
                        </span>
                    </div>
                </div>
            </Paper>
        )
    }
}

const styles = {
    statistic: {
        marginRight: 16,
    },
    icon: {
        width: 16,
        marginRight: 4,
    },
}