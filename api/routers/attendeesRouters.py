from fastapi import APIRouter, Depends, HTTPException
from psycopg.errors import ForeignKeyViolation


from queries.attendeesQueries import (
    AttendeesQueries,
    AttendeesIn,
    AttendeesListOut

)
from authenticator import authenticator


router = APIRouter()


@router.get("/api/attendees", response_model=AttendeesListOut)
def get_all_attendee(queries: AttendeesQueries = Depends()):
    return {"attendees": queries.get_all_attendee()}


@router.post("/api/attendees", response_model=AttendeesIn)
def create_attendee(event: AttendeesIn, queries: AttendeesQueries = Depends(), account_data: dict = Depends(authenticator.get_current_account_data)):
    try:
        return queries.create_attendee(event)
    except ForeignKeyViolation:
        raise HTTPException(status_code=500, detail="Failed to create attendee")


@router.delete("/api/attendees/{event_id}", response_model=bool)
def delete_event(event_id: int, queries: AttendeesQueries = Depends(),
                 account_data: dict = Depends(authenticator.get_current_account_data)
                 ):
    user_id = account_data["id"]
    try:
        queries.delete_attendee(event_id, user_id)
        return True
    except Exception:
        return False


@router.get("/api/my/rsvps", response_model=AttendeesListOut)
def get_all_RSVPS(queries: AttendeesQueries = Depends(), account_data: dict = Depends(authenticator.get_current_account_data)):

    user_id = account_data["id"]
    return {"attendees": queries.get_my_rsvps(user_id)}
