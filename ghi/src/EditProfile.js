import { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function EditProfile(props) {
  const {token, logout} = useToken();
  const [username, setUsername] = useState(props.user.username);
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [email, setEmail] = useState(props.user.email);
  const [bio, setBio] = useState(props.user.bio);
  const [avatar, setAvatar] = useState(props.user.avatar);
  const [password, setPassword] = useState("")
  const [location, setLocation] = useState(props.user.location);

  const [allLocations, setAllLocations] = useState([]);
  const navigate = useNavigate();

  async function getListLocations() {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/locations/`);
    if (response.ok){
      const listLocations = await response.json();
      setAllLocations(listLocations);
    }
  }

  const logUserOut = async () => {
      logout();
      navigate("/login")
    };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  }
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  }
  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
  }
  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastName(value);
  }
  const handleBioChange = (event) => {
    const value = event.target.value;
    setBio(value);
  }
  const handleAvatarChange = (event) => {
    const value = event.target.value;
    setAvatar(value);
  }
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  }
  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocation(value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {};
    data.id = props.user.id;
    data.username = username;
    data.email = email;
    data.firstName = firstName;
    data.lastName = lastName;
    data.bio = bio;
    data.avatar = avatar;
    data.password = password;
    data.location_gym = location;

    const updateUrl = `${process.env.REACT_APP_API_HOST}/api/users/${data.id}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
             credentials: "include",
             Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
    const response = await fetch(updateUrl, fetchConfig);
    if (response.ok){
      logUserOut();
    }
  }
  /* eslint-disable */
  useEffect( () => {
    getListLocations();
  }, [])
  /* eslint-enable */
    return (
  <form onSubmit={handleSubmit} id="edit-user-form">
  <div className="mx-auto border-success bg-light mb-3 mb-4 shadow p-3 mb-5 bg-body rounded " style={{width: "45rem"}} >
    <div className="mb-3">
      <label htmlFor="Email">Email address</label>
      <input onChange={handleEmailChange}  value={email} type="text" className="form-control" id="email" placeholder="name@example.com" />
    </div>
    <div className="mb-3">
      <label htmlFor="Username">Username</label>
      <input onChange={handleUsernameChange} value={username} type="text" className="form-control" id="username"/>
    </div>
     <div className="mb-3">
      <label htmlFor="Password">Password</label>
      <input onChange={handlePasswordChange} value={password} type="text" className="form-control" id="password"/>
    </div>
    <div className="mb-3">
      <label htmlFor="Firstname">First name</label>
      <input onChange={handleFirstNameChange} value={firstName} type="text" className="form-control" id="firstName" />
    </div>
    <div className="mb-3">
      <label htmlFor="Lastname">Last name</label>
      <input onChange={handleLastNameChange} value={lastName} type="text" className="form-control" id="lastName" />
    </div>
    <div className="mb-3">
      <label htmlFor="Bio" className="form-label">Bio</label>
      <textarea onChange={handleBioChange} value={bio} className="form-control" id="bio" rows="3"></textarea>
    </div>
    <div className="mb-3">
      <label htmlFor="Avatar">Avatar</label>
      <input type="text" onChange={handleAvatarChange} value={avatar} className="form-control" id="avatar" placeholder="ImageUrl"/>
    </div>
    <div className="mb-3">
      <select id="Location" onChange={handleLocationChange} value={location} required name="location" className="form-select" >
      <option value="">Choose a location</option>
            {allLocations.map(location => {
            return (
            <option key={location.gym} value={location.gym}> {location.gym} </option>
            );
            })};
      </select>
    </div>
    <button className="btn btn-primary">Finalize changes</button>
  </div>
  </form>
    );
}
export default EditProfile;
