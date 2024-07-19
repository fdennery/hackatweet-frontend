import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../reducers/user';
import { useRouter } from 'next/router';


function SignIn() {
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value)


  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: signInUsername, password: signInPassword })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.result){
      dispatch(login({token: data.token, username:signInUsername}))
      router.push('/')
      }
    });
  }
  return (
    <div className={styles.registerSection}>
      <p>Sign-in</p>
      <input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
      <input type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
      <button id="connection" onClick={handleConnection}>Connect</button>
    </div>
  );
}

export default SignIn;