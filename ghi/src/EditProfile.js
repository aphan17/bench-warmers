import { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function EditProfile(props) {
  const {token, logout, fetchWithToken} = useToken();
  const [username, setUsername] = useState(props.username);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [email, setEmail] = useState(props.email);
  const [bio, setBio] = useState(props.bio);
  const [avatar, setAvatar] = useState(props.avatar);

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

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {};
    data.id = props.id;
    data.username = username;
    data.firstName = firstName;
    data.lastName = lastName;
    data.email = email;
    data.bio = bio;
    data.avatar = avatar;

    const updateUrl = `http://localhost:8000/api/users/${data.id}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
            'Content-Type': 'application/json',
        },
    };
    const response = await fetchWithToken(updateUrl, fetchConfig);
    if (response.ok){
      console.log("Cool & Epic")
    }
  }

    return (
  <form onSubmit={handleSubmit} id="edit-user-form">
  <div className="mx-auto border-success bg-light mb-3 mb-4 shadow p-3 mb-5 bg-body rounded " style={{width: "45rem"}} >
    <div className="mb-3">
      <label htmlFor="email">Email address</label>
      <input onChange={handleEmailChange} defaultValue="DefaultEmail@gmail.com" value={email} type="email" className="form-control" id="email" placeholder="name@example.com" />
    </div>
    <div className="mb-3">
      <label htmlFor="Username">Username</label>
      <input onChange={handleUsernameChange} value={username} type="text" className="form-control" id="username"/>
    </div>
    <div className="mb-3">
      <label htmlFor="Username">First name</label>
      <input onChange={handleFirstNameChange} value={firstName} type="text" className="form-control" id="firstName" />
    </div>
    <div className="mb-3">
      <label htmlFor="lastName">Last name</label>
      <input onChange={handleLastNameChange} value={lastName} type="text" className="form-control" id="lastName" />
    </div>
    <div className="mb-3">
      <label htmlFor="bio" className="form-label">Bio</label>
      <textarea onChange={handleBioChange} value={bio} className="form-control" id="bio" rows="3"></textarea>
    </div>
    <div className="mb-3">
      <label htmlFor="avatar">Avatar</label>
      <input type="text" onChange={handleAvatarChange} value={avatar} className="form-control" id="avatar" placeholder="ImageUrl"/>
    </div>
    <button className="btn btn-primary">Finalize changes</button>
  </div>
  </form>
    );
}
export default EditProfile;
