import React, { Component } from 'react';

export default class FormulaPage extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="col-md-1 col-xs-0" />
                <div className="row col-md-10 col-xs-12">
                    <iframe className="col-md-12 col-xs-12" src="http://ctex.math.org.cn/blackboard.html" style={{height: 680}}/>
                    <div className="col-md-12 col-xs-12" style={{display: "flex", justifyContent: "center"}}>
                        <div style={{marginRight: 10}}>From</div>
                        <a href="http://ctex.math.org.cn/blackboard.html">http://ctex.math.org.cn/blackboard.html</a>
                    </div>
                </div>
                <div className="col-md-1 col-xs-0" />
            </div>
        )
    }
}