import {BrowserRouter, Routes, Route} from "react-router-dom"

import "./App.css";
import PageNotes from "./pages/Notes/PageNotes";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/CreateAccount/CreateAccount";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CreateAccount/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/notes" element={<PageNotes/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
