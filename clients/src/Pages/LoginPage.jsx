import React, { useState } from 'react'
import "../Styles/Login.scss"
import { setLogin } from '../Redux/State';
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"


const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })

      })
      // get after fetching
      const loggedIn = await response.json()
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate("/")
      }

    } catch (err) {
      console.log("Login failed",err.message)
    }
  }


  return (
    <div className='login'>
      <div className="login_content">

        <form action="" className="login_content_form" onSubmit={handleSubmit}>
          <input type="email"
            placeholder='Email'
            required value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <input type="password"
            placeholder='password'
            required value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <button type='submit'>LOG IN</button>
        </form>
        <a href="/register"> Don't have account? Sign in Here</a>
      </div>
    </div>
  )
}
export default LoginPage
