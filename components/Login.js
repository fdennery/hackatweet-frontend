import { useState } from 'react';
import styles from '../styles/Login.module.css'; 

function Login() {
  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleRegister = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname: signUpFirstname, username: signUpUsername, password: signUpPassword })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
  }

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
    <div className={styles.registerContainer}>
      <div className={styles.registerSection}>
        <p>Sign-up</p>
        <input type="text" placeholder="Firstname" id="signUpFirstname" onChange={(e) => setSignUpFirstname(e.target.value)} value={signUpFirstname} />
        <input type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} />
        <input type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
        <button id="register" onClick={handleRegister}>Register</button>
      </div>
      <div className={styles.registerSection}>
        <p>Sign-in</p>
        <input type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
        <input type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
        <button id="connection" onClick={handleConnection}>Connect</button>
      </div>
    </div>
  );
}

export default Login;