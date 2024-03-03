import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from '../src/routes/Login';
import Signup from '../src/routes/signup'; 
import Dashboard from '../src/routes/dashboard'; 
import { AuthProvider } from '../src/Autenticacion/AutProvider'; 
import Home from '../src/components/Home';
import Perfil from '../src/routes/perfil';
import ContactUs from '../src/routes/contactUs';

import Post from './pages/ParqueaderoF/ParqueaderoForm';
import Posts from './pages/DatosFrom/DatosForm';//./pages/posts/Posts

import PostInfo from './pages/DatosFrom/PostsInfo';//./pages/posts/PostsInfo

import Reservas from '../src/routes/Reservas';//./routes/Reservas



const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/post/:id/info" element={<PostInfo />} />
          <Route path="/reservas" element={<Reservas />} />
        
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

createRoot(document.getElementById('root')).render(<App />);
