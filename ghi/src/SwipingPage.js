import {useState, useEffect} from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';

const SwipingPageList = () => {
    const [users, setUsers] = useState([]);
    const { token, fetchWithToken} = useToken();
    const [currentUser, setCurrentUser] = useState({});

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
                                <div className="d-grid gap-2 d-md-flex justify-content-between">
                                    <button type="button" className="btn btn-success">Accept</button>
                                    <button type="button" className="btn btn-danger">Reject</button>
                                </div>
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
