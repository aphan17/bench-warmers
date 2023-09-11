import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useToken();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(username, password);
    e.target.reset();
    navigate("/profile/page");
  };


  return (
    <div className="row justify-content-center">
      <div className="card mb-3 w-50">
        <h5 className="card-header">Login</h5>
        <div className="card-body">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-floating mb-3">
              <input
                name="username"
                type="text"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className="username">Username:</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="password"
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label">Password:</label>
            </div>
            <div>
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
