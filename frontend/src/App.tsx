import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Client } from "./pages/Client";
import { Login } from "./pages/Login";

import { Update } from "./pages/Update";
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element= {<Navigate to="Home"/>}/>
          <Route path="/Home" element={ <Home/> } />
          <Route path="/Login" element= {<Login/>}/>
          <Route path="/Client" element= {<Client/>}/>
          <Route path="/Update/:id" element={<Update/>}/>
          
        </Routes>
        <Toaster/>
      </div>
    </BrowserRouter>
  );
}

export default App;
