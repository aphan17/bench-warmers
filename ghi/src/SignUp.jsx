import React, { useState} from "react";
import { useNavigate } from "react-router-dom";




export default function SignUpForm() {
    const [username, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [bio, setBio] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
         username:username,
         firstName:firstName,
         lastName:lastName,
         email:email,
         password:password,
         avatar:avatar,
         bio:bio,
        };

    const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      setUserName('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setAvatar('');
      setBio('');
      alert("SignUp Successful.Redirect to Profile Page")
      navigate("/login")
    } else {
      alert('An error occurred while creating a user.');

}
}

    function handleUserNameChange(event) {
    const { value } = event.target;
    setUserName(value);
  }

  function handleFirstNameChange(event) {
    const { value } = event.target;
    setFirstName(value);
  }

  function handleLastNameChange(event) {
    const { value } = event.target;
    setLastName(value);
  }

 function handleEmailChange(event) {
    const { value } = event.target;
    setEmail(value);
  }


  function handlePasswordChange(event) {
    const { value } = event.target;
    setPassword(value);
  }
  function handleAvatarChange(event) {
    const { value } = event.target;
    setAvatar(value);
  }
  function handleBioChange(event) {
    const { value } = event.target;
    setBio(value);
  }

    return (
      <div className="mx-auto border-success bg-light mb-3 mb-4 shadow p-3 mb-5 bg-body rounded" style={{width: "45rem", margin: "4rem"}}>
            <h1>Sign Up!</h1>
            <form onSubmit={handleSubmit} id="Create-User-Form">
              <div className="form-floating mb-3">
                <input
                  value={username}
                  onChange={handleUserNameChange}
                  placeholder="username"
                  required
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={firstName}
                  onChange={handleFirstNameChange}
                  placeholder="first name"
                  required
                  type="text"
                  name="first name"
                  id="first name"
                  className="form-control"
                />
                <label htmlFor="firstname">First Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={lastName}
                  onChange={handleLastNameChange}
                  placeholder="last name"
                  required
                  type="text"
                  name="last name"
                  id="last name"
                  className="form-control"
                />
                <label htmlFor="lastname">Last Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="email@example.com"
                  required
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                />
                <label htmlFor="reason">Email</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="password"
                  required
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                />
                <label htmlFor="password">
                  Password{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-lock"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                  </svg>
                </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={avatar}
                  onChange={handleAvatarChange}
                  placeholder="avatar"
                  required
                  type="text"
                  name="avatar"
                  id="avatar"
                  className="form-control"
                />
                <label htmlFor="Avatar">Avatar</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={bio}
                  onChange={handleBioChange}
                  placeholder="bio"
                  required
                  type="text"
                  name="bio"
                  id="bio"
                  className="form-control"
                />
                <label htmlFor="Bio">Bio</label>
              </div>
              <button className="btn btn-primary">Sign Up!</button>
            </form>
          </div>
    );
}
