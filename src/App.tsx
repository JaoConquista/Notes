import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider, DefaultTheme } from "styled-components";
import light from "./styles/themes/light";
import dark from "./styles/themes/dark";
import PageNotes from "./pages/Notes/PageNotes";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import { useEffect, useState } from "react";
import GlobalStyle from "../global"
import AddNotePage from "../src/pages/AddNote/AddNotePage"
import { useTag } from "./hooks/useTag";
import usePersistedState from "./hooks/usePersistedState"

interface Component {
  component: JSX.Element
}

function App() {

  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', dark)

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
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

  const [tags] = useState(["Work", "Dreams", "Travel", "Food", "Study"])  

  useTag(tags)
 

  return (
    <div className="App">
        <ThemeProvider theme={theme}>
          <GlobalStyle/>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<CreateAccount />} />
              <Route path="/login" element={<Login />} />
              <Route path="/notes" element={<AuthenticatedRoute component={<PageNotes toggleTheme={toggleTheme} tags={tags}/>} />}/>
              <Route path="/notes/addNote" element={<AuthenticatedRoute component={<AddNotePage tags={tags}/>} />}/>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
    </div >

  );
}

export default App;


