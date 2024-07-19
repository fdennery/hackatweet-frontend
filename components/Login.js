import React from 'react';
import styles from '../styles/Login.module.css'; 
import SignIn from './SignIn';
import SignUp from './SignUp';

function Login() {
  return (
    <div className={styles.registerContainer}>
      <SignUp />
      <SignIn />
    </div>
  );
}

export default Login;