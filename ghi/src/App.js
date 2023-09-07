import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./Nav.js";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import UserProfilePage from "./ProfilePage.js";
import EditProfile from "./EditProfile.js";
import "./App.css";
import EventForm from "./EventForm.js";
import SignUpForm from "./SignUp.jsx";
import LoginForm from "./LoginForm.js";
import CardEvents from "./CardEvents.jsx";
import SwipingPageList from "./SwipingPage.js";
import BookMarkedEvents from "./BookMarkedEvents.js";
import MainPage from "./HomePage.js";



function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);


  return (
    <div>
      <BrowserRouter>
      <Nav />
        <div className="container">
          <Routes>
            <Route path="/login" element={<LoginForm/>}></Route>
            <Route path="/login" element={<LoginForm/>}></Route>

            <Route path="/" element={<Construct info={launchInfo} />} />

            <Route path="/profile/">
              <Route path="page" element={<UserProfilePage />} />
              <Route path="edit" element={<EditProfile />} />
            </Route>

            <Route path="/create/users" element={<SignUpForm/>}/>
            <Route path="/home" element={<MainPage/>}/>


            {/* <Route path="card/events" element={<CardEvents />}></Route> */}
            {/* <Route path="card/events" element={<CardEvents />}></Route> */}

            <Route path="users" element={<SwipingPageList/>}/>
            {/* <Route path="/card/events" element={<CardEvents />}></Route> */}

            {/* <Route path="/users" element={<SwipingPageList/>}/> */}
            <Route path="/card/events" element={<CardEvents />}></Route>

            {/* <Route path="/users" element={<SwipingPageList/>}/> */}


            <Route path="card/events" element={<CardEvents />}></Route>
            <Route path="/create/event" element={<EventForm/>}></Route>
            <Route path="/list/bookmarkedevents" element={<BookMarkedEvents/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
