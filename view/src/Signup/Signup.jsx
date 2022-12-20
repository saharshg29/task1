import "./index.css"
import { useNavigate } from "react-router-dom"
// import M from 'materialize-css'

import React, { useState } from 'react'

function Signup() {
    const [username, setusername] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const navigate = useNavigate()

    const PostData = () => {
        console.log({ username, email, password });
        let readyData = {
          username,
          password,
          email
        };
        fetch("/signup", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(readyData),
        })
          .then((res) => {
            res.json();
          })
          .then((data) => {
            if (data.error) {
              console.log(data);
            } else {
              console.log("Signup sucessfull");
              navigate("/login");
            }
          })
          .catch((err) => {
            console.log(err);              
            navigate("/login");
          });
      };
    
    
    return (
        <>
            <div className="container">
                <span className="header">Signup page</span>
                <div className="form">
                    <input type="text"
                        onChange={(e) => setusername(e.target.value)}
                        value={username} className="username" placeholder="username" />
                    <input type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} className="email" placeholder="email" />
                    <input type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} className="password" placeholder="password" />
                    <input
                        onClick={() => {
                            console.log({ username, email, password })
                            PostData()
                        }} type="button" value="Signup" />
                </div>
                <span>
                    Already have an account?
                    <span
                        className="to"
                        onClick={() => navigate('/login')}>
                        Login!
                    </span>
                </span>
            </div>

        </>
    )
}

export default Signup