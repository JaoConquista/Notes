import TextField from "@mui/material/TextField";
import loginStyles from "./Login.module.css";
import SubmitButton from "../../components/SubmitButton";
import {Link, useNavigate} from "react-router-dom"
import { getAccount } from "../../services/AccountServices";
import { useEffect, useState } from "react";
import { Account } from "../../Interfaces/Account";
import { ToastContainer } from "react-toastify";
import { errorEmail, errorPassword } from "../../utils/toast";

type LoginProps  = {
  email: string,
  senha: string
}

interface LoginProp {
  accessUser(value: boolean): void
}


const Login = ({accessUser}: LoginProp) => {

  const navigate = useNavigate()

  const [userLogin, setUserLogin] = useState<LoginProps>({
    email: "",
    senha: ""
  })

  const [userList, setUserList] = useState<Account[]>([])

  useEffect(() => {

      fetchUsers()
      
    }, [])


  const fetchUsers = async () => {
    
    const response = await getAccount()

    setUserList(response)
  }

  const userValidation = () => {

    const emailValidation =
      userList.filter((user) => user.email == (userLogin.email))

    const passwordValidation = 
      userList.filter((user) => user.password == (userLogin.senha))
    
    if(emailValidation.length < 1){
      errorEmail()
    } else if (passwordValidation.length < 1){
      errorPassword()
    }
      else if(emailValidation.length >= 1 && passwordValidation.length >= 1){
        console.log(emailValidation, passwordValidation)
  
        accessUser(true)
  
        navigate("/notes")
      }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    userValidation()
    
  }

  

  return (
    <div className={loginStyles.login}>
      <div>
        <h1>Login</h1>
      </div>
      <div id={loginStyles.login_inputs}>
        <ToastContainer/>
            <form 
              onSubmit={handleSubmit}>
              <TextField
                id="login-input"
                required
                label="E-mail"
                type="email"
                aria-required
                onChange={(e) => setUserLogin({...userLogin, email: e.target.value})}
              />
              <TextField
                id="login-input"
                label="Password"
                type="password"
                aria-required
                autoComplete="current-password"
                onChange = {(e) => setUserLogin({...userLogin, senha: e.target.value})}
              />

              <SubmitButton name="Entrar"/>
            </form>
      </div>
      <div>
      <p>Ainda não tem conta ? <Link to="/">Crie aqui !</Link></p>
      </div>
    </div>
  );
};

export default Login;