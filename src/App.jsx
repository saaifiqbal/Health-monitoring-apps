import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import FirebaseData from "./data/FirebaseData";
import Login from './pages/login'
import Register from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<FirebaseData/>} />
      </Routes>
    </BrowserRouter>     
  );
}

export default App;
