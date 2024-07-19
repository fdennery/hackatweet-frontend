import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../reducers/user';
import styles from '../styles/Login.module.css'; 
import { useRouter } from 'next/router';
import SignIn from './SignIn'
import SignUp from './SignUp'
import Head from 'next/head';

function Login() {

const dispatch = useDispatch();
const user = useSelector((state) => state.user.value)

  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const router = useRouter()




  return (
    <div className={styles.registerContainer}>
      <Head> <title>Hackatweet - Login</title>  </Head>
         
         <SignUp/>
     

         <SignIn/>
    
    </div>
  );
}

export default Login;