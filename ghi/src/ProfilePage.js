import React, {useState, useEffect} from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";

function UserProfilePage() {
    // const params = useParams();
    const {token, logout, fetchWithToken} = useToken();
    const [user, setUser] = useState({});
    const [location, setLocation] = useState({})
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    const logUserOut = async () => {
      logout();
      setUser({});
      navigate("/login")
    };

    const toggleModal = () => {
      setModalOpen(!modalOpen);
    };

    const getLocationName = async () => {
      if (user.location_id) {
        const locationId = (user.location_id).toString();
        const response = await fetch(`http://localhost:8000/api/location/${locationId}/`)

        if (response.ok){
          const location = await response.json();
          setLocation(location);
        } else {
          console.log("There was an issue getting that locations")
        }
      }
    }

    const updateUserData = async () => {
      console.log("UpdateUserData called")
      await getUserData();
    }

    const getUserData = async () => {
    if (token) {
      const url = `http://localhost:8000/api/accounts/`
      const result = await fetchWithToken(url);
      setUser(result);
    }
  };
  useEffect(() => {
    getUserData();
    getLocationName();
  }, [token]);


  let userExists = false;
  while (!userExists && !location.id){
    getLocationName();
    userExists = true;
  }

    return (
      <div className="mx-auto border-success bg-light mb-3 mb-4 shadow p-3 mb-5 bg-body rounded " style={{width: "45rem"}} >
        <img src={user.avatar}
         alt="Cannot display user avatar"
         className=" rounded mx-auto d-block" width="165" height="165"/>
         <div className="card-body">
         <ul className="list-group ">
          <li className="list-group-item border bg-light">Username: {user.username}</li>
          <li className="list-group-item border bg-light">Full Name: {user.firstName} {user.lastName}</li>
          <li className="list-group-item border bg-light">Email: {user.email}</li>
          <li className="list-group-item border bg-light">Bio: {user.bio}</li>
          <li className="list-group-item border bg-light">Location: {location.gym}</li>
         </ul>
         </div>
        <div className="d-grid gap-2 d-md-flex justify-content-between">
          <button data-bs-toggle="modal" onClick={() => toggleModal()} className="btn btn-primary">Edit Profile</button>
          <button onClick={() => logUserOut()} className="btn btn-danger">Logout</button>
        </div>
        {modalOpen && <EditProfile user={user} token={token} />}
      </div>
    );
}
export default UserProfilePage;
