from fastapi.testclient import TestClient
from main import app
from queries import usersQueries

client = TestClient(app)


class CreateUserQueries:
    def create_account(self, truck):
        result = {
            "username": "string",
            "email": "string",
            "firstName": "string",
            "lastName": "string",
            "password": "string",
            "bio": "string",
            "avatar": "string",
            "location_gym": "string",
        }
        result.update(truck)
        return result


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
            "location_id": 1,
        }
        result.update(user_id, user)
        return result


def test_unauthorized_update_user():
    # Arrange
    app.dependency_overrides[usersQueries] = UnauthorizedUpdateUserQueries

    # Act
    user_id = 1
    json = {
        "username": "tester",
        "email": "testing@email.com",
        "firstName": "test",
        "lastName": "testy",
        "password": "password",
        "bio": "testing bio",
        "avatar": "testing avatar",
        "location_id": 1,
    }

    response = client.put("/api/users/{user_id}", json=json)

    app.dependency_overrides = {}

    # Assert

    assert response.status_code == 401


def test_create_user():
    # Arrange
    app.dependency_overrides[usersQueries] = CreateUserQueries

    # Act
    json = {
        "username": "Plink",
        "password": "http://plinko.example.com",
        "email": "American",
        "firstName": True,
        "lastName": 2,
        "bio": "text",
        "avatar": "text.png",
    }

    expected = {
        "id": 1,
        "username": "Plink",
        "password": "http://plinko.example.com",
        "email": "American",
        "firstName": True,
        "lastName": 2,
        "bio": "text",
        "avatar": "text.png",
    }

    response = client.post("/api/users", json=json)

    app.dependency_overrides = {}

    # Assert

    assert response.status_code == 200
    assert response.json() == expected


def test_init():
    assert 1 == 1
