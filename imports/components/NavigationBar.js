import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Image, Form, FormGroup, Button, ControlLabel, InputGroup, FormControl } from 'react-bootstrap';
import { Router, Route, Link } from 'react-router'
import {browserHistory} from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import './NavigationBar.css'

class NavigationBar extends Component {
    
    handleSubmit() {
        var fun = (err)=> {
            if (err) {
                console.log(err.reason);
            } else {
                console.log("退出成功！");
                browserHistory.push('/');
            } 
        }
        Meteor.logout(fun.bind(this));
    }
    
    
    render() {
        // if (Meteor.user()) {
        //     Meteor.subscribe('UserInformation',Meteor.user().username);
        // }
        
        var splitStr = this.props.location.pathname.split('/')
        var activeKey = -1;
        if(splitStr.length==2){
            switch (splitStr[1]) {
                case '':
                case 'article':
                    // code
                    activeKey = 1;
                    break;
                case 'question':
                case 'questiondetail':
                    // code
                    activeKey = 3
                    break;
                
                default:
                    // code
            }
        }
        return (
            <Navbar collapseOnSelect fixedTop={true} className="container-fluid" >
                <Navbar.Header >
                    <Navbar.Brand>
                    <a href="/" style={{color: "rgb(96, 177, 131)", fontSize:23}}>勤工善学</a>
                    <a href="/" style={{color: "rgb(96, 177, 131)", fontSize:15}}> · 美赛专题</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav  activeKey={activeKey} >
                        <NavItem eventKey={1}href="/">
                            优质文章
                        </NavItem>
                        <NavItem eventKey={2} href="/formula">
                            公式黑板
                        </NavItem>
                        <NavItem eventKey={3} href="/question">
                            问答
                        </NavItem>
                    </Nav>
                    <Nav pullRight   >
                        {Meteor.user() ? 
                            null 
                                :
                            <NavItem eventKey={1} href="/registerLogin">
                               <a   style={{color: "rgb(96, 177, 131)"}}> 微信登录</a>
                            </NavItem>      
                        }
                    </Nav>
                    {!!Meteor.user() && <Nav pullRight>
                        <NavDropdown  style={{paddingTop:5}} eventKey={3} title={<Image src="/images/image.png" width={40} height={40} circle/>} id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1} href="/profile">我的主页</MenuItem>
                            <MenuItem eventKey={3.2} href="/like">我赞过的文章</MenuItem>
                            <MenuItem eventKey={3.3} href="/store">我收藏的文章</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3} onClick = {this.handleSubmit.bind(this)}>退出登录</MenuItem>
                        </NavDropdown>
                    </Nav>}
                    <Nav pullRight >
                        <Form style={{marginTop:10}}>
                          <FormGroup style={{marginBottom:0}}>
                            <InputGroup>
                              <InputGroup.Addon style={{border:0}}>搜索</InputGroup.Addon>
                              <FormControl type="text"  style={{border:0, backgroudColor:'white'}}/>
                            </InputGroup>
                          </FormGroup>
                         </Form>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withTracker(() => {
    if (Meteor.user()) {
        Meteor.subscribe('UserInformation', Meteor.user().username);
    }
    return {
        currentUser: Meteor.user(),
    };
})(NavigationBar);
