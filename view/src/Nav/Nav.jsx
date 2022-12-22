import React,{useRef,useEffect} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import M from 'materialize-css'
const NavBar = ()=>{
    const  searchModal = useRef(null)
    
    let id = localStorage.getItem("id")
     const history = useNavigate()
     useEffect(()=>{
         M.Modal.init(searchModal.current)
     },[])
     const renderList = ()=>{
       if(id){
           return [
            <li key="3"><Link to="/create">Create Post</Link></li>,
            <li key="4"><Link to="/">Home</Link></li>,
            <li  key="5">
             <button className="btn #c62828 red darken-3"
            onClick={()=>{
              localStorage.clear()
              history('/login')
            }}
            >
                Logout
            </button>
            </li>          
           ]
       }else{
         return [
          <li  key="6"><Link to="/login">Signin</Link></li>,
          <li  key="7"><Link to="/signup">Signup</Link></li>
         
         ]
       }
     }


     
    return(
        <nav>
        <div className="nav-wrapper white">
          <ul id="nav-mobile" className="right">
             {renderList()}
  
          </ul>
        </div>
        
      </nav>
    )
}


export default NavBar
