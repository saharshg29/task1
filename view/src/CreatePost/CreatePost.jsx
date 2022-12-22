import { useNavigate } from "react-router-dom"
import "./index.css"
import React, { useState } from 'react'
import axios from "axios";



function Createpost() {
    let navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    let data = JSON.stringify({
        title,
        body,
    })

    const postDetails = () => {

        axios(
            {
                method: "post",
                url: "/api/createpost",
                headers:
                {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                data: data
            })
            .then(res => {
                if (res.data.error) {
                    console.log(res)
                    // M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    // M.toast({ html: data.message, classes: "#43a047 green darken-1" })
                    console.log("Posted Sucessfully");
                    navigate('/')
                }
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <>
       
            <div className="card input-filed"
                style={{
                    margin: "30px auto",
                    maxWidth: "500px",
                    padding: "20px",
                    textAlign: "center"
                }}
            >
                <input
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />

                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={() => postDetails()}

                >
                    Submit post
                </button>

            </div>
        </>
    )
}

export default Createpost