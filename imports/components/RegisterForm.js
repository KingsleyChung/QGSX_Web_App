import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl, HelpBlock,Form, Col, Checkbox, Button, InputGroup} from 'react-bootstrap'
import {browserHistory} from 'react-router';
import { Session } from 'meteor/session'

import './RegisterForm.css'

export default class RegisterForm extends Component{
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: '',
      whetherUser:0,
      whetherPassword:0,
      registerSession:false,
    };
  }

    registerRemember() {
        this.setState({registerSession:!this.state.registerSession});
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
    this.setState({whetherUser: 1});
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const userName = ReactDOM.findDOMNode(this.userNameinput).value.trim();
    const userPassword = ReactDOM.findDOMNode(this.userNamePassword).value.trim();
    const userRepeatPassword = ReactDOM.findDOMNode(this.userNameRepeatPassword).value.trim();
    if (this.getValidationState() != "success") {
        this.setState({whetherUser:1});
        return;
    }
    if (userPassword != userRepeatPassword || userPassword == '') {
        this.setState({whetherPassword:1});
        return;
    }
    this.setState({whetherUser:2});
    this.setState({whetherPassword:2});
    
    ReactDOM.findDOMNode(this.userNameinput).value = '';
    ReactDOM.findDOMNode(this.userNamePassword).value = '';
    ReactDOM.findDOMNode(this.userNameRepeatPassword).value = '';
    
    var fun = (err)=> {
        if (err) {
            this.setState({whetherUser:3});
            console.log(err.reason);
        } else {
            console.log("注册成功！");
            Meteor.call('user.insert', userName);
            browserHistory.push('/');
        }
    }
    Accounts.createUser({username: userName, password : userPassword}, fun.bind(this));
      
  }
  
  render() {
    return (
        <div  style={{ marginTop:50, height:'100%', width:'100%', display: 'flex', alignItems:'center', justifyContent: 'center'}}>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup
                    controlId="regisFormBasicText"
                    validationState={this.getValidationState()}
                    style={styles.formGroup}
                >
                    
                    <InputGroup style={styles.input}>
                      <InputGroup.Addon style={{border:0}}><i class="far fa-user"></i></InputGroup.Addon>
                      <FormControl  
                        type="text"  
                        placeholder="用户名" 
                        value={this.state.value}
                        onChange={this.handleChange}
                        inputRef={ref => { this.userNameinput = ref; }}
                        />
                        
                        <FormControl.Feedback />
                        {this.state.whetherUser == 1  && this.getValidationState() != "success" ? 
                                      <HelpBlock>用户名需多于6个字符</HelpBlock>
                                      : ''
                        }
                        {this.state.whetherUser == 3  ? 
                                      <HelpBlock>用户名已经存在</HelpBlock>
                                      : ''
                        }          
                    </InputGroup>
                </FormGroup>
                
                <FormGroup 
                    controlId="regisFormHorizontalPassword"
                    style={styles.formGroup}
                >
                    <InputGroup style={styles.input}>
                      <InputGroup.Addon style={{border:0}}><i class="fas fa-key"></i></InputGroup.Addon>
                      <FormControl  
                        type="password"  
                        style={{height:50, border:0, backgroudColor:'white'}}
                        placeholder="密码" 
                        inputRef={ref => { this.userNamePassword = ref; }}
                        />
                    </InputGroup>
                </FormGroup>
    
                <FormGroup 
                    controlId="regisFormHorizontalRepeatPassword"
                    style={styles.formGroup}
                >
                    <InputGroup style={styles.input}>
                      <InputGroup.Addon style={{border:0}}><i class="fas fa-key"></i></InputGroup.Addon>
                      <FormControl  
                        type="password"  
                        style={{height:50, border:0, backgroudColor:'white'}}
                        placeholder="确认密码" 
                        inputRef={ref => { this.userNameRepeatPassword = ref; }}
                        />
                    </InputGroup>
                    {this.state.whetherPassword == 1 ? 
                        <HelpBlock>两次输入密码不一致或为空</HelpBlock>
                        : ''
                    }
                </FormGroup>
            
                <FormGroup 
                    style={{marginTop:50}}>
                    <Button type="submit" 
                        bsStyle="warning"
                        style={{
                            width:'100%', 
                            borderRadius:20, 
                            height:40, 
                            color:'#fff',
                            fontSize:17,
                        }}>注册</Button>
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