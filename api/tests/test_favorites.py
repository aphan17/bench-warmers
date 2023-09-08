from fastapi.testclient import TestClient
from main import app
from queries.favoritesQueries import FavoriteQueries

client = TestClient(app)


class EmptyFavoriteQueries:
    def get_all_favorites(self):
        return []


class CreateFavoriteQueries:
    def add_favorite(self, favorite):
        result = {
            "id": 9000,
            "user_id": 123,
            "favorite_id": 234
        }
        result.update(favorite)
        return result


def test_get_all_favorites():
    # Arrange
    app.dependency_overrides[FavoriteQueries] = EmptyFavoriteQueries

    # Act
    response = client.get("/api/favorites")

    app.dependency_overrides = {}
    expected = []

    # Assert
    assert response.status_code == 200
    assert response.json() == expected


def test_add_favorite():
    # Arrange
    app.dependency_overrides[FavoriteQueries] = CreateFavoriteQueries

    # Act
    json = {
        "user_id": 123,
        "favorite_id": 234
    }

    expected = {
        "id": 9000,
        "user_id": 123,
        "favorite_id": 234
    }

    response = client.post("/api/favorites", json=json)
    app.dependency_overrides = {}

    # Assert

    assert response.status_code == 200
    assert response.json() == expected
