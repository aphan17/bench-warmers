import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import SignUpForm from "./SignUp.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm.js";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
      let response = await fetch(url);
      let data = await response.json();

      if (response.ok) {
        setLaunchInfo(data.launch_details);
      } else {
        setError(data.message);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <ErrorNotification error={error} />
      <Construct info={launchInfo} />
      <BrowserRouter>
        <AuthProvider baseUrl="http://localhost:8000">
          <Routes>
            <Route path="login" element={<LoginForm />}></Route>
          </Routes>
          <Routes>
            <Route path="/create/users" element={<SignUpForm/>}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
