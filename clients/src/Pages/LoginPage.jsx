import React, { useState } from 'react'
import "../Styles/Login.scss"
const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className='login'>
      <div className="login_content">

        <form action="" className="login_content_form">
          <input type="email" 
          placeholder='Email' 
          required value={email} 
          onChange={(e) => e.target.value} />
          <input type="password" 
          placeholder='password' 
          required value={password} 
          onChange={(e) => e.target.value}/>
          <button type='submit'>LOG IN</button>

        </form>
        <a href="/register"> Don't have account? Sign in Here</a>
      </div>
    </div>
  )
}

export default LoginPage
