import React, { Component } from 'react';
import { Image, Badge, Glyphicon } from 'react-bootstrap';
import {browserHistory} from 'react-router';
import { User } from '../api/collection';
import MarkdownBlock from '../components/MarkdownBlock';

export default class BriefArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: props.width || -1,
            height: props.height || -1,
        }
    }
       
    componentDidMount() {
        this.updateSize();
        window.addEventListener('resize', () => this.updateSize());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateSize());
    }

    skip () {
        browserHistory.push('/article/' + this.props.title);
    }
    
    updateSize() {
        try {
            const parentDom = ReactDOM.findDOMNode(this).parentNode;
            let { width, height } = this.props;
            //如果props没有指定height和width就自适应
            if (!width) {
                width = parentDom.offsetWidth;
            }
            if (!height) {
                height = width * 0.5;
            }
            this.setState({ width, height });
        } catch (ignore) {}
    }

    render() {
        // if (browserHistory.getCurrentLocation().pathname == '/like' && Meteor.user()) {
        //     Meteor.subscribe('UserInformation',Meteor.user().username);
        //     const temp = User.find().fetch()[0].like_article;
        //     for (i = 0; i < temp.length; ++i) {
        //         if (temp[i].toString() == this.props._id.toString()) {
        //             return <span/>
        //         }
        //     }
        // }
        return (
            <div className="container-fluid row" onClick={this.skip.bind(this)}>
                <div className="col-md-4 col-xs-12" style={{marginLeft: -15, marginRight: -15}}>
                    <Image className="image-responsive center-block" src={this.props.article.cover_image} style={styles.coverImage}/>
                </div>
                <div className="col-md-8 col-xs-12 container-fluid" style={{position: "relative", marginLeft:20, marginRight: -30, height: 210}}>
                    <div className="row" style={{overflow: "hidden", textOverflow: "ellipsis", marginTop:10}}>
                        <span style={styles.title}>{this.props.article.title}</span>
                    </div>
                    <div className="row" style={styles.contentBlock}>
                        <MarkdownBlock content={this.props.article.abstract.slice(0, 180)} />
                    </div>
                    <div className="row" style={{position: "absolute", bottom:20}}  >
                        <span style={styles.statistic}>
                            <Image src={"images/eye.png"} style={styles.icon}/>
                            {this.props.article.view_count}
                        </span>
                        <span style={styles.statistic}> 
                            <Image src="images/comment.png" style={styles.icon}/>
                            {this.props.article.comment_count}
                        </span>
                        <span style={styles.statistic}>
                            <Image src="images/like.png" style={styles.icon}/>
                            {this.props.article.like_count}
                        </span>
                        <Badge>{this.props.article.date.toString().split(' ')[3]}</Badge>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    container: {

    },
    title: {
        fontSize: 40,
    },
    coverImage: {
        // marginLeft: -15,
        width: "100%",
    },
    icon: {
        width: 16,
        marginRight: 4,
        opacity:0.5
    },
    statistic: {
        marginRight: 16,
        color:"#777"
    },
    blank: {
        height: 15,
    },
    contentBlock: {
        maxHeight: 100,
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
}