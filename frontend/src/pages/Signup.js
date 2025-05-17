import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css' // Add this import
import { handleError, handleSuccess } from '../util'
// Removed: import { handleError } from '../util'

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: ""
    })
    const navigate=useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }
    const handleSignup = async (e) => { // Make this function async
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return toast.error('All fields are required')
        }
        try {
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const {success, message,error} = result;
            if (success){
                handleSuccess(message);
                setTimeout(() => {navigate('/login')},1000);
            }else if (error){
                const details=error?.details[0].message;
                toast.error(details)
        }else if(!success){
            handleError(message);
        }
        console.log(result);
        }
        catch (err) {
            toast.error('Signup failed. Please try again.'); // Use toast for errors
        }
    }
    return (
        <div className='login-container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input onChange={handleChange} type="text" name="name" autoFocus placeholder="Enter your name" required value={signupInfo.name} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input onChange={handleChange} type="email" name="email" placeholder="Enter your email" required value={signupInfo.email} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input onChange={handleChange} type="password" name="password" placeholder="Enter your password" required value={signupInfo.password} />
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account?
                    <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup