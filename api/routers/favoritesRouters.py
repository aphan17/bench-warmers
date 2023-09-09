from fastapi import APIRouter, Depends, HTTPException
from typing import List
from queries.favoritesQueries import (
    FavoriteIn,
    FavoriteOut,
    FavoriteOutDetails,
    FavoriteQueries
)

router = APIRouter()


@router.post("/api/favorites", response_model=FavoriteOut)
def add_favorite_user(
    favorite: FavoriteIn,
    queries: FavoriteQueries = Depends(),
):
    return queries.add_favorite(favorite)


@router.get("/api/favorites/{user_id}", response_model=List[FavoriteOutDetails])
def get_user_favorites(
    user_id: int,
    queries: FavoriteQueries = Depends()
):
    record = queries.get_user_favorites(user_id)
    if record is None:
        raise HTTPException(status_code=404, detail="No user found with id")
    else:
        return record


@router.get("/api/favorites", response_model=List[FavoriteOut])
def get_all_favorites(
    queries: FavoriteQueries = Depends()
):
    return queries.get_all_favorites()
