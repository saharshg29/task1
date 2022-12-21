import "./index.css"
import { useNavigate } from "react-router-dom"
import axios from 'axios';


import React, { useState } from 'react'

function Login() {
  const [username, setUsername] = useState(undefined)
  const [password, setPassword] = useState(undefined)
  const navigate = useNavigate()
  const PostData = () => {
    if (!username || !password) {
      navigate("/login");
    }
    let data = JSON.stringify({
      username,
      password
    })

    axios(
      {
        method: "post",
        url: "/login",
        headers: {
          'Content-Type': 'application/json'
        },
        data: data

      }
    )
      .then(function (res) {
        console.log(res)
        if (!res.data) {
          console.log("Seems like user could not found");
          navigate("/signup");
        } else {
          localStorage.setItem("jwt", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("id", res.data.user._id)
          navigate("/")
        }
      })
      .catch((err) => console.log("error while logging in", err.response.data))


  }

  return (
    <>
      <div className="container">
        <span className="header">Log In page</span>
        <div className="form">
          {/* <input type="text" className="username" placeholder="username" /> */}
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            value={username}
            className="username" placeholder="username" />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password" className="password" placeholder="password" />
          <input
            onClick={() => {
              // console.log({ username, password })
              PostData()
            }}
            type="button" value="Login" />
        </div>
        <span>Don't have an account?
          <span
            className="to"
            onClick={() =>
              navigate('/signup')}>
            Signup!
          </span>
        </span>
      </div>

    </>
  )
}

export default Login