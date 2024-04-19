import React, { useState } from 'react';
import '../component/css files/styles.css'; // Import CSS file for styling
import login from '../component/images/LoginImage.avif';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons/fa

const LoginPage = () => {
    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false); // State to track password visibility

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const { userName, password } = formData;

        try {
            const response = await fetch(`http://localhost:8085/api/v1/admin/search/${userName}`);
            if (response.ok) {
                const userData = await response.json();
                if (userData && userData.password == password) {
                    // Redirect or handle successful login
                    window.location.href = '/dashboard';
                } else {
                    alert('Invalid username or password!');
                }
            } else {
                alert('User not found!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while logging in');
        }
    };

    return (
        <div className='outer-container'>
            <div className="container login-container py-5 h-100" style={{ height: '60%', width: '50%' }}>
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src={login} className="img-fluid" alt="Phone image" />
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <h3>Sign In</h3>
                        <form onSubmit={handleLogin}>
                            <div className="form-outline mb-4">
                                <input type="text" className="form-control form-control-lg" name="userName" value={formData.userName} onChange={handleInputChange} required />
                                <label className="form-label">UserName</label>
                            </div>
                            <div className="form-outline mb-4">
                                <input type={showPassword ? "text" : "password"} className="form-control form-control-lg" name="password" value={formData.password} onChange={handleInputChange} required />
                                <label className="form-label">Password</label>
                                <span className="toggle-password" onClick={handleTogglePasswordVisibility}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={handleLogin}>Sign In</button>
                            <br />
                            <br />
                            <text>New User?<a href='/rform'>Create an account</a></text>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

