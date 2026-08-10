# ChatShat

A real-time chat application built with the MERN stack, Supabase authentication, and Socket.IO for live messaging.

**🔗 Live Demo:** [https://chatshat.up.railway.app/](https://chatshat.up.railway.app/)

## Features

- **Real-time messaging** via Socket.IO — messages appear instantly without refreshing
- **Supabase-based authentication** (email/password signup with email confirmation, cookie-based sessions)
- **Guest login** — try the app instantly via Supabase anonymous sign-in, no email or password required; guest data is automatically cleaned up on logout or after 24 hours
- **Online presence indicators** — see which contacts are currently online
- **Image sharing** in chat, uploaded to Supabase Storage
- **Contacts & Chats tabs** — browse everyone you can message, or just your active conversations
- **Responsive design** — full-screen mobile experience, floating card layout on tablet/desktop
- **Security middleware** via Arcjet — bot detection, rate limiting, and attack-signature shielding on message routes
- **Dark mode support**

## Tech Stack

**Frontend**
- React 19 + Vite
- Zustand for state management
- Tailwind CSS v4
- Socket.IO client
- React Router
- react-hot-toast for notifications
- Axios

**Backend**
- Node.js + Express 5
- Socket.IO
- MongoDB + Mongoose
- Supabase (`@supabase/ssr`) for auth and cookie-based sessions
- Supabase Storage for image uploads
- Arcjet for bot detection, rate limiting, and shield protection

## Project Structure

```
chatapp/
├── backend/
│   └── src/
│       ├── controllers/     # Route handlers (auth, messages)
│       ├── middleware/      # Auth guard, Arcjet protection, socket auth
│       ├── models/          # Mongoose schemas (Profile, Message)
│       ├── lib/             # DB connection, socket.io setup, Supabase clients, Arcjet config
│       ├── routes/          # Express route definitions
│       └── server.js        # App entry point
└── frontend/
    └── src/
        ├── components/      # UI components 
        ├── pages/            # Route-level pages (Login, Signup, ChatPage)
        ├── store/            # Zustand stores (auth, chat, theme)
        └── lib/              # Axios instance config
```

## Prerequisites

- Node.js (v18+ recommended)
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Supabase](https://supabase.com) project (for auth + storage)
- An [Arcjet](https://arcjet.com) account and site key (optional but recommended)

## Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
SUPABASE_URL=your_supabase_project_url
SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
ARCJET_KEY=your_arcjet_site_key
CLIENT_URL=http://localhost:5173
```

## Local Development

Run the backend and frontend as two separate processes during development:

```bash
# Terminal 1 — backend
cd backend
npm install
npm run dev

# Terminal 2 — frontend
cd frontend
npm install
npm run dev
```

- Backend runs on `http://localhost:3000`
- Frontend (Vite dev server) runs on `http://localhost:5173`

## Production Build & Deployment

From the project root:

```bash
npm run build   # installs both backend & frontend deps, builds the frontend
npm start       # starts the Express server, which serves the built frontend + API
```

Deployed on [Railway](https://railway.app)


## Real-Time Architecture
- On login, the client opens a Socket.IO connection authenticated via the Supabase session cookie.
- The server maps each authenticated user's ID to their active socket connection(s).
- When a message is sent, the server emits a `newMessage` event directly to the recipient's socket(s).

## Guest Accounts

To let people try the app instantly without hitting Supabase's free-tier email rate limit, ChatShat supports **guest login** via Supabase's built-in anonymous sign-in.

**Automatic cleanup (two layers):**
1. **On logout** — a guest's `Message`s and `Profile` are deleted from MongoDB immediately.
2. **Scheduled sweep** — a background job (`cleanupStaleGuests`, run every 6 hours via `setInterval` in `server.js`) deletes any guest `Profile` (and their `Message`s) older than 24 hours, catching abandoned sessions that never explicitly logged out.


## License

MIT
