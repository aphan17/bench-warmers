import os
from psycopg_pool import ConnectionPool
from typing import List, Optional
from pydantic import BaseModel
from datetime import date, datetime

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class EventsOut(BaseModel):
    id: int
    creator_id: int
    name: str
    start_date: datetime
    end_date: datetime
    description: str
    num_of_attendees: int
    location_id: Optional[int] = None


class EventsIn(BaseModel):
    creator_id: int
    name: str
    start_date: datetime
    end_date: datetime
    description: str
    num_of_attendees: int
    location_id: Optional[int] = None


class EventsListOut(BaseModel):
    events: List[EventsOut]


class EventQueries:
    def get_all_events(self) -> List[EventsOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, creator_id,name,start_date,end_date,description,num_of_attendees,location_id
                    FROM events
                    ORDER BY id

                    """
                )

                result = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    result.append(EventsOut(**record))
                return result

    def create_event(self, event: EventsIn) -> EventsOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    INSERT INTO events (
                        creator_id, name, start_date, end_date, description, num_of_attendees, location_id
                    )
                    VALUES (%s, %s, %s, %s, %s,%s, %s)
                    RETURNING id
                    """,
                    [
                        event.creator_id,
                        event.name,
                        event.start_date,
                        event.end_date,
                        event.description,
                        event.num_of_attendees,
                        event.location_id
                    ],
                )

                id = result.fetchone()[0]
                data = event.dict()
                return EventsOut(id=id, **data)

    def get_event(self, id) -> EventsOut | None:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, creator_id, name, start_date, end_date, description, num_of_attendees, location_id
                    FROM events
                    WHERE id = %s
                    """,
                    [id],
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return EventsOut(**record)

    def delete_event(self, id) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM events
                        WHERE id = %s
                        """,
                        [id],
                    )
        except Exception as e:
            print(e)
            return False

    def update_event(self, event_id: int, event: EventsIn) -> EventsOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE events
                    SET creator_id = %s
                        , name = %s
                        , start_date = %s
                        , end_date = %s
                        , description = %s
                        , num_of_attendees = %s
                        , location_id = %s
                    WHERE id = %s
                    """,
                    [
                        event.creator_id,
                        event.name,
                        event.start_date,
                        event.end_date,
                        event.description,
                        event.num_of_attendees,
                        event.location_id,
                        event_id,

                    ],
                )
                old_data = event.dict()
                return EventsOut(id=event_id, **old_data)

    # def event_record_to_dict(self, row, description) -> EventsOut | None:
    #     event = None
    #     if row is not None:
    #         event = {}
    #         event_fields = [
    #             "event_id",
    #             "name",
    #             "start_date",
    #             "end_date",
    #             "description",
    #             "num_of_attendees"

    #         ]
    #         for i, column in enumerate(description):
    #             if column.name in event_fields:
    #                 event[column.name] = row[i]
    #         event["id"] = event["event_id"]
    #         user = {}
    #         user_fields = [
    #             "user_id",
    #             "first",
    #             "last",
    #             "avatar",
    #             "email",
    #             "username",
    #         ]
    #         for i, column in enumerate(description):
    #             if column.name in user_fields:
    #                 user[column.name] = row[i]
    #         user["id"] = user["user_id"]

    #         event["creator_id"] = user

    #         if "creator_id" in event:
    #             return EventsListOut(**event)
    #         else:
    #             return EventsOut(**event)
