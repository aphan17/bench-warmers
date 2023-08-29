import React, { useState, useEffect } from "react";


export default function SignUpForm() {
    const [username, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [bio, setBio] = useState("");


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

    const response = await fetch("http://localhost:8000/api/users", {
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
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
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
                <label htmlFor="style">Username</label>
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
                <label htmlFor="color">First Name</label>
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
                <label htmlFor="picture_url">Last Name</label>
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
                  type="text"
                  name="password"
                  id="password"
                  className="form-control"
                />
                <label htmlFor="reason">Password</label>
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
        </div>
      </div>
    );
}
