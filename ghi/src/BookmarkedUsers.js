import { useState, useEffect } from "react"
import useToken from '@galvanize-inc/jwtdown-for-react'

const BookmarkedUsers = () => {
    const [currentUser, setCurrentUser] = useState({});
    const [favorites, setFavorites] = useState([]);
    const { token } = useToken();
    const [loggedIn, setLoggedIn] = useState(false);


    const getCurrentUser = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/token`;
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}`},
            credentials: "include"
        });
        if (response.ok) {
            const data = await response.json();
            const currentUser = data.user;
            setCurrentUser(currentUser);
            setLoggedIn(true);
        } else {
            console.error("an error occured fetching the data");
        }
    }
    /* eslint-disable */
    useEffect(() => {
        if (token) {
            getCurrentUser();
        }
    }, [token]);
    /* eslint-enable */


    const getFavorites = async () => {
        if (currentUser.id) {
            const userID = currentUser.id;
            const url = `${process.env.REACT_APP_API_HOST}/api/favorites/${userID}`
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json();
                const favorites = data;
                setFavorites(favorites);
            } else {
                console.error("an error occured fetching data")
            }
        }
    }
    /* eslint-disable */
    useEffect(()=> {
        if (currentUser.id) {
            getFavorites();
        }
    }, [currentUser.id])
    /* eslint-enable */


    return (
        <div className="container">
            {loggedIn ?
            <div className="row justify-content-center">
                {favorites.map(favorite => {
                    return (
                        <div key={favorite.id} className="card w-50 col-md-4 mb-4">
                            <img src={favorite.fav_avatar} className="card-img-top" height="500px" alt="avatar pic"></img>
                            <div className="card-body">
                                <h5 className="card-title">Name: {favorite.fav_firstname} {favorite.fav_lastname}</h5>
                                <p className="card-subtitle mb-2 text-muted">{favorite.fav_location_gym}</p>
                                <p className="card-text">Bio: {favorite.fav_bio}</p>
                            </div>
                        </div>
                )})}
            </div>
            :
            <div className="alert alert-danger" role="alert">
                Please login!
            </div>
            }


        </div>
    );
}

export default BookmarkedUsers;
