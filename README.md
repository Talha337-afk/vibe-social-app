# Vibe

Vibe is a mobile-first social app for a supervised community of kids and teens. This repository contains a static frontend for GitHub Pages, paired with Firebase backend configuration and security rules for authentication, Firestore, and storage.

## Features included

- Sign up / login / logout
- Private accounts with friend requests
- Friends, suggestions, and request handling
- Feed with posts, likes, comments, saves, and shares
- Reels with upload UI and safe moderation hooks
- Notifications, profile editing, and privacy controls
- Parent/guardian controls and moderation screens
- Admin dashboard for reports and moderation actions
- Mobile-first responsive design with light/dark mode
- Firebase-ready database and storage rules

## Hosting model

- Frontend: GitHub Pages
- Backend: Firebase Auth + Firestore + Firebase Storage
- Cost: Free tier for small deployments

## Local setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication > Email/Password
3. Create a Firestore database and Storage bucket
4. Copy `firebase-config.example.js` to `firebase-config.js`
5. Fill in your Firebase project config values
6. Deploy the site to GitHub Pages or use a local static server for testing

## Files

- `index.html` — app shell and UI
- `styles.css` — mobile-first design system
- `app.js` — app logic, rendering, demo data, and Firebase integration
- `firebase-config.example.js` — template for Firebase config
- `firebase.json` — Firebase hosting config
- `firestore.rules` — Firestore security rules
- `storage.rules` — Storage security rules
- `.firebaserc` — Firebase default project name

## Note on GitHub Pages

GitHub Pages hosts only static assets. Real accounts and persistent data require Firebase or another backend service. This repo is configured to work in demo mode without Firebase credentials and to switch to Firebase automatically when valid configuration is added.

## Recommended deployment flow

- Frontend: GitHub Pages
- Backend: Firebase
- Database: Firestore
- Media: Firebase Storage

## Basic Firebase rules summary

- Users can only read/write their own profile data, unless they are admins or approved friends
- Friend requests and friendships are protected by owner checks
- Posts and reels are readable only to approved friends or public-safe content
- Reports can be created by logged-in users and reviewed by moderators/admins
- Moderators/admins can remove harmful content and suspend accounts

## Demo accounts

- Admin: admin@vibe.app / admin123
- Parent: parent@vibe.app / parent123
- Child: maya@vibe.app / demo123
- Child: leo@vibe.app / demo123
- Child: zara@vibe.app / demo123

## Security notes

- Never commit real Firebase secrets or production credentials into a public repo
- Keep storage and Firestore rules strict
- Validate uploads and moderation decisions before live publishing
- Use Firebase App Check for production deployments

## License

MIT
