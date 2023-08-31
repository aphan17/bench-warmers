

export default function Modal({ event, handleToggleModal }) {

  return (


    <div

      style={{ position: "absolute", background: "rgba(0,0,0,0.6)", height: "100%", width: "100%", top: "0", left: "0" }}

      onClick={handleToggleModal}
    >
       <div style={{width: "100%", height: "25%", background: "white"}}> hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii {event.id} </div>
      </div>


  )
}
