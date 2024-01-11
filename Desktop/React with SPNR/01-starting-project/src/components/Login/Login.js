import React, { useReducer, useState, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../Context store/auth-context';

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const authCtx = useContext(AuthContext)

    const emailReducer = (state, action) => {

      if(action.type === 'INPUT_USER'){
        return {value: action.val, isValid: action.val.includes('@')}
      }
      if(action.type === 'INPUT_BLUR'){
        return {value: state.value, isValid: state.value.includes('@')}  
      }
      return {value: '', isValid: false}
    }

    const passReducer = (state, action) => {

      if(action.type === 'INPUT_USER'){
        return {value: action.val, isValid: action.val.trim().length > 6}
      }
      if(action.type === 'INPUT_BLUR'){
        return {value: state.value, isValid: state.value.trim().length > 6}  
      }
      return {value: '', isValid: false}
    }

    const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
    const [passState, dispatchPass] = useReducer(passReducer, {value: '', isValid: null});

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'INPUT_USER', val: event.target.value});

    setFormIsValid(
      emailState.isValid && passState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPass({type: 'INPUT_USER', val: event.target.value});

    setFormIsValid(
        emailState.isValid && passState.isValid
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: "INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    dispatchPass({type: "INPUT_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passState.value);
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
