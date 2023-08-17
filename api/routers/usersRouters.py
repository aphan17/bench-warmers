<<<<<<< HEAD

=======
from fastapi import APIRouter, Depends
from queries.usersQueries import UserIn, UserQueries, UserOut

router = APIRouter()

@router.post("/api/users", response_model=UserOut)
def create_user(
        user: UserIn,
        queries: UserQueries = Depends()
    ):
    return queries.create_user(user)
>>>>>>> main
