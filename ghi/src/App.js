import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./Nav.js";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import UserProfilePage from "./ProfilePage.js";
import "./App.css";
import EventForm from "./EventForm.js";
import SignUpForm from "./SignUp.jsx";
import LoginForm from "./LoginForm.js";
import CardEvents from "./CardEvents.jsx";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import SwipingPageList from "./SwipingPage.js";



function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);



  return (
    <div>
      {/* <ErrorNotification error={error} />
      <Construct info={launchInfo} /> */}
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

            <Route path="/create/users" element={<SignUpForm/>}/>


            <Route path="card/events" element={<CardEvents />}></Route>

            <Route path="users" element={<SwipingPageList/>}/>


            <Route path="card/events" element={<CardEvents />}></Route>
            <Route path="/create/event" element={<EventForm/>}></Route>
          </Routes>
        </AuthProvider>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
