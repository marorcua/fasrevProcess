# Fasrev selection process test
React-app with signup email verification, login and profile that shows image

## Installation (with npm)
1. Clone the project
2. Execute 'npm i' in client/
3. Execute 'npm i' in server/
4. Run "npm run dev" in server/
5. Run "npm start" in client/

## Endpoints table

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `POST`    | `/api/auth/signup`                      | Create new user.                      |
| `POST`   | `/api/auth/login`                        | Login of new user.                       |
| `GET`    | `/api/auth/logout`                       | Logouts from app.                       |
| `GET`  | `/api/auth/isloggedin`                   | Checks if user is logged in.    |
| `DELETE`   | `/api/delete/:user_id`                 | Deletes user.                 |
| `POST`    | `/api/auth/welcomemail`                       | Sends welcome mail.             |
| `POST`    | `/api/auth/validate`                       | Validates user.                       |
| `GET`    | `/api/auth/:imageName`                       | Gets profile image.                       |
| `GET`    | `/api/upload/image`                       | Uploads image.                       |