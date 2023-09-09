import { useState, useEffect } from 'react';
import useToken from '@galvanize-inc/jwtdown-for-react';

function EventForm() {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [stateDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numAttendees, setNumAttendees] = useState('');
  const {token,  fetchWithToken} = useToken();
  const [userId, setUser] = useState({});
  const [location, setLocation] = useState('');
  const [locations, setLocations] = useState([]);

  async function fetchLocation() {
    const url = `${process.env.REACT_APP_API_HOST}/api/locations/`;

    const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();

    setLocations(data);
    }
  }



  const getUserData = async () => {
    if (token) {
      const url = `${process.env.REACT_APP_API_HOST}/api/accounts/`
      const result = await fetchWithToken(url);
      setUser(result.id);

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
         name: eventName,
         description: description,
         location_id: location,
         start_date: stateDate,
         end_date: endDate,
         creator_id: userId,
         num_of_attendees: numAttendees
        };

    if (token) {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/events`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })

    if (response.ok) {
      alert('Customer added successfully!');
      setEventName('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setNumAttendees('')
      setLocation('')
    } else {
      alert('An error occurred while adding customer.');
    }
  }
  }

   /* eslint-disable */
    useEffect(() => {
      if (token){
        getUserData();
        fetchLocation();

      }
    }, [token]);
   /* eslint-enable */

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new Event</h1>
          <form onSubmit={handleSubmit} id="create-event-form">
            <div className="form-floating mb-3">
              <input value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Event Name" required type="text" name="name" id="name" className="form-control" />
              <label htmlFor="firstName">Event Name</label>
            </div>
            <div className="form-floating mb-3">
              <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required type="text" name="description" id="description" className="form-control" />
              <label htmlFor="lastName">Description</label>
            </div>
            <div className="mb-3">
              <select value={location} onChange={(e) => setLocation(e.target.value)} required name="location_id" id="location_id" className="form-select">
                <option value="">Choose a gym</option>
                {locations.map(location => {
                  return (
                    <option key={location.id} value={location.gym}>{location.gym}</option>
                  )
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input value={stateDate} onChange={(e) => setStartDate(e.target.value)} placeholder="State Date" required type="datetime-local" name="start_date" id="start_date" className="form-control" />
              <label htmlFor="phone_number">State Date</label>
            </div>
            <div className="form-floating mb-3">
              <input value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" required type="datetime-local" name="end_date" id="end_date" className="form-control" />
              <label htmlFor="address">End Date</label>
            </div>
            <div className="form-floating mb-3">
              <input value={numAttendees} onChange={(e) => setNumAttendees(e.target.value)} placeholder="Number of Attendees" required type="int" name="num_of_attendees" id="num_of_attendees" className="form-control" />
              <label htmlFor="address">Number of Attendees</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}


export default EventForm;
