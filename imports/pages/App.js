import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import NavigationBar from '../components/NavigationBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// App component - represents the whole app
export default class App extends Component {
    render() {
        var navigationBarHeight = 80;
        var splitStr = this.props.location.pathname.split('/')
        if(splitStr[1]=='article' && splitStr.length>2){
            navigationBarHeight = 50;
        }
        return (
            <MuiThemeProvider>
                <div>
                    <NavigationBar location={this.props.location}/>
                    <div style={{height: navigationBarHeight}}/>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}
