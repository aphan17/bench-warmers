import os
import psycopg_pool import ConnectionPool
from typing import List, Literal
from pydantic import BaseModel
from datetime import datetime

pool = ConnectionPool(connifo=os.environ["DATABASE_URL"])


class EventIn(BaseModel):
    name:str
    start_date: datetime
    end_date: datetime
    description: str
    num_of_attendees: int


class EventQueries:
    def get_all_events(self) -> List[EventsOut]:
        with pool.connection() as conn:
            # connect the database
            with conn.cursor() as cur:
                #get a cursor (something to run SQL with)
                cur.execute(
                    """
                    SELECT id, creator_id,name,start_date,end_date,description,num_of_attendees
                    FROM events
                    
                    """
                )

                result =[]
                for row in cur.fetchall():
                    record ={}
                    for i,column in enumerate(cur.description):
                        record[column.name] = row[i]
                    result.append(EventsOut(**record))

    

    def create_event(self,data) -> EventsOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params =[
                    data.name,
                    data.start_date,
                    data.end_date,
                    data.description,
                    data.num_of_attendees,
                ]
                cur.execute(
                    """
                    INSERT INTO events (name, start_date, end_date, description, num_
                    of_attendees)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING name, start_date, end_date, description, num_of_attendees, 

                    """,
                    params
                )
                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return EventsOut(**record)
            
    

    def get_event(self,id)-> EventsOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """

                    SELECT name,start_date,end_date,description,num_of_attendees
                    FROM events
                    WHERE id = %s
                    
                    """,
                    [id],
                )
                record = None
                row= cur.fetchone()
                if row is not None:
                    record ={}
                    for i, column in enumerate(cur.description):
                        record[column.name]=row[i]
                return EventsOut(**record)

            
    def delete_event(self, id) -> None:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM events
                    WHERE id = %s
                    """,
                    [id],
                )
