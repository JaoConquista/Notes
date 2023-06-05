import {useState} from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SubmitButton from "../../components/SubmitButton";
import createStyle from "./CreateAccount.module.css"

import {Link, useNavigate} from "react-router-dom"
import {createAccount} from "../../services/AccountServices"
import { Account } from "../../Interfaces/Account";
import { succesNotify } from "../../utils/toast";



const CreateAccount = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState<Account>({
    name: "",
    email: "",
    password: ""
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
    <div id={createStyle.create_account}>
      <div className="title">
        <h1>Crie sua conta no Notes !</h1>
      </div>
    <div id={createStyle.form_create_account}>
            <form onSubmit={handleSubmit} >
              <Box
              sx={{
                "& .MuiTextField-root": {width: "25ch", display: "flex", flexDirection: "column",
                  m: 1}
                }}
              >
                <TextField
                className="create-input"
                label="Nome"
                type="text"
                aria-required
                onChange={(e) => setUser({...user, name: e.target.value})}
              />
              <TextField
                className="create-input"
                required
                label="E-mail"
                type="email"
                aria-required
                onChange={(e) => setUser({...user, email: e.target.value})}
              />
              <TextField
                className="create-input"
                label="Password"
                type="password"
                aria-required
                autoComplete="current-password"
                onChange={(e) => setUser({...user, password: e.target.value})}
              /></Box>
            

              <SubmitButton name="Criar conta"/>
            </form>
    </div>
    <div>
    <p>Já tem a sua conta? <Link to="/login">Entre aqui !</Link></p>
    </div>
  </div>
  )
}

export default CreateAccount;