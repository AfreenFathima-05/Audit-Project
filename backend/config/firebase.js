// firebase-admin v14 uses the fully modular API (no more admin.apps / admin.auth()
// namespace style) -- this initializes the app once and exports a getAuth() you
// can call directly wherever a Firebase ID token needs verifying.
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const path = require('path');
const fs = require('fs');

const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');

if (!getApps().length) {
  if (fs.existsSync(serviceAccountPath)) {
    // Local / uploaded credentials file
    const serviceAccount = require(serviceAccountPath);
    initializeApp({ credential: cert(serviceAccount) });
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    // Production: credentials injected as a JSON string env var
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    initializeApp({ credential: cert(serviceAccount) });
  } else {
    console.warn(
      'Firebase Admin: no serviceAccountKey.json or FIREBASE_SERVICE_ACCOUNT env var found. ' +
      'Google Sign-In verification will fail until credentials are provided.'
    );
  }
}

module.exports = { getAuth };
