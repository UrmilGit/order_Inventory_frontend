import React, { useState } from 'react';
import axios from 'axios';
import '../component/css files/styles.css';
import register from '../component/images/RegisterImage.jpg';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons/fa

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // State to track password visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      if (emailValid(formData.emailAddress) === false) {
        throw new Error("Email is Invalid.");
       }
      const response = await axios.post('http://localhost:8085/api/v1/admin/', formData);
      console.log(response.data); // handle success, maybe redirect
    } catch (error) {
      
        alert(error.message) 
      
    }
  };

  const handleAdmin = () => {
    window.location.href = '/login';
  }

  const emailValid = (email) => {
    const regEx = /[a-zA-Z0-9.%+-]+[a-z0-9]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (!regEx.test(email)) {
        return false;
    }
    else {
        return true;
    }
}
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  

  return (
    <div className='outer-container'>
      <div class="container login-container py-5 h-100 mb-5" style={{ height: '60%', width: '50%' }}>
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div class="col-md-8 col-lg-7 col-xl-6">
            <img src={register} class="img-fluid" alt="Phone image" />
          </div>
          <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit}>
              <div data-mdb-input-init class="form-outline mb-4">
                <input type="text" id="form1Example13" class="form-control form-control-lg" name="username" value={formData.username} onChange={handleChange} />
                <label class="form-label" for="form1Example13">User Name</label>
              </div>
              <div data-mdb-input-init class="form-outline mb-4">
                <input type="email" id="form1Example13" class="form-control form-control-lg" name="email" value={formData.email} onChange={handleChange} />
                <label class="form-label" for="form1Example13">Email Address</label>
              </div>
              <div data-mdb-input-init class="form-outline mb-4">
                <input type={showPassword ? "text" : "password"} id="form1Example23" class="form-control form-control-lg" name="password" value={formData.password} onChange={handleChange} />
                <label class="form-label" for="form1Example23">Password</label>
                <span className="toggle-password" onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg btn-block" onClick={handleAdmin}>Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

