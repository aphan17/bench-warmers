steps = [
    [
        """
        CREATE TABLE locations (
            id SERIAL PRIMARY KEY NOT NULL,
            city TEXT NOT NULL,
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
            event_id int,
            user_id int,
            PRIMARY KEY(event_id, user_id),
            FOREIGN KEY (event_id) REFERENCES events(id),
            FOREIGN KEY (user_id) references users(id)
        );
        """,
        """
        DROP TABLE attendees;
        """,
    ],
    [
        """
        CREATE TABLE favorites (
            id INT primary key,
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
