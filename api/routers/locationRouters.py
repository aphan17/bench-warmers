from fastapi import (
    Depends,
    HTTPException,
    APIRouter,
)

from typing import Optional, List, Union

from queries.usersQueries import Error
from queries.locationQueries import (
    LocationOut,
    LocationQueries,
)

router = APIRouter()


@router.get("/api/locations", response_model=Union[List[LocationOut], Error])
def get_all_locations(
    queries: LocationQueries = Depends(),
):
    return queries.get_all_locations()


@router.get(
    "/api/location/{location_id}", response_model=Optional[LocationOut]
)
def get_one_location(
    location_id: int,
    queries: LocationQueries = Depends(),
):
    record = queries.get_one_location(location_id)
    if record is None:
        raise HTTPException(
            status_code=404,
            detail="No location with id of {}".format(location_id),
        )
    else:
        return record
