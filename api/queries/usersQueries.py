import os
from psycopg_pool import ConnectionPool
from typing import List, Literal
from pydantic import BaseModel
from typing import Union

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


class Error(BaseModel):
    message: str


class Error(BaseModel):
    message: str


class UserIn(BaseModel):
    username: str
    firstName: str
    lastName: str
    bio: str
    avatar: str


class UserQueries:
    def get_all_users(self) -> List[UserOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, username, firstName, lastName, bio, avatar
                    FROM users
                    ORDER BY firstName, lastName
                    """
                )
                result = []
                for record in cur:
                    user = UserOut(
                        id=record[0],
                        username=record[1],
                        firstName=record[2],
                        lastName=record[3],
                        bio=record[4],
                        avatar=record[5],
                    )
                    result.append(user)
                return result

    def get_one_user(self, id) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id,
                        firstName,
                        lastName,
                        username,
                        avatar,
                        bio
                    FROM users
                    WHERE id = %s
                    """,
                    [id],
                )
                record = cur.fetchone()
                if record:
                    user = UserOut(
                        id=record[0],
                        username=record[1],
                        firstName=record[2],
                        lastName=record[3],
                        bio=record[4],
                        avatar=record[5],
                    )
                    return user
                else:
                    return None

    def create_user(self, user: UserIn) -> UserOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
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
                            user.avatar,
                        ],
                    )
                    id = result.fetchone()[0]
                    data = user.dict()
                    return UserOut(id=id, **data)
        except Exception as e:
            return {'message': "could not create user"}

    def update_user(self, user_id:int, user:UserIn) -> Union[UserOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE users
                        SET username = %s
                         , firstName = %s
                         , lastName = %s
                         , bio = %s
                         , avatar = %s
                        WHERE id = %s
                        """,
                        [
                            user.username,
                            user.firstName,
                            user.lastName,
                            user.bio,
                            user.avatar,
                            user_id
                        ]
                    )
                data = user.dict()
                return UserOut(id=user_id, **data)
        except Exception as e:
            return {'message': "could not update user"}

    def delete_user(self, user_id) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [user_id],
                    )
        except Exception as e:
            print(e)
            return False
