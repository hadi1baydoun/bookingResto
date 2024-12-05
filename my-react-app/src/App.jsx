import { useState } from 'react'

import './App.css'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home';
import List from './pages/list/List';
import Resto from './pages/resto/Resto';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import ReservationForm from './components/reservationForm/ReservationForm.jsx';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/resto" element={<List/>}/>
        <Route path="/resto/:id" element={<Resto/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/reservation" element={<ReservationForm/>} />
        
      </Routes>
    </BrowserRouter>
  );
  
}
export default App
