import { NavLink } from "react-router-dom";

function Nav() {
return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">Home</NavLink>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="collapse navbar-collapse" id="navbarSupportedContent">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profile/page">Profile</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="login">Log in</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
)
}

export default Nav;