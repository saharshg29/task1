import "./index.css"
import { useNavigate } from "react-router-dom"
// import M from 'materialize-css'

import React, { useState } from 'react'
import axios from "axios"

function Signup() {
    const [username, setusername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    let data = JSON.stringify({
        username,
        password,
        email,
    })
    const uploadFields = () => {

        axios(
            {
                method: "post",
                url: "/signup",
                headers:
                {
                    "Content-Type": "application/json"
                },
                data: data
            })
            .then(res => {
                if (res.data.error) {
                    console.log(res.data.error)
                    // M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    // M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                    console.log("Successfully account created");
                    navigate('/login')
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const PostData = () => {

        uploadFields()

    }
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
                            // console.log({ username, email, password })
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