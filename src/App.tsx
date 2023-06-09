import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import "./App.css";
import PageNotes from "./pages/Notes/PageNotes";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import { useAuth } from "./hooks/useAuth"

interface Component {
  component: JSX.Element
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



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateAccount />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notes" element={<AuthenticatedRoute component={<PageNotes />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


