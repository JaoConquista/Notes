import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "styled-components";
import light from "./themes/light";
import dark from "./themes/dark";
import "./App.css";
import PageNotes from "./pages/Notes/PageNotes";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import { useState } from "react";

interface Component {
  component: JSX.Element
}



function App() {

  const [theme, setTheme] = useState(light)

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
    console.log(theme)
  }
  const AuthenticatedRoute = ({ component }: Component) => {

    if (localStorage.getItem("auth") === "true") {

      return <>
        {component}
      </>
    } else {

      return <Navigate to={"/login"} />

    }
  }


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notes" element={<AuthenticatedRoute component={<PageNotes toggleTheme={toggleTheme} />} />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div >

  );
}

export default App;


