import os
from psycopg_pool import ConnectionPool
from typing import List, Literal
from pydantic import BaseModel
from typing import Union
from jwtdown_fastapi.authentication import Token

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class UserOut(BaseModel):
    id: int
    username: str
    firstName: str
    lastName: str
    email: str
    bio: str
    avatar: str


class UserListOut(BaseModel):
    users: list[UserOut]


class UserOutWithPassword(UserOut):
    password: str


class Error(BaseModel):
    message: str


class UserIn(BaseModel):
    username: str
    email: str
    firstName: str
    lastName: str
    password: str
    bio: str
    avatar: str


class UserToken(Token):
    user: UserOut


class HttpError(BaseModel):
    detail: str


class DuplicateUserNameError(ValueError):
    pass


class UserQueries:
    def get_all_users(self) -> List[UserOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, username, email, firstName, lastName, bio, avatar
                    FROM users
                    ORDER BY firstName, lastName
                    """
                )
                result = []
                for record in cur:
                    user = UserOut(
                        id=record[0],
                        username=record[1],
                        email=record[2],
                        firstName=record[3],
                        lastName=record[4],
                        bio=record[5],
                        avatar=record[6],
                    )
                    result.append(user)
                return result

    def get_one_user(self, email) -> UserOutWithPassword:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id,
                        firstName,
                        lastName,
                        username,
                        email,
                        avatar,
                        bio,
                        password
                    FROM users
                    WHERE email = %s
                    """,
                    [email],
                )
                record = cur.fetchone()
                if record:
                    user = UserOutWithPassword(
                        id=record[0],
                        firstName=record[1],
                        lastName=record[2],
                        username=record[3],
                        email=record[4],
                        avatar=record[5],
                        bio=record[6],
                        password=record[7],
                    )
                    return user
                else:
                    return None

    def create_user(
        self, user: UserIn, hashed_password: str
    ) -> UserOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    print(type(user.username))
                    result = cur.execute(
                        """
                        INSERT INTO users (
                            username,
                            email,
                            password,
                            firstName,
                            lastName,
                            bio,
                            avatar)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            user.username,
                            user.email,
                            hashed_password,
                            user.firstName,
                            user.lastName,
                            user.bio,
                            user.avatar,
                        ],
                    )
                    id = result.fetchone()[0]
                    data = user.dict()
                    return UserOutWithPassword(
                        id=id, **data, hashedPassword=hashed_password
                    )
        except Exception as e:
            return {"message": "could not create user"}

    def update_user(self, user_id: int, user: UserIn) -> Union[UserOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE users
                        SET username = %s
                         , email = %s
                         , password = %s
                         , firstName = %s
                         , lastName = %s
                         , bio = %s
                         , avatar = %s
                        WHERE id = %s
                        """,
                        [
                            user.username,
                            user.email,
                            user.password,
                            user.firstName,
                            user.lastName,
                            user.bio,
                            user.avatar,
                            user_id,
                        ],
                    )
                data = user.dict()
                return UserOut(id=user_id, **data)
        except Exception as e:
            return {"message": "could not update user"}

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

    def get_one_user_with_password(self, email) -> UserOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id,
                        firstName,
                        lastName,
                        username,
                        email,
                        avatar,
                        bio
                    FROM users
                    WHERE email = %s
                    """,
                    [email],
                )
                record = cur.fetchone()
                if record:
                    user = UserOut(
                        id=record[0],
                        firstname=record[1],
                        lastName=record[2],
                        username=record[3],
                        email=record[4],
                        avatar=record[5],
                        bio=record[6],
                    )
                    return user
                else:
                    return None
