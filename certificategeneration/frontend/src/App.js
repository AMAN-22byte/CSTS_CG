// src/App.js

import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Templatelist from "./pages/templist";
import CertGen from "./pages/certgen";
import FormResults from "./components/formresults";
import Details from "./components/trailform";
import Login from "./pages/login";
import Signup from "./pages/signup";

import './App.css';
import TemplateList from './pages/templist';

// Mock function to check if the user is authenticated
// In real implementation, check the auth state (e.g., from localStorage, context, etc.)
// const isAuthenticated = () => {
//   return localStorage.getItem('token') !== null;
// };

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={isAuthenticated() ? <Navigate to="/templist" /> : <Login />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          {/* <Route path="/templist" element={isAuthenticated() ? <Templatelist /> : <Navigate to="/login" />} />
          <Route path="/certgen" element={isAuthenticated() ? <CertGen /> : <Navigate to="/login" />} />
          <Route path="/formresults" element={isAuthenticated() ? <FormResults /> : <Navigate to="/login" />} />
          <Route path="/trailform" element={isAuthenticated() ? <Details /> : <Navigate to="/login" />} /> */}
          <Route path="/templist" element={<TemplateList></TemplateList>} />
          <Route path="/certgen" element={<CertGen></CertGen>} />
          <Route path="/formresults" element={<FormResults></FormResults>} />
          <Route path="/trailform" element={<Details></Details>} />
          <Route path="/formresults" element={<FormResults></FormResults>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
