import React, {useState, useEffect} from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";

function UserProfilePage() {
    const {token, logout, fetchWithToken} = useToken();
    const [user, setUser] = useState({});
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


    const getUserData = async () => {
    if (token) {
      const url = `${process.env.REACT_APP_API_HOST}/api/accounts`;
      const result = await fetchWithToken(url);
      setUser(result);
    }
  };
   /* eslint-disable */
  useEffect(() => {
    getUserData();
  }, [token]);
   /* eslint-enable */

   if (!user.username){
    return(
      <>
      <div className="alert alert-danger" role="alert" style={{margin: "4rem"}}>
      Go sign in to see your profile sport ;^)
      </div>
      <img src="https://media2.giphy.com/media/Tnchbhzt4fQQM/giphy.gif?cid=6c09b952s9le1lamen8q7ad3ij2ks0e7sy7614vpkkgfml1z&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="get outta here"
       style={{
        display: "block",
        margin: "auto"}} />
      </>
    )
   } else {

    return (
      <div className="mx-auto border-success bg-light mb-3 mb-4 shadow p-3 mb-5 bg-body rounded" style={{width: "45rem", margin: "4rem"}} >
        <img src={user.avatar}
         alt="Cannot display user avatar"
         className=" rounded mx-auto d-block" width="165" height="165"/>
         <div className="card-body">
         <ul className="list-group ">
          <li className="list-group-item border bg-light">Username: {user.username}</li>
          <li className="list-group-item border bg-light">Full Name: {user.firstName} {user.lastName}</li>
          <li className="list-group-item border bg-light">Email: {user.email}</li>
          <li className="list-group-item border bg-light">Bio: {user.bio}</li>
          <li className="list-group-item border bg-light">Location: {user.location_gym}</li>
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
}
export default UserProfilePage;
