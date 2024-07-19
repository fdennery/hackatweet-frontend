import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import { useRouter } from 'next/router';
import Image from 'next/image';
import twitterImg from '../public/twitter.png';

function SignUp() {
  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);

  const handleRegister = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname: signUpFirstname, username: signUpUsername, password: signUpPassword })
    })
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        dispatch(login({token: data.token, username: signUpUsername}));
        setSignUpFirstname('');
        setSignUpUsername('');
        setSignUpPassword('');
        router.push('/');
      }
    });
  };

  return (
    <div className={styles.authContainer}>
      <div className={`${styles.authCard} ${styles['authCard-dark']}`}>
        <Image src={twitterImg} alt="Twitter Logo" width={50} height={50} />
        <h2 className={`${styles.authTitle} ${styles['authTitle-dark']}`}>Create your Hackatweet account</h2>
        <input type="text" placeholder="Firstname" onChange={(e) => setSignUpFirstname(e.target.value)} value={signUpFirstname} className={`${styles.authInput} ${styles['authInput-dark']}`} />
        <input type="text" placeholder="Username" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} className={`${styles.authInput} ${styles['authInput-dark']}`} />
        <input type="password" placeholder="Password" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} className={`${styles.authInput} ${styles['authInput-dark']}`} />
        <button onClick={handleRegister} className={styles.authButton}>Sign up</button>
      </div>
    </div>
  );
}

export default SignUp;