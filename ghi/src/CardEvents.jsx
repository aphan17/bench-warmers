import { useState ,useEffect} from "react";
import './EventCard.css';
import Modal from './Modal'
import useToken from '@galvanize-inc/jwtdown-for-react';


const EventCard =({data,loadEvents})=>{
  const [toggleModal, setToggleModal] = useState(false);
  const {token, fetchWithCookie, fetchWithToken} = useToken();
  function handleToggleModal(){
    setToggleModal(!toggleModal)

  }
  async function UpdateNumAttendees(event_id) {
    if (token) {
    const url = `http://localhost:8000/api/event/${event_id}`;
    const GetResponse = await fetchWithToken(url);

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
        num_of_attendees: eventData.num_of_attendees + 1,
      }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };

    const response = await fetch(url, fetchOptions);

    if (response.ok) {
      loadEvents();

    }
  }}
    return (
      <>
      <div className="card">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-person"
          viewBox="0 0 16 16"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
        </svg>
        <div className="card_body">
          <h5>{data.name}</h5>

          <p className="card-text">{data.description}</p>

          <p className="card-text">Attending:{data.num_of_attendees}</p>
        </div>
        <div className="card-footer ">
          <button
            onClick={() => UpdateNumAttendees(data.id)}
            className="btn btn-success"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-check"
              viewBox="0 0 16 16"
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </svg>
          </button>
          <button className="btn btn-danger  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
          <button
            onClick={handleToggleModal}
            className="btn btn-success"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-check"
              viewBox="0 0 16 16"
            >
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
            </svg>
          </button>
        </div>

      </div>
      {toggleModal && <Modal handleToggleModal={handleToggleModal} event={data} ></Modal>}
   </> );
}

export default function CardEvents() {
    const [events,setEvents] = useState([])
    const {token, fetchWithCookie, fetchWithToken} = useToken();

    async function loadEvents() {
      if (token) {
      const response = await fetch("http://localhost:8000/api/events/");


      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
      }
    }}

    useEffect(() => {
      loadEvents();
    }, [token]);

    return (
      <div className="Event">
        <div className ="card-container" >
          {events.map((event) => (
            <EventCard loadEvents ={loadEvents} data={event} key={event.id} />
          ))}
        </div>
      </div>
    );

}
