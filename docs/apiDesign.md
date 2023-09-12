# API Design

## Users

| Action | Method | URL
| ----------- | ----------- | ----------- |
| Get all users| GET | http://localhost:8000/api/users/
| Create an account/user | POST | http://localhost:8000/api/users/
| Get an account | POST | http://localhost:8000/api/accounts/
| Get a specific user | GET | http://localhost:8000/api/users/{username}/
| Update a specific user| PUT | http://localhost:8000/api/manufacturers/{userid}/
| Delete a specific user| DELETE | http://localhost:8000/api/manufacturers/{userid}/


Creating an account, expected input:
- location_gym must match an exisiting location or can be left null.
```
{
  "username": "avocado",
  "email": "avo@gmail.com",
  "firstName": "avo",
  "lastName": "cado",
  "password": "password",
  "bio": "its an avocadooo",
  "avatar": "https://images.pexels.com/photos/16652420/pexels-photo-16652420/free-photo-of-a-pug-in-dogs-clothing-in-a-park.jpeg?auto=compress&cs=tinysrgb&w=800",
  "location_gym": "Planet Fitness"
}
```
Creating an account, expected output:
- creating an account will output a token
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNzNkMTNmMy01Mzg5LTRmNjctODIxMS1lODEyMDkzZGM5OWMiLCJleHAiOjE2OTQ0NDYxMjAsInN1YiI6ImF2b2NhZG8iLCJhY2NvdW50Ijp7ImlkIjozLCJ1c2VybmFtZSI6ImF2b2NhZG8iLCJmaXJzdE5hbWUiOiJhdm8iLCJsYXN0TmFtZSI6ImNhZG8iLCJlbWFpbCI6ImF2b0BnbWFpbC5jb20iLCJiaW8iOiJpdHMgYW4gYXZvY2Fkb29vIiwiYXZhdGFyIjoiaHR0cHM6Ly9pbWFnZXMucGV4ZWxzLmNvbS9waG90b3MvMjIyODU1My9wZXhlbHMtcGhvdG8tMjIyODU1My5qcGVnP2F1dG89Y29tcHJlc3MmY3M9dGlueXNyZ2Imdz04MDAiLCJsb2NhdGlvbl9neW0iOiJQbGFuZXQgRml0bmVzcyJ9fQ.A1MSAKK3Rv8IBU2jE3B6rirgm83VV_zImPGw8E7s2AI",
  "token_type": "Bearer",
  "user": {
    "id": 3,
    "username": "avocado",
    "firstName": "avo",
    "lastName": "cado",
    "email": "avo@gmail.com",
    "bio": "its an avocadooo",
    "avatar": "https://images.pexels.com/photos/16652420/pexels-photo-16652420/free-photo-of-a-pug-in-dogs-clothing-in-a-park.jpeg?auto=compress&cs=tinysrgb&w=800",
    "location_gym": "Planet Fitness"
  }
}
```

Get an account expected output, expected response body:
- gets the user by the token, for authentication purposes
```
{
  "id": 0,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "bio": "string",
  "avatar": "string",
  "location_gym": "string"
}
```


Updating a user requires the userid and the following request body:
```
{
  "username": "avocado",
  "email": "avo@gmail.com",
  "firstName": "avo",
  "lastName": "cado",
  "password": "password",
  "bio": "its an avocadooo!!!",
  "avatar": "https://images.pexels.com/photos/16652420/pexels-photo-16652420/free-photo-of-a-pug-in-dogs-clothing-in-a-park.jpeg?auto=compress&cs=tinysrgb&w=800",
  "location_gym": "Planet Fitness"
}
```
Updating a user, expected response body:
```
{ 
  "id": 3,
  "username": "avocado",
  "email": "avo@gmail.com",
  "firstName": "avo",
  "lastName": "cado",
  "password": "password",
  "bio": "its an avocadooo!!!",
  "avatar": "https://images.pexels.com/photos/16652420/pexels-photo-16652420/free-photo-of-a-pug-in-dogs-clothing-in-a-park.jpeg?auto=compress&cs=tinysrgb&w=800",
  "location_gym": "Planet Fitness"
}

