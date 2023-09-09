import { useState ,useEffect} from "react";
import './EventCard.css';
import useToken from '@galvanize-inc/jwtdown-for-react';


const EventCard =({data,loadAttendees})=>{
const {fetchWithToken} = useToken();
  async function removeRsvp(attendee_id) {

    const url = `${process.env.REACT_APP_API_HOST}/api/attendees/${attendee_id}`;
    await fetchWithToken(url, 'DELETE');

    loadAttendees()}

    return (
      <>
      <div className="card">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-person"
          viewBox="0 0 16 16"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
        </svg>
        <div className="card_body">
          <h5>{data.name}</h5>
          <p className="card-text">{data.description}</p>
          <p className="card-text">Location:{data.location_id}</p>
          <p className="card-text">Attending:{data.num_of_attendees}</p>
          <p className="card-text">Start:{new Date(data.start_date).toLocaleString()}</p>
          <p className="card-text">End:{new Date(data.end_date).toLocaleString()}</p>
        </div>
        <div className="card-footer ">
          <button
            onClick={() => removeRsvp(data.event_id)}
            className="btn btn-danger"
          >
            Cancel RSVP
          </button>
        </div>
      </div>
   </> );
  }

export default function BookMarkedEvents() {
    const [attendees,setAttendees] = useState([])
    const {token,  fetchWithToken} = useToken();



    async function loadAttendees() {

      const data = await fetchWithToken(`${process.env.REACT_APP_API_HOST}/api/my/rsvps`);
        setAttendees(data.attendees);
    }


/* eslint-disable */
    useEffect(() => {
    if (token){
      loadAttendees();}
    }, [token]);
/* eslint-enable */

    return (
      <div className="Event">
        <div className ="card-container" >
          {attendees.map((attendee) => (
            <EventCard loadAttendees ={loadAttendees} data={attendee} key={attendee.user_id+attendee.event_id} />
          ))}
        </div>
      </div>
    );

}
