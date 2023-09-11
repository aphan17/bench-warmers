# The Bench
- Ashley Phan
- Corben Morrison
- Dat Le
- Marcus Der

## Design

- [API Design] (docs/apiDesign.md)
- [Models] (docs/models.md)
- [GHI] (docs/diagrams.md)


## Intended Market

The Bench is a website targeted to regular gym goers to find their new gym buddies and find gym related events in their area.

## Functionality

- Create an account
- Users can find and favorite other users
- Users can view their favorite users
- Users can find and attend events
- Users can create events


## Project Initialization

1. Fork this repository:
2. Clone the forked repository onto your own computer:
```
git clone https://gitlab.com/macd-may/module3-project-gamma
```
3. Build and run this project with docker using these commands:
```
docker volume create postgres-data
docker-compose build
docker-compose up
```
- Make sure all of the docker containers are running
- View the project frontend in the browsers: http://localhost:3000/
- Fastapi docs page: http://localhost:8000/docs
