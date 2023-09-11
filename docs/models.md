## Data Models:

### Users
- location gym references location gym from the location model
| Name | Type | Unique | Optional
| ----------- | ----------- | ----------- | ----------- |
| id | int | yes | no
| username | string | yes | no
| firstName | string | no | no
| lastName | string | no | no
| password | string | no | no
| email | string | yes | no
| bio | string | no | no
| avatar | string | no | no
| location_gym | string | yes | yes

### Favorites
- User_id and favorite_id are both foreign keys, referencing the ids in the users model

| Name | Type | Unique | Optional
| ----------- | ----------- | ----------- | ----------- |
| id | int | yes | no
| user_id | int | yes | no
| favorite_id | int | yes | no

### Events
- creator_id is a foreign key to the id in the users model
- location id references location gym from the location model

| Name | Type | Unique | Optional
| ----------- | ----------- | ----------- | ----------- |
| id | int | yes | no
| creator_id | int | no | no
| name | string | no | no
| start_date | datetime | no | no
| end_date | datetime | no | no
| description | string | yes | no
| num_of_attendees | int | no | no
| location_id | string | yes | yes

### Attendees
- event id references the id from the events model
- user id references the id from the users model
| Name | Type | Unique | Optional
| ----------- | ----------- | ----------- | ----------- |
| id | int | yes | no
| event_id | int | yes | no
| user_id | int | yes | no
