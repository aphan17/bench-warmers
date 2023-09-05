import os
from psycopg_pool import ConnectionPool
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime


pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class EventsIn(BaseModel):
    creator_id: int
    name: str
    start_date: datetime
    end_date: datetime
    description: str
    num_of_attendees: int
    location_id: Optional[int] = None


class AttendeesOut(BaseModel):
    event_id: int
    user_id: int


class AttendeesIn(BaseModel):
    event_id: int
    user_id: int


class AttendeesOutWithEvent(AttendeesOut):

    name: str
    start_date: datetime
    end_date: datetime
    description: str
    num_of_attendees: int
    location_id: Optional[int] = None
    total_attendees: Optional[int] = None

#figure out how to include total attentdees


class AttendeesListOut(BaseModel):
    attendees: List[AttendeesOutWithEvent]


class AttendeesQueries:
    def get_all_attendee(self) -> List[AttendeesOutWithEvent]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT

                    event_id, user_id, name, start_date, end_date, description,
                    num_of_attendees, e.location_id

                    FROM attendees

                    JOIN
                        events e on event_id = e.id

                    JOIN
                        users on user_id = users.id

                    ORDER BY event_id

                    """
                )

                result = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    result.append(AttendeesOutWithEvent(**record))
                return result

    def create_attendee(self, attendee: AttendeesIn) -> AttendeesOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO attendees (
                        user_id, event_id
                    )
                    VALUES (%s, %s)
                    RETURNING user_id, event_id
                    """,
                    [
                        attendee.user_id,
                        attendee.event_id,

                    ],
                )

                row = cur.fetchone()
                print(cur.description)
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    print(record)
                    return AttendeesOut(**record)
                return None

    def delete_attendee(self, event_id, user_id) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM attendees
                        WHERE event_id = %s and user_id = %s
                        """,
                        [event_id, user_id],
                    )
        except Exception as e:
            print(e)
            return False

    def get_my_rsvps(self, user_id) -> List[AttendeesOutWithEvent]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT

                    event_id, user_id, name, start_date, end_date, description,
                    num_of_attendees, e.location_id

                    FROM attendees

                    JOIN
                        events e on event_id = e.id

                    JOIN
                        users on user_id = users.id

                    WHERE user_id = %s

                    ORDER BY event_id

                    """,
                    [
                        user_id
                    ]
                )

                result = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    result.append(AttendeesOutWithEvent(**record))
                print(result)
                return result
