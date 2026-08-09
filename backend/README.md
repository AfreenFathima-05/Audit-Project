# Backend – Node + Express + Firebase Auth + MongoDB

## Folder structure
```
backend/
├── config/
│   ├── db.js                        # MongoDB (mongoose) connection
│   ├── firebase.js                  # Firebase Admin init (verifies Google login tokens)
│   └── serviceAccountKey.example.json  # rename to serviceAccountKey.json + fill real values
├── controllers/                     # (empty scaffold – move route logic here as it grows)
├── middleware/
│   └── authMiddleware.js            # protect + adminOnly (verifies Firebase token, loads Mongo user)
├── models/
│   ├── User.js
│   └── Audit.js
├── routes/
│   ├── authRoutes.js                # POST /api/auth/sync
│   ├── userRoutes.js                # GET  /api/users
│   └── auditRoutes.js               # GET/POST /api/audits
├── utils/                           # (empty scaffold – helper functions)
├── server.js                        # entry point
├── package.json
├── .env.example                     # copy to .env and fill your real values
└── .gitignore
```

## Setup
```bash
npm install
cp .env.example .env          # paste your real MONGO_URI, JWT_SECRET
cp config/serviceAccountKey.example.json config/serviceAccountKey.json   # paste real Firebase keys
npm run dev                   # or: node server.js
```

## Auth flow
Frontend does Google Sign-In via Firebase client SDK → gets a Firebase ID token →
sends it to `POST /api/auth/sync` → backend verifies it with `firebase-admin` →
creates/finds the matching user in MongoDB → all other routes protected by
`authMiddleware.js` (checks `Authorization: Bearer <token>`).
