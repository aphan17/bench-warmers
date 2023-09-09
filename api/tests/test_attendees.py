from fastapi.testclient import TestClient
from main import app
from queries.attendeesQueries import AttendeesQueries


client = TestClient(app)


class EmptyAttendeesQueries:
    def get_all_attendee(self):
        return []


def test_get_all_attendees():

    app.dependency_overrides[AttendeesQueries] = EmptyAttendeesQueries

    response = client.get('/api/attendees')

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {'attendees': []}
