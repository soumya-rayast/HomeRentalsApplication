import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import '../Styles/Register.scss'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RegisterPage = () => {
    const [formData, setformData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target
        setformData({
            ...formData, //kept previous data
            [name]: value,
            [name]: name === "profileImage" ? files[0] : value
        })

    }


    const [passwordMatch, setPasswordMatch] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
    })

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const register_form = new FormData();
    //         for (var key in formData) {
    //             register_form.append(key, formData[key])
    //         }
    //         const response = await fetch("http://localhost:3001/auth/register", {
    //             method: "POST",
    //             body: register_form
    //         })

    //         if (response.ok) {
    //             navigate("/login")
    //         }
    //     } catch (err) {
    //         console.log("Registration Failed!")
    //     }
    // }

    const handleSubmit = async () => {
        try {
            const register_form = new FormData();
            for (const key in formData) {
                register_form.append(key, formData[key]);
            }
    
            const response = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                body: register_form
            });
    
            if (!response.ok) {
                throw new Error(`Failed to register. Status: ${response.status}`);
            }
    
            // Registration successful, navigate to login page
            navigate("/login");
        } catch (error) {
            console.error("Error registering user:", error.message);
        }
    };
    

    return (
        <div className="register">
            <div className="register_content">
                <form action="" className='register_content_form' onSubmit={handleSubmit}>
                    <input type="text"
                        placeholder='First Name'
                        name='firstName'
                        value={formData.firstname}
                        onChange={handleChange}
                        required />

                    <input type="text"
                        placeholder='Last Name'
                        name='lastName'
                        value={formData.lastname}
                        onChange={handleChange}
                        required />

                    <input type="email"
                        placeholder='Email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required />

                    <input type="password"
                        placeholder='Password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        required />

                    <input type="password"
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required />

                    {!passwordMatch && (
                        <p style={{ color: 'red' }}>Passwords are not matched</p>
                    )}

                    <input id='image'
                        type="file"
                        name='profileImage'
                        onChange={handleChange}
                        accept='image/*'
                        required
                        style={{ display: 'none' }} />

                    <label htmlFor='image' >
                        {/* <FontAwesomeIcon icon="fa-light fa-upload" /> */}
                        <p> + Upload Your Photo </p>
                    </label>

                    {formData.profileImage && (
                        <img src={URL.createObjectURL(formData.profileImage)}
                            alt='progile photo'
                            style={{ maxWidth: "80px" }} />
                    )}
                    <button type='submit' disabled={!passwordMatch} >
                        Register
                    </button>
                </form>
                <a href="/login">Already Have an account? Log In here</a>
            </div>
        </div>
    )
}

export default RegisterPage
