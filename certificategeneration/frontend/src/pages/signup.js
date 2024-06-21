import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Validation from './Signupauth.js';

const takebgpink={
  backgroundColor:'#ffc0cb',
};

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (!validationErrors.name && !validationErrors.email && !validationErrors.password) {
      axios.post('http://localhost:8081/', values)
        .then((res) => {
          navigate('/login');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
    <div style={takebgpink}>
      <div className="d-flex justify-content-center align-items-center {takebgpink} vh-100">
      <div className="bg-white p-3 rounded w-50 w-md-50 w-lg-25">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="name" onChange={handleInput} className="form-control rounded-0"/>
          </div>
          {errors.name && <span className="text-danger">{errors.name}</span>}
          <div className="mb-3">
            <label htmlFor="email"><b>Email</b></label>
            <input type="email" placeholder="Enter email id" name="email" onChange={handleInput} className="form-control rounded-0"/>
          </div>
          {errors.email && <span className="text-danger">{errors.email}</span>}
          <div className="mb-3">
            <label htmlFor="password"><b>Password</b></label>
            <input type="password" placeholder="Enter password" name="password" onChange={handleInput} className="form-control rounded-0"/>
          </div>
          {errors.password && <span className="text-danger">{errors.password}</span>}
          <button type="submit" className="btn btn-success w-100">Register</button>
          <p className="mt-3">Already have an account?</p>
          <button className="btn btn-default border w-100">
            <a href="./login" className="text-decoration-none">Login here !</a>
          </button>
        </form>
      </div>
    </div>
    </div>
    </>
  );
}

export default Signup;
