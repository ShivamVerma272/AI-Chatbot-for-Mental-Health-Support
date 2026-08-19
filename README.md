# AI Chatbot for Mental Health Support

A final-year style full-stack project that combines an AI support chatbot with mood tracking, journaling, wellness activities, counselor information and appointment requests.

## Features

- Register and login with JWT authentication
- Password hashing with bcrypt
- Personal dashboard
- Mood check-ins and mood history
- Mood summary
- AI chatbot using Gemini API
- Chat history stored in MongoDB
- Personal journal
- Breathing exercise
- Daily wellness tips
- Counselor directory
- Appointment requests
- Responsive UI
- MongoDB Atlas ready
- Vercel-ready architecture

## Setup

1. Install Node.js.
2. Open this project folder in VS Code.
3. Run:

   npm install

4. Create `.env` from `.env.example`.
5. Add MongoDB Atlas URI, JWT secret and Gemini API key.
6. Run:

   npm run dev

7. Open:

   http://localhost:3000

## MongoDB

Create a free MongoDB Atlas cluster and put its connection string in `MONGODB_URI`.

## Gemini

Create a Gemini API key and put it in `GEMINI_API_KEY`.

Never commit `.env` or API keys to GitHub.

## GitHub

git init
git add .
git commit -m "AI Chatbot for Mental Health Support"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main

## Note

This application is an educational/student project. It provides general emotional support and does not diagnose conditions, prescribe medication, or replace qualified professional care. In an immediate emergency, users should contact appropriate local emergency or professional support.
