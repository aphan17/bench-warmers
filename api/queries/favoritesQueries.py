import os
from psycopg_pool import ConnectionPool
from typing import List, Optional
from pydantic import BaseModel
from fastapi import HTTPException

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class FavoriteOut(BaseModel):
    id: int
    user_id: int
    favorite_id: int


class FavoriteIn(BaseModel):
    user_id: int
    favorite_id: int


class FavoriteOutDetails(BaseModel):
    id: int
    user_id: int
    favorite_id: int
    creator_username: str
    fav_username: str
    fav_firstname: str
    fav_lastname: str
    fav_bio: str
    fav_avatar: str
    fav_location_gym: Optional[str] = None


class FavoriteQueries:
    # post method to add a favorite
    def add_favorite(self, favorite: FavoriteIn) -> FavoriteOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id FROM favorites
                    WHERE user_id = %s AND favorite_id = %s
                    """,
                    [
                        favorite.user_id,
                        favorite.favorite_id,
                    ]
                )
                already_exists = cur.fetchone()
                if already_exists:
                    raise HTTPException(status_code=400, detail="Favorited pair already exists")
                else:
                    cur.execute(
                        """
                        INSERT INTO favorites (
                            user_id,
                            favorite_id
                        )
                        VALUES (%s, %s)
                        RETURNING id
                        """,
                        [
                            favorite.user_id,
                            favorite.favorite_id,

                        ],
                    )
                    id = cur.fetchone()[0]
                    data = favorite.dict()
                    return FavoriteOut(id=id, **data)

    # get a user's favorites
    def get_user_favorites(self, user_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT
                    f.id as id,
                    creatorUser.id AS user_id,
                    creatorUser.username AS creator_username,
                    f.favorite_id AS favorite_id,
                    favUser.username AS fav_username,
                    favUser.firstName as fav_firstname,
                    favUser.lastName as fav_lastname,
                    favUser.bio as fav_bio,
                    favUser.avatar as fav_avatar,
                    favUser.location_gym as fav_location_gym,
                    favUser.email as fav_email
                    FROM users creatorUser
                    INNER JOIN
                        favorites f ON creatorUser.id = f.user_id
                    INNER JOIN
                        users favUser ON f.favorite_id = favUser.id
                    WHERE user_id = %s
                    """,
                    [user_id],
                )
                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(FavoriteOutDetails(**record))
                return results

    # get the whole favorites tables for every user (may not need)
    def get_all_favorites(self) -> List[FavoriteOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT
                        f.id as id,
                        creatorUser.id AS user_id,
                        creatorUser.username AS creator_username,
                        f.favorite_id AS favorite_id,
                        favUser.username AS fav_username,
                        favUser.firstName as fav_firstname,
                        favUser.lastName as fav_lastname
                        favUser.bio as fav_bio,
                        favUser.avatar as fav_avatar,
                        favUser.location_gym as fav_location_gym
                        FROM users creatorUser
                        INNER JOIN
                            favorites f ON creatorUser.id = f.user_id
                        INNER JOIN
                            users favUser ON f.favorite_id = favUser.id
                        """
                    )
                    result = []
                    for row in cur.fetchall():
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        result.append(FavoriteOutDetails(**record))
                    return result
        except Exception as e:
            return e
