import React, { useState } from 'react';
import styles from '../styles/Login.module.css';

function SignIn() {
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: signInUsername, password: signInPassword })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
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