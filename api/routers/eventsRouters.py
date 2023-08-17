from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from queries.eventsQueries import EventQueries, EventsOut, EventsListOut,EventIn
from psycopg.errors import ForeignKeyViolation

router = APIRouter()


@router.get("/api/events", response_model=EventsListOut)
def get_events(queries: EventQueries = Depends()):
    return {"events": queries.get_all_events()}


@router.get("/api/events/{event_id}", response_model=Optional[EventsOut])
def get_event(
    event_id: int,
    queries: EventQueries = Depends(),
):
    record = queries.get_event(event_id)
    if record is None:
        raise HTTPException(status_code=404, detail="No events found with id {}".format(event_id))
    else:
        return record


@router.delete("/api/events/{event_id}", response_model=bool)
def delete_event(
    event_id: int,
    queries: EventQueries = Depends()
):
    print(queries)
    queries.delete_events(event_id)
    return True


@router.post("/api/events", response_model=EventIn)
def create_event(
    event: EventIn,
    queries: EventQueries = Depends(),
):
    try:
        return queries.create_event(event)
    except ForeignKeyViolation as e:
        raise HTTPException(status_code=400, detail="Failed to create event due to foreign key violation with owner")
