import React, {useState, useEffect} from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useParams } from "react-router-dom";

function UserProfilePage() {
    const params = useParams();
    const {token, fetchWithCookie, fetchWithToken} = useToken();
    const [user, setUser] = useState({});

    const getUserData = async () => {
    if (token) {
      const url = `http://localhost:8000/api/accounts/`
      const result = await fetchWithToken(url);


      setUser(result);
    }
  }
  useEffect(() => {
    getUserData();
  }, [token]);

    return (
      <div className="mx-auto card border-success bg-light mb-3 mb-4 shadow p-3 mb-5 bg-body rounded " style={{width: "45rem"}} >
        <img src={user.avatar}
         alt="https://st.depositphotos.com/1742172/1357/v/950/depositphotos_13572851-stock-illustration-cartoon-dumbbell.jpg"
         className=" rounded mx-auto d-block" width="165" height="165"/>
         <div className="card-body">
         <ul className="list-group ">
          <li className="list-group-item border bg-light">Username: {user.username}</li>
          <li className="list-group-item border bg-light">Full Name: {user.firstName} {user.lastName}</li>
          <li className="list-group-item border bg-light">Email: {user.email}</li>
          <li className="list-group-item border bg-light">Bio: {user.bio}</li>
         </ul>
         </div>
        <div className="d-grid gap-2 d-md-flex justify-content-betweeen">
          <button className="btn btn-primary">Edit Profile</button>
          <button className="btn btn-danger">Logout</button>
        </div>
        {/* <div class="d-grid gap-2 d-md-flex justify-content-md-end">

        </div> */}
        </div>
    )
}
export default UserProfilePage;
