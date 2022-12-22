import "./index.css"
// import Postcard from "./Postcard"
import axios from "axios"
import React, { useEffect, useState } from 'react'

function Home() {
    let [data, setData] = useState([])
    let [comment, setComment] = useState("")
    let userId = localStorage.getItem("id")
    let config = {
        method: 'get',
        url: '/api/allpost'
    };

    useEffect(() => {
        getAllPost()
      }, []);

 
    //   GetListOfPost
      const getAllPost = ()=>{
        axios(config)
        .then(function (res) {
            setData(res.data.posts)
            setComment("")
        })
        .catch(function (error) {
            console.log(error);
        });
      }


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
                getAllPost()
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
                getAllPost()
            }).catch(err => {
                console.log(err)
            })
    }

    const makeComment = (text, id) => {
        console.log(text)
        axios(
            {
                url: "/api/comment",
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                data: JSON.stringify({
                    postId: id,
                    text: comment
                })
            }).then(result => {
                console.log(result)
                const newData = data.map(item => {
                    if (item._id === result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
                setComment("")

                getAllPost()
               
            }).catch(err => {
                console.log(err)
            })


    }

    const deletePost = (postid) => {
        axios(
            {
                method: "delete",
                url: `/api/deletepost/${postid}`,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            })
            .then(result => {
                console.log(result)
                const newData = data.filter(item => {
                    return item._id !== result._id
                })
                setData(newData)
                getAllPost()
            }).catch(err => console.log(err))
    }

    let id = localStorage.getItem("id")


    return (
        <>
            <div className="container" style={{ width: "70vw" }}>
                {
                    data.map((item) => {
                        //  {console.log(item.postedBy._id);}
                        return (
                            <>
                                <div key={item._id} className="card" style={{ width: "18rem", marginTop: "2rem" }}>

                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        {item.postedBy._id === id
                                            ? <h6 className="card-subtitle mb-2 text-muted"
                                                onClick={() => {
                                                    deletePost(item._id)
                                                }}
                                            >Delete Post</h6>
                                            : <></>
                                        }

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

                                            {item.likes.length}
                                        </span>
                                        {
                                            item.comments.map(record => {
                                                return (
                                                    <h6 key={record._id}><span style={{ fontWeight: "500" }}>{record.postedBy.name}</span> {record.text}</h6>
                                                )
                                            })
                                        }
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                            makeComment(comment, item._id)
                                        }}>
                                            <input type="text" onChange={(e) => setComment(e.target.value)}  placeholder="add a comment" />
                                            <button type="submit">Add Comment</button>
                                        </form>
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