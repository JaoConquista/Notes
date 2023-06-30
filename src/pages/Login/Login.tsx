import { useContext } from 'react'
import TextField from "@mui/material/TextField";
import { Main, Form } from "./stylesLogin"
import SubmitButton from "../../components/SubmitButton";
import { Link, useNavigate } from "react-router-dom"
import { getAccount } from "../../services/AccountServices";
import { useEffect, useState } from "react";
import { Account } from "../../Interfaces/Account";
import { ToastContainer } from "react-toastify";
import { errorEmail, errorPassword } from "../../utils/toast";
import { useAuth } from "../../hooks/useAuth";
import { ThemeContext } from "styled-components";
import { Accordion } from '@mui/material';

type LoginProps = {
  email: string,
  senha: string
}

interface Props {
  userAuth: (user: Account ) => void
}

const Login = ({userAuth}: Props) => {

  const {colors} = useContext(ThemeContext)

  const navigate = useNavigate()

  const { auth } = useAuth()

  const [userLogin, setUserLogin] = useState<LoginProps>({
    email: "",
    senha: ""
  })

  const [userList, setUserList] = useState<Account[]>([])

  const [user, setUser] = useState<Account>()

  useEffect(() => {

    fetchUsers()

  }, [])


  const fetchUsers = async () => {

    const response = await getAccount()

    setUserList(response)
  }

  const userValidation = () => {

    const isEmailValid =
      userList.filter((user) => user.email == (userLogin.email)).length > 0

    const isPasswordValid =
      userList.filter((user) => user.password == (userLogin.senha)).length > 0

    const account:Account[]= 
      userList.filter((user) => user.email == (userLogin.email))

    setUser(account[0])

    if (!isEmailValid) {
      errorEmail()
    } else if (!isPasswordValid) {
      errorPassword()
    }

    if (isEmailValid && isPasswordValid) {

      userAuth(account[0])
 
      auth()

      setTimeout(() => navigate("/notes"), 1000)
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
      <div style={{ margin: "30px auto" }}>
        <ToastContainer />
        <Form
          onSubmit={handleSubmit}>
          <TextField
            id="login-input1"
            required
            sx={{
              color:`${colors.text2}`,
              '.MuiOutlinedInput-notchedOutline': {
                border: `1px solid ${colors.text2}`,
              }
            }}
            inputProps={{
              style: {color: `${colors.text2}`}
            }}
            InputLabelProps={{
              style: {color: `${colors.text2}`}
            }}
            label="E-mail"
            type="email"
            aria-required
            onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })}
          />
          <TextField
            id="login-input2"
            sx={{
              color:`${colors.text2}`,
              '.MuiOutlinedInput-notchedOutline': {
                border: `1px solid ${colors.text2}`,
              }
            }}
            inputProps={{
              style: {color: `${colors.text2}`}
            }}
            InputLabelProps={{
              style: {color: `${colors.text2}`}
            }}
            label="Password"
            type="password"
            aria-required
            autoComplete="current-password"
            onChange={(e) => setUserLogin({ ...userLogin, senha: e.target.value })}
          />

          <SubmitButton name="Entrar" />
        </Form>
      </div>
      <div>
        <p>Ainda não tem conta ? <Link to="/">Crie aqui !</Link></p>
      </div>
    </Main>
  );
};

export default Login;