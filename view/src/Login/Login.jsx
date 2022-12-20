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
    // axios.post("/login",)
    fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
        if (!data) {
          console.log("Seems like user could not found");
          navigate("/signup");
        } else {

          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      })
      .catch((err) => console.log("error while logging in", err));
  };
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
            console.log({username, password})
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