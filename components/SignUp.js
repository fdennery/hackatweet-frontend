import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../reducers/user';
import { useRouter } from 'next/router';

function SignUp() {
  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value)

  const handleRegister = () => {
    fetch("http://localhost:3000/users/signup" ,  {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname: signUpFirstname, username: signUpUsername, password: signUpPassword })
    }
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if ( data.result) {
      dispatch(login({token: data.token, username:signUpUsername}))
      setSignUpFirstname('');
      setSignUpUsername('');
      setSignUpPassword('');
      router.push('/')
      }
})
    )}

  return (
    <div className={styles.registerSection}>
      <p>Sign-up</p>
      <input type="text" placeholder="Firstname" id="signUpFirstname" onChange={(e) => setSignUpFirstname(e.target.value)} value={signUpFirstname} />
      <input type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} />
      <input type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
      <button id="register" onClick={handleRegister}>Register</button>
    </div>
  );
}

export default SignUp;