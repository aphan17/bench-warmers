import os
from psycopg_pool import ConnectionPool
from typing import List
from pydantic import BaseModel

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class LocationOut(BaseModel):
    id: int
    gym: str


class LocationQueries:
    def get_all_locations(self) -> List[LocationOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, gym
                    FROM locations
                    ORDER BY gym
                    """
                )
                result = []
                for record in cur:
                    location = LocationOut(
                        id=record[0],
                        gym=record[1],
                    )
                    result.append(location)
                return result

    def get_one_location(self, id) -> LocationOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, gym
                    FROM locations
                    WHERE id = %s
                    """,
                    [id],
                )
                record = cur.fetchone()
                if record:
                    location = LocationOut(
                        id=record[0],
                        gym=record[1],
                    )
                    return location
                else:
                    return None
