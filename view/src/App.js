import './App.css';
import Signup from './Signup/Signup';
import Login from './Login/Login';
// import Postcard from './Home/Postcard';
import Home from "./Home/Home"
import {Route, Routes} from "react-router-dom"
import Createpost from './CreatePost/CreatePost';
import Nav from './Nav/Nav';
function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/create' element={<Createpost />} />
      </Routes>
    </div>
  );
}

export default App;
