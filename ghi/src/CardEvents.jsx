import { useState ,useEffect} from "react";
import './EventCard.css';
import useToken from "@galvanize-inc/jwtdown-for-react";

const EventCard =({data,loadEvents,userEvents,loadUserEvents})=>{
  const { token ,fetchWithToken} = useToken();
  const [shouldBeDisabled,setShouldBeDisabled] = useState(false);
  const [attend,setAttend] = useState("Attend")
  const [buttonColor,setButtonColor] =useState("btn btn-success")
  const [numOfAttendee,setNumOfAttendee] = useState(data.num_of_attendees)

  

  function FinalFunction(){
    UpdateNumAttendees(data.id);
    createRsvp(data.id);
    
  }

  useEffect(() => {
    const shouldBeDisabled = userEvents.some((userEvent) => {
      return userEvent.event_id === data.id;
    });

    setShouldBeDisabled(shouldBeDisabled);
    if (shouldBeDisabled === true) {
      setButtonColor("btn btn-secondary");
      setAttend("Already Attending");
      setNumOfAttendee(data.num_of_attendees)
    }else{
      setNumOfAttendee(data.num_of_attendees -1)

    }
  }, [data,userEvents]);

  async function createRsvp(){
    const current_user_id = JSON.parse(atob(token.split(".")[1])).account.id
    const url = `${process.env.REACT_APP_API_HOST}/api/attendees`;
    const fetchOptions = {
      body:JSON.stringify({
        event_id:data.id,
        user_id:current_user_id
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };
    await fetchWithToken(url,'POST',{},fetchOptions);
    loadUserEvents()
}
  
  async function UpdateNumAttendees(event_id) {
    const fetchConfig = {
      method: "GET",
      headers: {
        Authenication: `Bearer ${token}`,
      },
      credentials: "include",
    };
    const url = `${process.env.REACT_APP_API_HOST}/api/event/${event_id}`;

    const GetResponse = await fetch(url,fetchConfig);
    let eventData ={}
    if(GetResponse.ok){
      eventData = await GetResponse.json()
    };

    const fetchOptions = {
      method: "PUT",
      body: JSON.stringify({
        creator_id: eventData.creator_id,
        name: eventData.name,
        start_date: eventData.start_date,
        end_date: eventData.end_date,
        description: eventData.description,
        num_of_attendees: eventData.num_of_attendees +0.5,
        location_id : eventData.location_id
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };

    const response = await fetch(url, fetchOptions);
    if (response.ok) {
      loadEvents();
    }
  }
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
            <p className="card-text">Attending:{numOfAttendee}</p>
            <p className="card-text">
              Start:{new Date(data.start_date).toLocaleString()}
            </p>
            <p className="card-text">
              End:{new Date(data.end_date).toLocaleString()}
            </p>
          </div>
          <div className="card-footer ">
            <button
              disabled={shouldBeDisabled}
              onClick={() => FinalFunction()}
              className={buttonColor}
            >
              {attend}
            </button>
          </div>
        </div>
      </>
    );
}

export default function CardEvents() {
  const [events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const { token, fetchWithToken } = useToken();

  async function loadEvents() {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/events`
    );
    if (response.ok) {
      const data = await response.json();
      setEvents(data.events);
    }
  }

  async function loadUserEvents() {
    const data = await fetchWithToken(
      `${process.env.REACT_APP_API_HOST}/api/my/rsvps`
    );
    setUserEvents(data.attendees);
  }
  
  /* eslint-disable */
  useEffect(() => {
    if (token) {
      loadEvents();
      loadUserEvents();
    }
  }, [token]);
  /* eslint-enable */

  return (
    <div className="Event">
      <div className="card-container">
        {events.map((event) => (
          <EventCard
            loadUserEvents={loadUserEvents}
            userEvents={userEvents}
            loadEvents={loadEvents}
            data={event}
            key={event.id}
          />
        ))}
      </div>
    </div>
  );
}
