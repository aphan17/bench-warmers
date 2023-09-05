steps = [
    [
        """
        CREATE TABLE locations (
            id SERIAL PRIMARY KEY NOT NULL,
            gym TEXT NOT NULL
        );
        """,
        """
        DROP TABLE locations;
        """,
    ],
    [
        """
        ALTER TABLE users
        ADD location_id int NULL,
        ADD FOREIGN KEY (location_id) REFERENCES locations(id)
        """,
        """
        DROP TABLE users;
        """,
    ],
    [
        """
        ALTER TABLE events
        ADD location_id int NULL,
        ADD FOREIGN KEY (location_id) REFERENCES locations(id)
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
            FOREIGN KEY (user_id) REFERENCES Users(id),
            FOREIGN KEY (favorite_id) REFERENCES Users(id)
        );
        """,
        """
        DROP TABLE favorites;
        """,
    ],
]
