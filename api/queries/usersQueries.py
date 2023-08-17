<<<<<<< HEAD

=======
import os
from psycopg_pool import ConnectionPool
from pydantic import BaseModel

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])

class UserOut(BaseModel):
    id: int
    username: str
    firstName: str
    lastName: str
    bio: str
    avatar: str

class UserListOut(BaseModel):
    users: list[UserOut]

class UserIn(BaseModel):
    username: str
    firstName: str
    lastName: str
    bio: str
    avatar: str


class UserQueries:
    def create_user(self, user:UserIn) -> UserOut:
         with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute (
                    """
                    INSERT INTO users (username, firstName, lastName, bio, avatar)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [
                        user.username,
                        user.firstName,
                        user.lastName,
                        user.bio,
                        user.avatar
                    ]
                )
                id = result.fetchone()[0]
                data = user.dict()
                return UserOut(id=id, **data)
>>>>>>> main
