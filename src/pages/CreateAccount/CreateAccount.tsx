import { useState, useContext } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SubmitButton from "../../components/Buttons/SubmitButton";
import createStyle from "./CreateAccount.module.css"
import { CreatAccount } from "./style";

import { Link, useNavigate } from "react-router-dom"
import { createAccount } from "../../services/AccountServices"
import { IUser } from "../../Interfaces/Account";
import { succesNotify } from "../../utils/toast";
import { ThemeContext } from "styled-components";



const CreateAccount = () => {

  const navigate = useNavigate()

  const { colors } = useContext(ThemeContext);

  const [user, setUser] = useState<IUser>({
    id: 0,
    name: "",
    email: "",
    password: "",
    image: ""
  })


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {

      createAccount(user)

      succesNotify()

      setTimeout(() => navigate("/login"), 2500)

    } catch (error) {

      console.log(error)

    }
  }
  return (
    <CreatAccount>
      <div className="title">
        <h1>Crie sua conta no Notes !</h1>
      </div>
      <div id={createStyle.form_create_account}>
        <form onSubmit={handleSubmit} >
          <Box
            sx={{
              "& .MuiTextField-root": {
                width: "25ch", display: "flex", flexDirection: "column",
                m: 1
              }
            }}
          >
            <TextField
              className="create-input"
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
              label="Nome"
              type="text"
              aria-required
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            <TextField
              className="create-input"
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
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <TextField
              className="create-input"
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
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            /></Box>


          <SubmitButton name="Criar conta" />
        </form>
      </div>
      <div>
        <p>Já tem a sua conta? <Link to="/login">Entre aqui !</Link></p>
      </div>
    </CreatAccount>
  )
}

export default CreateAccount;