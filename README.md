# Exercise Tracker

Project built for [https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/exercise-tracker](https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/exercise-tracker)

User story:

- I can create a new user by `POST /api/exercise/new-user` with name.\
  Response example: `{"username":"mike","_id":"H10JDXfX7"}`,\
  error: `{"error": "username already taken"}`.
- I can post new exercise by `POST /api/exercise/add` with user_id*, description*, duration*, date (* - required fields).\
  Response example: `{"username":"mike","description":"jumping","duration":10,"_id":"By_WdXGX7","date":"Thu Jan 01 2018"}`,\
  error: `{"error": "wrong user_id"}`
- I can get users's excercise log by `GET /api/exercise/log?{userId}[&from][&to][&limit]`\
  (**{ }** = required, **[ ]** = optional, **from**, **to** = dates (yyyy-mm-dd); **limit** = number)

# Usage
## Setup
- `git clone https://github.com/askov/exercise-tracker`
- `cd exercise-tracker`
- `npm i`
- `npm dev`

With default settings you can reach app at http://localhost:3000

## Tests
- `npm test`

## Env
In order to have working hrefs, set HOST in .env

