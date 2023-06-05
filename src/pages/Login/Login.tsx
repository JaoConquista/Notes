import TextField from "@mui/material/TextField";
import loginStyles from "./Login.module.css";
import {Main, Form} from "./stylesLogin"
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
  accessUser(value: string | null): void
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
  
        localStorage.setItem("access","true")

        accessUser(localStorage.getItem("access"))
  
        navigate("/notes")
      }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    userValidation()
    
  }

  

  return (
    <Main>
      <div>
        <h1>Entrar</h1>
      </div>
      <div style={{margin: "30px auto"}}>
        <ToastContainer/>
            <Form 
              onSubmit={handleSubmit}>
              <TextField
                id="login-input1"
                required
                label="E-mail"
                type="email"
                aria-required
                onChange={(e) => setUserLogin({...userLogin, email: e.target.value})}
              />
              <TextField
                id="login-input2"
                label="Password"
                type="password"
                aria-required
                autoComplete="current-password"
                onChange = {(e) => setUserLogin({...userLogin, senha: e.target.value})}
              />

              <SubmitButton name="Entrar"/>
            </Form>
      </div>
      <div>
      <p>Ainda não tem conta ? <Link to="/">Crie aqui !</Link></p>
      </div>
    </Main>
  );
};

export default Login;