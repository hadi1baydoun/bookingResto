import"./navbar.css"
import {Link} from "react-router-dom";
import React, { useContext } from 'react'
import { AuthContext } from "../../context/AuthContext";
import { logout } from "../../utils/logout";

// function Navbar() {
//   const {user} = useContext(AuthContext);
//   return (
//     <div className="navbar">
//       <div className="navContainer">
//         <Link to={"/"} style={{color:"inherit", textDecoration: "none"}}><span className="logo">Resoresto</span></Link >
//        { user? user.username : (
//           <div className="navItems">
//           <Link to="/register" style={{textDecoration: "none"}}>
//           <button className="navButton">Register</button>
//           </Link>
//             <Link to="/login" style={{ textDecoration: "none" }}>
//               <button className="navButton">Login</button>
//             </Link>
//         </div>)}
//       </div>
//     </div>
//   )
// }

// export default Navbar

// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import "./navbar.css";

function Navbar() {
    const { user } = useContext(AuthContext);

    return (
      <div className="navbar">
      <div className="navContainer">
          <Link 
              to="/" 
              className="logo" 
              style={{ color: "inherit", textDecoration: "none" }}
          >
              Resoresto
          </Link>
                {user ? (
                    <div className="navItems">
                        <span className="username"> {user.username}</span>
                        <button className="navButton" onClick={logout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="navItems">
                        <Link to="/register">
                            <button className="navButton">Register</button>
                        </Link>
                        <Link to="/login">
                            <button className="navButton">Login</button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
