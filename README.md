# Express Mongo API Project

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/myapp
   PORT=3000
   ```
3. Start the server:
   ```bash
   node server.js
   ```

## API Endpoints

- `POST /signup` — Register a new user
  - Body: `{ "name": "string", "email": "string", "password": "string" }`
- `GET /users` — Get all users (passwords hidden)

## Notes
- CORS is enabled for frontend integration.
- Environment variables are used for configuration. 
