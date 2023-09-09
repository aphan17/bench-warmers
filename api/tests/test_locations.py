from fastapi.testclient import TestClient
from main import app
from queries.locationQueries import LocationQueries, LocationOut

# client = TestClient(app)


class EmptyLocationQueries:
    def get_all_locations(self):
        return []


class TestGetOne:
    def get_one_location(self, id):
        return LocationOut(id=15, gym="TestGym")


def test_get_all_locations():
    app.dependency_overrides[LocationQueries] = EmptyLocationQueries

    response = client.get("/api/locations")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []


def test_get_one_location():
    app.dependency_overrides[LocationQueries] = TestGetOne

    response = client.get("/api/location/15")

    app.dependency_overrides = {}

    expected = {"id": 15, "gym": "TestGym"}

    assert response.status_code == 200
    assert response.json() == expected


def test_init():
    assert 1 == 1
