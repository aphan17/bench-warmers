steps = [
    [
        """
        CREATE TABLE locations (
            id SERIAL PRIMARY KEY NOT NULL,
            gym TEXT UNIQUE NOT NULL
        );
        """,
        """
        DROP TABLE locations;
        """,
    ],
    [
        """
        ALTER TABLE users
        ADD location_gym TEXT NULL,
        ADD FOREIGN KEY (location_gym) REFERENCES locations(gym)
        """,
        """
        DROP TABLE users;
        """,
    ],
    [
        """
        ALTER TABLE events
        ADD location_id text REFERENCES locations(gym) NULL
        """,
        """
        DROP TABLE events;
        """,
    ],
    [
        """
        CREATE TABLE attendees (
            id SERIAL PRIMARY KEY NOT NULL,
            event_id integer REFERENCES events(id),
            user_id integer REFERENCES users(id)
        );
        """,
        """
        DROP TABLE attendees;
        """,
    ],
    [
        """
        CREATE TABLE favorites (
            id SERIAL primary key,
            user_id INT,
            favorite_id INT,
            FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
            FOREIGN KEY (favorite_id) REFERENCES Users(id) ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE favorites;
        """,
    ],
]
