from queries.usersQueries import UserIn, UserQueries, UserOut
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)

from authenticator import authenticator
from typing import Optional, List, Union

# from pydantic import BaseModel
from queries.usersQueries import Error
from queries.usersQueries import (
    UserIn,
    UserOut,
    UserQueries,
    DuplicateUserNameError,
    HttpError,
    UserToken,
)

router = APIRouter()


@router.get("/api/user/{user_id}", response_model=Optional[UserOut])
def get_one_user(
    user_id: int,
    username: str,
    queries: UserQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    record = queries.get_one_user(username)
    if record is None:
        raise HTTPException(
            status_code=404, detail="No user found with id {}".format(user_id)
        )
    else:
        return record


@router.get("/api/users", response_model=Union[List[UserOut], Error])
def get_all_users(
    queries: UserQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    return queries.get_all_users()


@router.put("/api/users/{user_id}", response_model=Union[UserOut, Error])
def update_user(
    user_id: int,
    user: UserIn,
    queries: UserQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
) -> Union[Error, UserOut]:
    hashed_password = authenticator.hash_password(user.password)
    updated = queries.update_user(user_id, user, hashed_password)
    return updated


@router.delete("/api/user/{user_id}", response_model=bool)
def delete_user(
    user_id: int,
    queries: UserQueries = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    queries.delete_user(user_id)
    return True


@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    account: UserOut = Depends(authenticator.try_get_current_account_data)
) -> UserToken| None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": account,
        }


@router.post("/api/users", response_model=UserToken | HttpError)
async def create_account(
    info: UserIn,
    request: Request,
    response: Response,
    repo: UserQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create_user(info, hashed_password)
    except DuplicateUserNameError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = UserIn(
        username=info.username,
        password=info.password,
        email=info.email,
        firstName=info.firstName,
        lastName=info.lastName,
        bio=info.bio,
        avatar=info.avatar,
    )
    token = await authenticator.login(response, request, form, repo)
    return UserToken(user=account, **token.dict())
