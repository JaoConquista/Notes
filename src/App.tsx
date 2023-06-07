import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import "./App.css";
import PageNotes from "./pages/Notes/PageNotes";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/CreateAccount/CreateAccount";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<CreateAccount />}  />
            <Route path="/login" element={<Login/>} />
            <Route path="/notes" element={localStorage.getItem("access") == "true" ? <PageNotes/> : <Navigate to={"/login"}/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
