function Login() {

const [signUpFirstname, setSignUpFirstname] = useState("")
const [signUpUsername, setSignUpUsername] = useState("")
const [signUpPassword, setSignUpPassword] = useState("")

const [signInUsername, setSignUsername] = useState("")
const [signInPassword, setSignInPassword] = useState("")

const handleRegister = () => {
    fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: {"Content-Type": "application;json"},
        body: JSON.string({ firstname: signUpFirstname, username: signUpUsername, password: signUpPassword}).then(response => response.json())
        .then(data => {
            console.log(data)
        })
    })
}

    return (
        <div>
            <h1>Login</h1>
            <p>Sign-up</p>
            <input type="text" placeholder="Firstname" id="signUpFirstname" onChange={ (e) => setSignUpFirstname(e.target.value) } value={signUpFirstname} />
            <input type="text" placeholder="Username" id="signUpUsername" onChange={ (e) => setSignUpUsername(e.target.value) } value={signUpUsername} />
            <input type="text" placeholder="Password" id="signUpPassword" onChange={ (e) => setSignUpPassword(e.target.value) } value={signUpPassword} />
            <button id= "register" onClick={() => handleRegister()}>Register</button>
        </div>
        
    )
}

export default Login;