import "./index.css"
import { useNavigate } from "react-router-dom"

import React from 'react'

function Login() {
  const navigate = useNavigate()
  return (
    <>
      <div className="container">
        <span className="header">Log In page</span>
        <div className="form">
          {/* <input type="text" className="username" placeholder="username" /> */}
          <input type="email" className="email" placeholder="email" />
          <input type="password" className="password" placeholder="password" />
          <input type="button" value="Login" />
        </div>
        <span>Don't have an account?
          <span
          className="to"
            onClick={() => navigate('/signup')}>
            Signup!
          </span>
        </span>
      </div>

    </>
  )
}

export default Login