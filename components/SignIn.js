import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';

function SignIn() {
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);

  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: signInUsername, password: signInPassword })
    })
    .then(response => response.json())
    .then(data => {
      if (data.result){
        dispatch(login({token: data.token, username: signInUsername}));
        router.push('/');
      }
    });
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
      <h2 className={`${styles.authTitle} ${styles['authTitle-dark']}`}>Connect to Hackatweet</h2>
        <input type="text" placeholder="Username" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername}  className={`${styles.authInput} ${styles['authInput-dark']}`} />
        <input
  type="password"
  placeholder="Password"
  onChange={(e) => setSignInPassword(e.target.value)}
  value={signInPassword}
  className={`${styles.authInput} ${styles['authInput-dark']}`}
/>
        <button onClick={handleConnection} className={styles.authButton}>Sign in</button>
      </div>
    </div>
  );
}

export default SignIn;