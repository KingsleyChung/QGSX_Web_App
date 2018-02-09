import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl, HelpBlock,Form, Col, Checkbox, Button,InputGroup} from 'react-bootstrap'
import {browserHistory} from 'react-router';
import './LoginForm.css'

export default class LoginForm extends Component{
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.state = {
      value: '',
      whether:0,
    };
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 6) return 'success';
    else if (length > 4) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const userName = ReactDOM.findDOMNode(this.userNameinput).value.trim();
    const userPassword = ReactDOM.findDOMNode(this.passwordinput).value.trim();
    if (this.getValidationState() != "success" || userPassword == '') {
        this.setState({whether:1});
        return;
    }

    ReactDOM.findDOMNode(this.userNameinput).value = '';
    ReactDOM.findDOMNode(this.passwordinput).value = '';
    var fun = (err)=> {
        if (err) {
            this.setState({ whether:1});
            console.log(err.reason);
        } else {
            this.setState({whether:2});
            console.log("登录成功！");
            browserHistory.push('/');
        } 
    }
    Meteor.loginWithPassword(userName,userPassword, fun.bind(this));
    
  }
  
  render() {
    return (
        <div  style={{ marginTop:50, height:'100%', width:'100%', display: 'flex', alignItems:'center', justifyContent: 'center'}}>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                    style={styles.formGroup}
                    
                >
                    {false&&<div><ControlLabel>用户名：</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="用户名"
                        onChange={this.handleChange}
                        inputRef={ref => { this.userNameinput = ref; }}
                        style={styles.input}
                    /></div>}
                    
                    <InputGroup style={styles.input}>
                      <InputGroup.Addon style={{border:0}}><i class="far fa-user"></i></InputGroup.Addon>
                      <FormControl  
                        type="text"  
                        style={{height:50, border:0, backgroudColor:'white'}}
                        value={this.state.value}
                        placeholder="用户名"
                        onChange={this.handleChange}
                        inputRef={ref => { this.userNameinput = ref; }}
                        />
                    </InputGroup>
                    <FormControl.Feedback />
                </FormGroup>
                
                <FormGroup 
                    controlId="formHorizontalPassword"
                    style={styles.formGroup}
                >
                    {false&&<div><ControlLabel>密码：</ControlLabel>}
                    <FormControl 
                        type="password" 
                        placeholder="密码" 
                        inputRef={ref => { this.passwordinput = ref; }}
                        style={styles.input}
                    /></div>}
                    
                    <InputGroup style={styles.input}>
                      <InputGroup.Addon style={{border:0}}><i class="fas fa-key"></i></InputGroup.Addon>
                      <FormControl  
                        type="password"  
                        style={{height:50, border:0, backgroudColor:'white'}}
                        placeholder="密码" 
                        inputRef={ref => { this.passwordinput = ref; }}
                        />
                    </InputGroup>
                    {this.state.whether == 1 ? 
                        <HelpBlock>账号不存在或密码错误！</HelpBlock>
                        : ''
                    }
                </FormGroup>
                <FormGroup style={{display:'flex',  left:110, marginTop:20}}>
                    <Checkbox style={{color:'#777'}}>记住我</Checkbox>
                </FormGroup>
            
                <FormGroup>
                    <Button type="submit" 
                        bsStyle="success"
                        style={{
                            width:'100%', 
                            borderRadius:20, 
                            height:40, 
                            color:'#fff',
                            fontSize:17,
                        }}>登录</Button>
                </FormGroup>
              
            </form>
        </div>
    )
  }
}


const styles = {
    
    input : {
        borderRadius:0,
        height:50,
        width:250
    },
    formGroup : {
        marginTop:0,
        marginBottom:0
    },
}