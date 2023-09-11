import { NavLink } from "react-router-dom";
import "./Nav.css";
import useToken from '@galvanize-inc/jwtdown-for-react';


function Nav() {
  const { token } = useToken();
return (
<nav className="navbar navbar-expand-lg navbar-dark ">
    <div className="container-fluid">
      <NavLink className="navbar-brand text-dark" to="/">
        Home
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {token ?
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 dropdown">
          <li className="nav-item">
            <NavLink className="nav-link text-dark" aria-current="page" to="/profile/page" >
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-dark" aria-current="page" to="/users">Find Users</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-dark" aria-current="page" to="/favorites/users">Favorited Users</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-dark" aria-current="page" to="/card/events">
              Events
            </NavLink>
           </li>
            <li className="nav-item">
              <NavLink className="nav-link text-dark" aria-current="page" to="/create/event">Create Event</NavLink>
            </li>
            <li className="nav-item">
               <NavLink className="nav-link text-dark" aria-current="page" to="/list/bookmarkedevents">My RSVP'd Events</NavLink>
            </li>
        </ul>
          :
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link text-dark" aria-current="page" to="/create/users">
              Create Account
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link text-dark" aria-current="page" to="/login">
              Log in
            </NavLink>
          </li>
        </ul>
        }
        </div>

    </div>
  </nav>
);
}

export default Nav;
