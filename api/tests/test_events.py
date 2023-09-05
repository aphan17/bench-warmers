from fastapi.testclient import TestClient
from main import app
from queries.eventsQueries import EventQueries

client = TestClient(app)

class EmptyEventQueries:
    def get_all_events(self):
        return []

class CreateEventQueries:
    def create_event(self,event):
        result = {
  "creator_id": 1,
  "name": "Curl for the Gurls",
  "start_date": "2023-08-30",
  "end_date": "2023-08-30",
  "description": "string",
  "num_of_attendees": 2
}


def test_get_all_events():

    app.dependency_overrides[EventQueries] = EmptyEventQueries
    #Arrange

    #Act
    response = client.get('/api/events')

    app.dependency_overrides ={}

    #Assert
    assert response.status_code == 200
    assert response.json() == {'events':[]}

def test_create_event():
    #Arrange
    app.dependency_overrides[EventQueries] = CreateEventQueries

    json ={
    "creator_id": 1,
    "name": "Curl for the Gurls",
    "start_date": "2023-08-30",
    "end_date": "2023-08-30",
    "description": "string",
    "num_of_attendees": 2
}

    expected ={
  "creator_id": 1,
  "name": "Curl for the Gurls",
  "start_date": "2023-08-30",
  "end_date": "2023-08-30",
  "description": "string",
  "num_of_attendees": 2
}


    #Act
    response= client.post('/api/events',json=json)

    app.dependency_overrides ={}

    #Assert
    assert response.status_code == 401
    assert json == expected
