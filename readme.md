# bug_journal

**A Q&A platform built for developers.** Post the bug you're stuck on with the exact error message, the relevant code, and a screenshot. Other developers answer, you accept the one that fixed it, and the question is marked solved. Solved questions stay searchable, so the next person with the same bug finds the fix.

<!-- Screenshots: add images to docs/ and uncomment
![Home](docs/home.png)
![Question details](docs/question.png)
-->
<!-- **Live demo:** https://your-app.vercel.app -->

## Contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [Project structure](#project-structure)
- [Data model](#data-model)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [API reference](#api-reference)
- [Design decisions](#design-decisions)
- [Security](#security)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)

## Features

**Questions**

- Dedicated fields for the error message and a code snippet, plus an optional screenshot
- Predefined tags (up to 5 per question) and free-text technologies
- Search across title, description, error message, code, and technologies, matching each word in any order
- Filter by tag, technology, and solved status; sort by newest, oldest, or most viewed
- Pagination, with every filter kept in the URL so a search can be shared as a link
- Edit and delete your own questions, including replacing or removing the image

**Answers and comments**

- Anyone logged in can answer; only the question's author can accept an answer
- Accepting an answer marks the question solved, and the accepted answer is pinned first
- Comments on questions, with inline edit (shown as "edited") and delete

**Accounts**

- Register, log in, and log out
- Forgot and reset password by email, using a single-use token that expires in 15 minutes
- Profile with bio and profile image, plus tabs for your questions and your answers

**Notifications and saving**

- Notifications when someone answers or comments on your question, or accepts your answer
- A bell in the navbar with an unread badge, and opening it marks everything as read
- Bookmark questions and find them in one list

**Browsing and polish**

- Tags page showing how many questions each tag has, linking into a filtered list
- Responsive layout, loading skeletons, empty and error states, toasts, and a custom 404 page
- A "server is starting" screen for free hosting that sleeps when idle

## Tech stack

| Layer    | Technology                                                                                                                        |
| -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Frontend | React, Vite, React Router, TanStack Query, React Hook Form, Zod, Axios, Tailwind CSS v4, shadcn/ui, react-hot-toast, lucide-react |
| Backend  | Node.js, Express, MongoDB, Mongoose                                                                                               |
| Auth     | JWT in an HTTP-only cookie, bcrypt password hashing                                                                               |
| Uploads  | Multer (memory storage), Cloudinary                                                                                               |
| Email    | Nodemailer with Gmail SMTP                                                                                                        |

## Architecture

```
Browser (React + Vite)
   │  Axios, cookies sent with every request
   ▼
Express API  ──►  MongoDB (Mongoose)
   │
   ├──►  Cloudinary   (question and profile images)
   └──►  Gmail SMTP   (password-reset emails)
```

The frontend and API are separate deployments. The browser keeps no token of its own. The server sets an HTTP-only cookie at login, and the browser attaches it to every request.

## Project structure

```
Developer-Bug-Journal/
├── backend/
│   └── src/
│       ├── config/          # database connection
│       ├── controllers/     # request handlers
│       ├── middlewares/     # auth, validation, rate limiting, error handling
│       ├── models/          # Mongoose schemas
│       ├── routes/
│       ├── utils/           # ApiError, ApiResponse, asyncHandler, Cloudinary, email
│       └── data/            # predefined tags
└── frontend/
    └── src/
        ├── components/      # ui (shadcn), layout, question, answer, comment, user, notification, tag
        ├── pages/
        ├── hooks/           # queries/ and mutations/ (TanStack Query)
        ├── services/        # API calls on one shared Axios instance
        ├── context/         # AuthContext
        ├── schemas/         # Zod form schemas
        └── lib/             # utilities, constants, query client
```

## Data model

| Collection       | Main fields                                                                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **User**         | `username`, `email`, `password` (hashed), `profileImage`, `bio`, `bookmarks` (question IDs), reset-token fields                                          |
| **Question**     | `author`, `title`, `description`, `errorMessage`, `code`, `technologies[]`, `tags[]`, `images[]`, `views`, `answeresCount`, `isSolved`, `acceptedAnswer` |
| **Answer**       | `question`, `author`, `content`, `status` (`pending` or `accepted`)                                                                                      |
| **Comment**      | `question`, `author`, `content`, `isEdited`                                                                                                              |
| **Tag**          | `name`, `description`, `questionCount`                                                                                                                   |
| **Notification** | `recipient`, `sender`, `type`, `question`, `answer`, `comment`, `message`, `isRead`                                                                      |

Images store both a `url` and a Cloudinary `publicId`, because the ID is needed to delete the file later. Deleting a question also deletes its answers, comments, notifications, and bookmarks, and decrements its tags' counts. The answer counter is spelled `answeresCount` in the schema, so use that spelling when reading it.

## Getting started

### Prerequisites

- Node.js 20 or newer
- A MongoDB database (local, or a free MongoDB Atlas cluster)
- A Cloudinary account for image uploads
- A Gmail account with an [app password](https://support.google.com/accounts/answer/185833) for the reset emails

### 1. Clone and install

```bash
git clone https://github.com/nishant7360/Developer-Bug-Journal.git
cd Developer-Bug-Journal

cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure environment variables

Create `backend/.env` and `frontend/.env` yourself; this repository does not include `.env.example` files. Set the values listed in the [table below](#environment-variables). For local development, the API uses port `5000` by default, so set `VITE_API_URL` to `http://localhost:5000/api/v1`.

### 3. Seed the tags

Tags are predefined, so users pick from a fixed list. Run this once. It's safe to run again: it updates descriptions by name and keeps each tag's `_id` and question count.

```bash
cd backend
node src/scripts/seedTags.js
```

### 4. Run both servers

```bash
# terminal 1
cd backend && npm run dev      # http://localhost:5000

# terminal 2
cd frontend && npm run dev     # http://localhost:5173
```

## Environment variables

**`backend/.env`**

| Variable                                                               | Description                                                                                  |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `NODE_ENV`                                                             | `development` or `production`                                                                |
| `PORT`                                                                 | API port. Defaults to `5000`                                                                 |
| `DB_URL`                                                               | MongoDB connection string                                                                    |
| `JWT_SECRET`                                                           | Long random string used to sign tokens                                                       |
| `FRONTEND_URL`                                                         | Frontend origin. Used for password-reset links and allowed as a CORS origin                  |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Cloudinary credentials                                                                       |
| `GMAIL_USER`, `GMAIL_APP_PASSWORD`                                     | Account used to send reset emails                                                            |

Generate a JWT secret with:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

**`frontend/.env`**

| Variable       | Description                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------- |
| `VITE_API_URL` | API base URL including the version prefix, with no trailing slash, for example `http://localhost:5000/api/v1` |

Anything starting with `VITE_` is compiled into the public bundle. Never put a secret there. Never commit a real `.env` file.

## API reference

All routes are under `/api/v1`. Authenticated routes read the user from the cookie, so the client never sends a user ID. Every response uses the same envelope:

```json
{ "statusCode": 200, "data": {}, "message": "…", "success": true }
```

### Auth

| Method | Path                          | Notes                                                         |
| ------ | ----------------------------- | ------------------------------------------------------------- |
| POST   | `/auth/register`              | `username`, `email`, `password`                               |
| POST   | `/auth/login`                 | Sets the auth cookie                                          |
| POST   | `/auth/logout`                | Clears the cookie                                             |
| GET    | `/auth/me`                    | Current user                                                  |
| POST   | `/auth/forgot-password`       | Always responds the same way, whether or not the email exists |
| PATCH  | `/auth/reset-password/:token` | `newPassword`; the token is single-use                        |

### Questions

| Method | Path            | Notes                                                                                                                                        |
| ------ | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | `/question`     | Query: `search`, `technology`, `tag` (tag ID), `status` (`solved` or `unsolved`), `sort` (`newest`, `oldest`, `mostViewed`), `page`, `limit` |
| GET    | `/question/:id` | Increments the view count                                                                                                                    |
| POST   | `/question`     | `multipart/form-data`; fields `title`, `description`, `errorMessage`, `code`, `technologies`, `tags`, optional `image`                       |
| PATCH  | `/question/:id` | Author only; same fields, plus `removeImage`                                                                                                 |
| DELETE | `/question/:id` | Author only; cascades to answers, comments, notifications, bookmarks                                                                         |

### Answers, comments, tags

| Method | Path                       | Notes                           |
| ------ | -------------------------- | ------------------------------- |
| GET    | `/answer/:questionId`      |                                 |
| POST   | `/answer/:questionId`      | Body: `content`                 |
| PATCH  | `/answer/:answerId/accept` | Question author only            |
| GET    | `/comment/:questionId`     |                                 |
| POST   | `/comment/:questionId`     | Body: `content`                 |
| PATCH  | `/comment/:commentId`      | Author only                     |
| DELETE | `/comment/:commentId`      | Author only                     |
| GET    | `/tags`                    | All predefined tags with counts |

### Users and notifications

| Method | Path                         | Notes                                                    |
| ------ | ---------------------------- | -------------------------------------------------------- |
| GET    | `/user/bookmarks`            |                                                          |
| PATCH  | `/user/:questionId/bookmark` | Toggles the bookmark                                     |
| PATCH  | `/user/update-profile`       | `multipart/form-data`; `bio` and optional `profileImage` |
| GET    | `/user/my-questions`         | Paginated                                                |
| GET    | `/user/my-answers`           | Paginated                                                |
| GET    | `/notification`              |                                                          |
| GET    | `/notification/unread-count` |                                                          |
| PATCH  | `/notification/read-all`     |                                                          |

## Design decisions

- **The JWT lives in an HTTP-only cookie.** JavaScript can't read it, so an XSS bug can't steal the token. The frontend never stores it, and Axios sends cookies with `withCredentials`.
- **Reset tokens are random, hashed, and single-use.** The emailed link carries a `crypto` token. Only its SHA-256 hash is stored, with a 15-minute expiry. The login JWT is never reused for this.
- **Ownership is enforced on the server.** Every edit, delete, and accept checks the author against the authenticated user. Hiding a button in the UI is a convenience, not security.
- **Filters live in the URL.** The Questions page passes the query string straight to the API, so results are linkable and the back button works.
- **TanStack Query owns server state.** Mutations invalidate the relevant query keys, so lists, counts, and badges refresh without hand-written state.
- **One shared Axios instance.** It sets credentials once, turns every failure into an `Error` carrying the backend's message, and clears the cached user when a request returns 401.
- **Images keep their `publicId`.** Replacing or deleting an image also removes the old file from Cloudinary.
- **Validation happens twice.** Zod schemas give instant feedback in the browser, and the same rules are enforced on the server, because the browser can always be bypassed.

## Security

- Passwords are hashed with bcrypt
- Helmet security headers, and CORS restricted to an explicit origin list with credentials
- Rate limiting on login, register, and forgot-password
- Request bodies validated on the server with Zod, with unknown fields stripped
- A central error handler maps invalid IDs and validation failures to 400 responses and hides internals in production
- Forgot-password returns the same response whether or not the email exists
- Existing sessions are rejected after a password change
- Upload limits: images only, with a size cap

## Deployment

A typical free setup is MongoDB Atlas for the database, Render for the API, and Vercel or Netlify for the frontend.

### Backend on Render

1. Create a **Web Service** from the repo, with root directory `backend`.
2. Build command `npm install`, start command `node src/server.js` (use your real entry file).
3. Add every variable from the backend table in the Render dashboard.
4. Set `FRONTEND_URL` to your deployed frontend origin. The API allows this origin and `http://localhost:5173` for local development.
5. Set `NODE_ENV=production`, and call `app.set("trust proxy", 1)` in the app. Without it, rate limiting sees every visitor as one IP.
6. Optionally set the health check path to `/api/v1/health`.

### Frontend on Vercel

1. Create a project with root directory `frontend`, build command `npm run build`, output directory `dist`.
2. Set `VITE_API_URL` to your Render URL plus `/api/v1`. It is baked in at build time, so redeploy after changing it.
3. Add a rewrite from `/*` to `/index.html`. Without it, refreshing a route like `/profile` returns a 404.

### Cookies across domains

If the frontend and API are on different sites, the auth cookie must be `SameSite=None; Secure`, and some browsers block such cookies anyway. Serving both from subdomains of one domain, for example `app.example.com` and `api.example.com`, is the most reliable setup.

### Free hosting sleeps

Render's free web services spin down after about 15 minutes without traffic, and the next request can take a minute or more. The frontend handles this with a startup screen. It checks `/api/v1/health` before the app mounts, shows a "your server is waking up" message while it waits, and loads the app once the server answers. This also stops a logged-in user from being sent to the login page because the first request failed.

## Troubleshooting

| Symptom                                      | Likely cause                                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Requests go to `/api/v1//question`           | `VITE_API_URL` has a trailing slash                                                              |
| Login works but you're logged out on refresh | Cookie blocked: check `FRONTEND_URL`, `credentials: true`, and the `SameSite` and `Secure` flags |
| Image upload fails with an empty body        | A manual `Content-Type` header was set on a `FormData` request. Let the browser set it           |
| 401 on every request after deploying         | The cookie isn't being sent cross-site, or `trust proxy` isn't set                               |
| Everyone gets 429 at once                    | `trust proxy` isn't set behind Render's proxy                                                    |
| Hard refresh on a route returns 404          | The SPA rewrite to `/index.html` is missing                                                      |
| New tag descriptions don't show              | Re-run the seed script and refresh; tags are cached in the browser for 10 minutes                |

## Roadmap

- Voting on answers
- Markdown and syntax-highlighted code in answers
- Dark mode toggle
- Automated tests and a CI workflow
- Tag following and a personalized feed
- Terms and Privacy pages

## Author

Built by [@nishant7360](https://github.com/nishant7360).
