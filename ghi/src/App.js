import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./Nav.js";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import UserProfilePage from "./ProfilePage.js";
import "./App.css";
import LoginForm from "./LoginForm.js";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
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
      <Nav />
        <div className="container">
        <AuthProvider baseUrl="http://localhost:8000">
          <Routes>
            <Route path="login" element={<LoginForm/>}></Route>

            <Route path="/" element={<Construct info={launchInfo} />} />

            <Route path="profile/">
              <Route path="page" element={<UserProfilePage />} />
            </Route>
          </Routes>
        </AuthProvider>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
