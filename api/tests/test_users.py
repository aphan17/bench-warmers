from fastapi.testclient import TestClient
from main import app
from queries import usersQueries

client = TestClient(app)

class UnauthorizedUpdateUserQueries:
    def update_user(self, user_id, user):
        user_id = 1
        result = {
        "username": "string",
        "email": "string",
        "firstName": "string",
        "lastName": "string",
        "password": "string",
        "bio": "string",
        "avatar": "string",
        "location_id": 1
        }
        result.update(user_id, user)
        return result


def test_unauthorized_update_user():
    # Arrange
    app.dependency_overrides[usersQueries] = UnauthorizedUpdateUserQueries

    # Act
    user_id=1
    json = {
        "username": "tester",
        "email": "testing@email.com",
        "firstName": "test",
        "lastName": "testy",
        "password": "password",
        "bio": "testing bio",
        "avatar": "testing avatar",
        "location_id": 1
    }

    response = client.put("/api/users/{user_id}", json=json)

    app.dependency_overrides = {}

    # Assert

    assert response.status_code == 401


def test_init():
    assert 1 == 1
