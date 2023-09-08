import {useState, useEffect} from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';

const SwipingPageList = () => {
    const [users, setUsers] = useState([]);
    const { token } = useToken();
    const [currentUser, setCurrentUser] = useState({});
    const [favoritedUsers, setFavoritedUsers] = useState([]);


    const getCurrentUser = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/token/`;
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}`},
            credentials: "include"
        });
        if (response.ok) {
            const data = await response.json();
            const currentUser = data.user;
            setCurrentUser(currentUser);

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


    const getUsers = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/api/users/`
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` }
        })
        if (response.ok) {
            const data = await response.json();
            const users = data;
            setUsers(users);

        } else {
            console.error("An error occured fetching the data")
        }
    }

     /* eslint-disable */
    useEffect(()=> {
        if (token) {
            getUsers();
        }
    }, [token]);
    /* eslint-enable */


    const acceptFavoriteUser = async (userID, favoriteID) => {
        const url = `${process.env.REACT_APP_API_HOST}/api/favorites`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify({user_id: userID, favorite_id: favoriteID}),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const favoritedUsers = await response.json();
            setFavoritedUsers(favoritedUsers);
        }
    }



    return (
        <div className="container">
            <div className = "row justify-content-center">
            {users.filter(user => user.id !== currentUser.id).map(user => {
                return (
                    <div key={user.id} className="card w-75 col-md-4 mb-4 shadow">
                        <img src={user.avatar} className="card-img-top" height="500px" alt="avatar pic"></img>
                        <div className="card-body">
                            <h5 className="card-title">Name: {user.firstName} {user.lastName}</h5>
                            <p className="card-subtitle mb-2 text-muted">{user.location_gym}</p>
                            <p className="card-text">Bio: {user.bio}</p>
                            <div>
                                <button type="button" onClick={()=> acceptFavoriteUser(currentUser.id, user.id)} className="btn btn-warning" favoritedusers = {favoritedUsers}>Favorite</button>
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>

    );

}
export default SwipingPageList;