```


Getting all users, expected response body:
```
[
  {
    "id": 0,
    "username": "string",
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "bio": "string",
    "avatar": "string",
    "location_gym": "string"
  }
]
```

Getting a specific user by the username, expected response body:
```
{
  "id": 0,
  "username": "string",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "bio": "string",
  "avatar": "string",
  "location_gym": "string"
}
```

Delete user by inputing the user ID, expected response body:
```
True
```


## Events

Api Directory houses Queries and Routers folders. Queries directory contains attendees,events,favorites,location, and users.

### Views, Endpoints, Methods


| Action | Method | URL
| ----------- | ----------- | ----------- |
| Get all events| GET | http://localhost:8000/api/events
| Create an event | POST | http://localhost:8000/api/events
| Get a specific event | GET | http://localhost:8000/api/users/{event_id}
| Update a specific event| PUT | http://localhost:8000/api/event/{event_id}
| Delete a specific event| DELETE | http://localhost:8000/api/events/{event_id}

Creating an event, expected input:
-when creating am event through the backend location_id must be an existing gym.
-
```
{
  "creator_id": 1,
  "name": "Dat",
  "start_date": "2023-09-11T18:03:14.767Z",
  "end_date": "2023-09-11T18:03:14.767Z",
  "description": "Issame",
  "num_of_attendees": 1,
  "location_id": "American Barbell"
}
```
Creating an event, expected output:

```
{
  "creator_id": 2,
  "name": "Gym",
  "start_date": "2023-09-11T18:06:02.966Z",
  "end_date": "2023-09-11T18:06:02.966Z",
  "description": "string",
  "num_of_attendees": 2,
  "location_id": "American barbell"
}
```

Geting all Events, expected Output:

```

{
  "events": [
    {
      "id": 1,
      "creator_id": 1,
      "name": "leg Day",
      "start_date": "2023-09-06T19:43:00",
      "end_date": "2023-09-12T17:43:00",
      "description": "Legs",
      "num_of_attendees": 1,
      "location_id": null
    },
    {
      "id": 2,
      "creator_id": 1,
      "name": "neekbjweg",
      "start_date": "2023-09-13T20:57:00",
      "end_date": "2023-09-16T19:57:00",
      "description": "welknwel",
      "num_of_attendees": 1,
      "location_id": null
    },
    {
      "id": 3,
      "creator_id": 1,
      "name": "elnlgw",
      "start_date": "2023-09-14T21:01:00",
      "end_date": "2023-09-12T18:04:00",
      "description": "wel gle",
      "num_of_attendees": 1,
      "location_id": "24hr fitness"
    }
  ]
}

```

-If there is no events then Output:

```

{
  "events": []
}
```

Getting a Specific Event,expected Output:

```
{
  "events": [
    {
      "id": 1,
      "creator_id": 1,
      "name": "leg Day",
      "start_date": "2023-09-06T19:43:00",
      "end_date": "2023-09-12T17:43:00",
      "description": "Legs",
      "num_of_attendees": 1,
      "location_id": null
    }
  ]
}
```

Update a Specfic Event,expected Input:

```
{
  "creator_id": 1,
  "name": "Leg Day",
  "start_date": "2023-09-11T18:17:15.778Z",
  "end_date": "2023-09-11T18:17:15.778Z",
  "description": "legs",
  "num_of_attendees": 1,
  "location_id": "24hr fitness"
}

```

Update a Specific Event,expected Output:
```
{
  "id": 1,
  "creator_id": 2,
  "name": "Leg Day",
  "start_date": "2023-09-11T18:17:15.783Z",
  "end_date": "2023-09-11T18:17:15.783Z",
  "description": "legs",
  "num_of_attendees": 1,
  "location_id": "24hr fitness"
}
```

Delete a Specific Event,expected Input:
```
Event_Id

