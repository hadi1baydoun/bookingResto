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

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/resto" element={<List/>}/>
        <Route path="/resto/:id" element={<Resto/>}/>
        
      </Routes>
    </BrowserRouter>
  );
  
}
export default App
