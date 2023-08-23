steps = [
    [
        """
ALTER TABLE users
ADD password TEXT NOT NULL,
ADD email VARCHAR(50) UNIQUE NOT NULL
""",
        # "Down" SQL statement
        """
DROP TABLE users;
    """,
    ],
]
