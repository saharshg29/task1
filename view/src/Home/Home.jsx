import "./index.css"
// import Postcard from "./Postcard"
import axios from "axios"
import React, { useEffect, useState } from 'react'

function Home() {
    let [data, setData] = useState([])
    let userId = localStorage.getItem("id")
    let config = {
        method: 'get',
        url: '/api/allpost'
    };

    useEffect(() => {
        axios(config)
            .then(function (res) {
                setData(res.data.posts)
            })
            .catch(function (error) {
                console.log(error);
            });
    })

    const likePost = (id) => {
        axios(
            {
                method: "put",
                url: "/api/like",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                data: JSON.stringify({
                    postId: id,
                    userId
                })
            })
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const unlikePost = (id) => {
        axios(
            {
                method: "put",
                url: "/api/unlike",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                data: JSON.stringify({
                    postId: id,
                    userId
                })
            })
            .then(result => {
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    let id = localStorage.getItem("id")


    return (
        <>
            <div className="container" style={{ width: "70vw" }}>
                {
                    data.map((item) => {
                        return (
                            <>
                                <div key={item._id} className="card" style={{ width: "18rem", marginTop: "2rem" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                                        <p className="card-text">{item.body}</p>
                                        <span className="like" style={{ fontWeight: 'bold' }}>

                                            {
                                                item.likes.includes(id)
                                                    ? <div className="like-btn"
                                                        onClick={() => {


                                                            // console.log(user._id);
                                                            unlikePost(item._id)
                                                        }}>like:</div>
                                                    : <div className="like-btn"
                                                        onClick={() => {


                                                            // console.log(user._id);
                                                            likePost(item._id)
                                                        }}>like:</div>
                                            }

                                            {item.likes.length}</span>
                                    </div>
                                </div>
                            </>
                        )

                    })
                }
            </div>

        </>
    )
}

export default Home