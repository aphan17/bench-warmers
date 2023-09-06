import {useState, useEffect} from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';

const SwipingPageList = () => {
    const [users, setUsers] = useState([]);
    const { token, fetchWithToken} = useToken();
    const [currentUser, setCurrentUser] = useState({});
    const [favoritedUsers, setFavoritedUsers] = useState([]);


    const getUsers = async () => {
        const url = "http://localhost:8000/api/users/"
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
    useEffect(()=> {
        if (token) {
            getUsers();
        }
    }, [token]);


    const getCurrentUser = async () => {
    if (token) {
      const url = `http://localhost:8000/api/accounts/`
      const currentUser = await fetchWithToken(url);
      setCurrentUser(currentUser);
    }
    }
    useEffect(() => {
        getCurrentUser();
    }, [token]);


    const acceptFavoriteUser = async (userID, favoriteID) => {
        const url = `http://localhost:8000/api/favorites`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify({user_id: userID, favorite_id: favoriteID}),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const data = await response.json();
        }
    }





    return (
        <div className="card-deck">
            <div className = "row">
            {users.filter(user => user.id !== currentUser.id).map(user => {
                return (
                    <div key={user.id}>
                        <div className="card w-75 mb-3 shadow">
                            <img src={user.avatar} className="card-img-top" alt="avatar pic"></img>
                            <div className="card-body">
                                <h5 className="card-title">Name: {user.firstName} {user.lastName}</h5>
                                <p className="card-subtitle mb-2 text-muted">Preferred Gym Location</p>
                                <p className="card-text">Bio: {user.bio}</p>
                                <button type="button" onClick={()=> acceptFavoriteUser(currentUser.id, user.id)} className="btn btn-warning">Favorite</button>
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
