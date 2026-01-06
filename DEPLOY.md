Deployment & Env setup

1) Local testing (Vite)

- Install dependencies:

```bash
npm install
```

- Start dev server:

```bash
npm run dev
```

2) Environment variables

Create a `.env.local` in project root with your Firebase credentials (do not commit):

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

3) Vercel deployment

- In the Vercel dashboard for your project, set the same variables (without the leading "VITE_" if you prefer, but this project expects VITE_ prefixed keys).
- Build command: `npm run build`
- Output directory: `dist`

4) Notes & troubleshooting

- If products do not appear, verify `VITE_FIREBASE_PROJECT_ID` matches your Firebase project and that Firestore has a `products` collection with documents.
- Console debugging: the app logs the Firebase `projectId` on startup (look for `[ProductGrid] Firebase projectId:`) to help confirm which project it is connected to.

5) Security

- Keep Firebase API keys and project IDs out of public repos. Use Vercel environment variables for production.
