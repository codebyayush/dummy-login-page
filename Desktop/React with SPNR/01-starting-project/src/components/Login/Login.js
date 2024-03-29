import React, { useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

//email state
const emailReducer = (state, action) => {
    if(action.type === "USER_INPUT"){
        return {value: action.val, isValid: action.val.includes('@')}
    }
    if(action.type === "INPUT_BLUR"){
      return {value: state.value, isValid: state.value.includes('@')}
    }
    return {value: '', isValid: false}
}

//password state
const passReducer = (state, action) => {
  if(action.type === "USER_PASS"){
    return {value: action.val, isValid: action.val.length > 6}
    }
  if(action.type === "PASS_BLUR"){
      return {value: state.value, isValid: state.value.length > 6}
    }
  return {value: '', isValid: false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [passState, dispatchPass] = useReducer(passReducer, {value: '', isValid: null})
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null})

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value})

    setFormIsValid(
      emailState.isValid && passState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPass({type: 'USER_PASS', val: event.target.value})

    setFormIsValid(
      passState.isValid && emailState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPass({type: 'PASS_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.val}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passState.val}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
