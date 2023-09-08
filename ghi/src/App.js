import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from "./Nav.js";
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
import BookmarkedUsers from "./BookmarkedUsers.js";


function App() {

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');

  return (
    <div>
      <BrowserRouter basename={basename}>
      <Nav />
        <div className="container">
          <Routes>
            <Route path="/login" element={<LoginForm/>}></Route>

            <Route path="/profile/">
              <Route path="page" element={<UserProfilePage />} />
              <Route path="edit" element={<EditProfile />} />
            </Route>

            <Route path="/create/users" element={<SignUpForm/>}/>
            <Route path="/" element={<MainPage/>}/>

            <Route path="users" element={<SwipingPageList/>}/>

            <Route path="favorites/users" element={<BookmarkedUsers/>} />

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
