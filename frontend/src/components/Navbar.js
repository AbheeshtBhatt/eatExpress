import React, { useState } from 'react'
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';


function Navbar() {
  const [cartView,setCartView]=useState(false);
  let data=useCart();

  const navigate=useNavigate();

const handleLogout=()=>{
  localStorage.removeItem("authToken");
  navigate('/login');
}

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{position:'fixed',zIndex:'1000',width:'100%',top:'0'}}>
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fw-bold" to="/">EatExpress</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-1">
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
        </li>
        {
          localStorage.getItem("authToken")?
          <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My orders</Link>
        </li>
        :""}
      </ul>
      {
        !localStorage.getItem("authToken")?
 <div className='d-flex'>
      
      <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
  
      <Link className="btn bg-white text-black mx-1" to="/createuser">Signup</Link>
  
  </div>
      :
      <div>
      <div className='btn bg-white text-black mx-1' onClick={()=>setCartView(true)}>
       My Cart {"  "}
       <Badge pill bg='success' >{data.length}</Badge>
      </div>
      {cartView?<Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
      <div className='btn bg-white text-danger mx-1' onClick={handleLogout}>
        Logout
      </div>
      </div>
        }
      
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