```

Delete a Specific Event,expected Output:
```
true

```
-false if event is already deleted


### Locations

| Action | Method | URL
| ----------- | ----------- | ----------- |
| Get all locations| GET | http://localhost:8000/api/locations/
| Get a specific location | GET | http://localhost:8000/api/location/{location_id}

Locations are already inserted into database, no POST, PUT, DELETE needed.

Get all locations, expected response body:
```
[
  {
    "id": 2,
    "gym": "24hr fitness"
  },
  {
    "id": 5,
    "gym": "American Barbell"
  },
  {
    "id": 4,
    "gym": "Crunch Fitness"
  },
  {
    "id": 3,
    "gym": "Golds"
  },
  {
    "id": 1,
    "gym": "Planet Fitness"
  },
  {
    "id": 6,
    "gym": "UFC Fit"
  }
]
```

Get a specific location by location id, expected response body:
```
{
  "id": 1,
  "gym": "Planet Fitness"
}
```

### Favorites

| Action | Method | URL
| ----------- | ----------- | ----------- |
| Get all favorites| GET | http://localhost:8000/api/favorites/
| Add a favorite user | POST | http://localhost:8000/api/favorites/
| Get a specific user's favorites| GET | http://localhost:8000/api/favorites/{userid}/

Adding a favorite user requires two user ids, one user_id and one favorite_id,request body:
```
{
  "user_id": 1,
  "favorite_id": 2
}
```

```
{
  "id": 5,
  "user_id": 1,
  "favorite_id": 2
}
```

Getting all favorites, expected response body:
```
[
  {
    "id": 1,
    "user_id": 1,
    "favorite_id": 3
  },
  {
    "id": 2,
    "user_id": 1,
    "favorite_id": 2
  }
]
```

Getting a specific user's favorites requires the user's id, expected response body:
```
[
  {
    "id": 1,
    "user_id": 1,
    "favorite_id": 3,
    "creator_username": "ashphan",
    "fav_username": "avocado",
    "fav_firstname": "avo",
    "fav_lastname": "cado",
    "fav_bio": "its an avocadooo",
    "fav_avatar": "https://images.pexels.com/photos/2228553/pexels-photo-2228553.jpeg?auto=compress&cs=tinysrgb&w=800",
    "fav_location_gym": "Planet Fitness"
  }
]
```


### Attendees

| Action | Method | URL
| ----------- | ----------- | ----------- |
| Get all attendees| GET | http://localhost:8000/api/attendees/
| Create an attendee | POST | http://localhost:8000/api/attendees/
| Delete a specific attendee| DELETE | http://localhost:8000/api/attendees/{attendees}/

Getting all attendees, expected input:
- To retrieve all attendees all we need to do is execute the endpoint.
```

```
Getting all attendees, expected output:
- Getting all attendee will output a dictionary with a list of attendees including the details for the list of events.
```
{
  "attendees": [
    {
      "event_id": 0,
      "user_id": 0,
      "name": "string",
      "start_date": "2023-09-11T18:12:48.074Z",
      "end_date": "2023-09-11T18:12:48.074Z",
      "description": "string",
      "num_of_attendees": 0,
      "location_id": "string",
      "total_attendees": 0
    }
  ]
}
```

Creating an attendee, expected input:
- event_id and user_id must match an exisiting event_id and user_id since it is a foreign key relationship.
```
{
  "event_id": "1",
  "user_id": "1"
}
```
Creating an attendee, expected output:
- creating an attendee will output an attendee
```
{
  "event_id": "1",
  "user_id": "1"
}
```

Deleting an attendee, expected input:
- ateendee id.
```
{
  "attendee id": "1"
}
```
Deleting an attendee, expected output:
- deleting an attendee will output a boolean
```
{
  "True"
}
```
