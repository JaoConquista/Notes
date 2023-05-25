
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import loginStyles from "./Login.module.css";
import SubmitButton from "../../components/SubmitButton";
import {Link} from "react-router-dom"


const Login = () => {
  return (
    <div className={loginStyles.login}>
      <div>
        <h1>Login</h1>
      </div>
      <div id={loginStyles.login_inputs}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch", display: "flex"},
          }}
          noValidate
          autoComplete="off"
        >
            <form >
              <TextField
                id="login-input"
                required
                label="E-mail"
                type="email"
                aria-required
              />
              <TextField
                id="login-input"
                label="Password"
                type="password"
                aria-required
                autoComplete="current-password"
              />

              <SubmitButton name="Entrar"/>
            </form>

        </Box>
      </div>
      <div>
      <p>Ainda não tem conta ? <Link to="/">Crie aqui !</Link></p>
      </div>
    </div>
  );
};

export default Login;