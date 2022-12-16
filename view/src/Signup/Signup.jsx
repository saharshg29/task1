import "./index.css"
import { useNavigate } from "react-router-dom"

import React from 'react'

function Signup() {
    const navigate = useNavigate()
    return (
        <>
            <div className="container">
                <span className="header">Signup page</span>
                <div className="form">
                    <input type="text" className="username" placeholder="username" />
                    <input type="email" className="email" placeholder="email" />
                    <input type="password" className="password" placeholder="password" />
                    <input type="button" value="Signup" />
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