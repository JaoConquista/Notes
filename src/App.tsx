import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import "./App.css";
import PageNotes from "./pages/Notes/PageNotes";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import { useState } from "react";


function App() {

  const [accessUser, setAccessUser] = useState<boolean>(false)

  const authAccess = (access: boolean) => {
    setAccessUser(access)
  }

  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<CreateAccount />}  />
            <Route path="/login" element={<Login accessUser={authAccess}/>} />
            <Route path="/notes" element={accessUser ? <PageNotes/> : <Navigate to={"/login"}/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
