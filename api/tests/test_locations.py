from fastapi.testclient import TestClient
from main import app
from queries.locationQueries import LocationQueries

client = TestClient(app)


class EmptyLocationQueries:
    def get_all_locations(self):
        return []


def test_get_all_locations():
    app.dependency_overrides[LocationQueries] = EmptyLocationQueries

    response = client.get("/api/locations")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == []


def test_init():
    assert 1 == 1
