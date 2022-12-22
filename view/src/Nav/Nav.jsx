import { useNavigate } from "react-router-dom"
import "./index.css"
import React from 'react'

function Nav() {
    let navigate = useNavigate()
    let logOut = () => {
        localStorage.clear()
    }
    if (!localStorage.getItem("token")) {
        
        return (
            <>
            <div className="top">
                <div className="nav">
                    <ul>
                        <li onClick={() => navigate("/login")}>Login</li>
                        <li onClick={() => navigate("/signup")}>Signup</li>
                    </ul>
                </div>
            </div>
            </>
        )
    }
    else {
        return (
    <>
    <div className="top">
        <div className="nav">
            <ul>
                <li onClick={() => navigate("/")}>Home</li>
                <li onClick={() => navigate("/create")}>Create </li>
                <li onClick={() => {
                    navigate("/login")
                    logOut()
                }}>Sign out</li>
            </ul>
        </div>
    </div>
    </>
  )
    }
  
}

export default Nav