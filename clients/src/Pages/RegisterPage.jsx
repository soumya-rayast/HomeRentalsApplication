import React, { useState } from 'react'
import '../Styles/Register.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RegisterPage = () => {
    const [formData, setformData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null
    })

    const handleChange =(e) =>{
        const {name,value,files} = e.target 
        setformData({
            ...formData,
            [name]:value,
            [name]:name === "profileImage" ? files[0] :value
        })

    }

    return (
        <div className="register">
            <div className="register_content">
                <form action="" className='register_content_form'>
                    <input type="text"
                        placeholder='First Name'
                        name='firstname'
                        value={formData.firstname}
                        required />
                    <input type="text"
                        placeholder='Last Name'
                        ame='lastname'
                        value={formData.lastname}
                        required />
                    <input type="email"
                        placeholder='Email'
                        name='email'
                        value={formData.email}
                        required />
                    <input type="password"
                        placeholder='Password'
                        name='password'
                        value={formData.password}
                        required />
                    <input type="password"
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        required />
                    <input id='image' type="file" name='profileimage' accept='image/*' required style={{ display: 'none' }} />
                    <label htmlFor='image' >
                        <FontAwesomeIcon icon="fa-light fa-upload" />
                        <p> + Upload Your Photo </p>
                    </label>
                    <button type='submit'>Register</button>
                </form>
                <a href="/login">Already Have an account? Log In here</a>
            </div>
        </div>
    )
}

export default RegisterPage


// 29 