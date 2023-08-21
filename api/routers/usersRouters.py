from queries.usersQueries import UserIn, UserQueries, UserOut
from fastapi import APIRouter, Depends, Response, HTTPException
from typing import Optional, List, Union

# from pydantic import BaseModel
from queries.usersQueries import Error
from queries.usersQueries import (
    UserIn,
    UserOut,
    UserQueries,
)

router = APIRouter()


@router.get("/api/user/{user_id}", response_model=Optional[UserOut])
def get_one_user(
    user_id: int,
    queries: UserQueries = Depends(),
):
    record = queries.get_one_user(user_id)
    if record is None:
        raise HTTPException(
            status_code=404, detail="No user found with id {}".format(user_id)
        )
    else:
        return record


# @router.get("/api/coolreturn")
# def cool_function():
#     # pass
#     return "Cool text works"


@router.get("/api/users", response_model=Union[List[UserOut], Error])
def get_all_users(
    queries: UserQueries = Depends(),
):
    # print({"users": queries.get_all_users()})
    return queries.get_all_users()


@router.post("/api/users", response_model=UserOut)
def create_user(user: UserIn, queries: UserQueries = Depends()):
    return queries.create_user(user)

@router.put("/api/users/{user_id}", response_model=Union[UserOut, Error])
def update_user(
    user_id: int,
    user: UserIn,
    queries: UserQueries = Depends()
) -> Union[Error, UserOut]:
    return queries.update_user(user_id, user)

@router.delete("/api/user/{user_id}", response_model=bool)
def delete_user(
    user_id: int,
    queries: UserQueries = Depends(),
):
    queries.delete_user(user_id)
    return True
