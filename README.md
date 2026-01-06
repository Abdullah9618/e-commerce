# Biolife E-Commerce App

Modern React + Firebase e-commerce platform with admin dashboard, product management, and shopping cart functionality.

## 📁 Project Structure

```
e-commerce/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── AdminHeader.jsx
│   │   ├── AdminLayout.jsx
│   │   ├── AuthInput.jsx
│   │   ├── AuthLayout.jsx
│   │   ├── Banner.jsx
│   │   ├── CheckoutForm.jsx
│   │   ├── Contact.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── Loading.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProductGrid.jsx
│   │
│   ├── pages/            # Page-level components & routes
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Cart.jsx
│   │   ├── OrderSuccess.jsx
│   │   └── admin/        # Protected admin pages
│   │       ├── AdminLogin.jsx
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminProductList.jsx
│   │       ├── AddProduct.jsx
│   │       ├── EditProduct.jsx
│   │       ├── Categories.jsx
│   │       ├── Users.jsx
│   │       └── Orders.jsx
│   │
│   ├── context/          # React Context & state management
│   │   ├── AuthContext.jsx  # useAuth() hook
│   │   └── CartContext.jsx  # useCart() hook
│   │
│   ├── hooks/            # Custom React hooks
│   │   └── useCounts.js
│   │
│   ├── services/         # External integrations
│   │   └── firebase.js   # Firebase config & init
│   │
│   ├── assets/           # Images and static files
│   ├── App.jsx           # Main app & routing
│   └── main.jsx          # React entry point
│
├── .env                  # Environment variables (local fallbacks)
├── .env.example          # Template (copy to .env.local)
├── package.json
├── vite.config.js
├── DEPLOY.md            # Vercel deployment guide
└── README.md            # This file
```

## 🎯 Key Features

✅ **Modern React Patterns**
- useReducer for predictable state management (Auth & Cart)
- Context API for prop-drilling avoidance
- Custom hooks for Firestore queries

✅ **Error Handling & UX**
- Error Boundary component for runtime errors
- Loading states for async operations
- Debug logging (Firebase project ID, fetch counts)

✅ **Authentication & Authorization**
- Firebase Auth for users (signup/login)
- localStorage-based admin auth (consider custom claims for production)
- Protected routes for user & admin pages

✅ **Responsive Design**
- Tailwind CSS + Material-UI
- Mobile-first approach
- Works on all devices

✅ **Production-Ready**
- Clean code structure
- No duplicate components
- Build succeeds with zero errors
- Environment variable configuration
- Vercel deployment ready

## 🚀 Quick Start

### Install & Run Locally
```bash
npm install
npm run dev
# Open http://localhost:5173
```

### Build for Production
```bash
npm run build
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 🔐 Environment Setup

Create `.env.local` in project root:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

See `.env.example` for template. If Vite env vars are not set, the app falls back to committed Firebase config.

## 📦 Deploy on Vercel

1. Connect your GitHub repo to Vercel dashboard
2. Set environment variables in project settings (same keys as `.env.example`)
3. Deploy — Vercel auto-runs `npm run build`

See `DEPLOY.md` for detailed instructions.

## 🛠️ Tech Stack

- **React 18** — UI framework
- **Vite** — Lightning-fast build tool
- **Firebase** — Backend (Auth, Firestore, Storage)
- **React Router v7** — Client routing
- **Tailwind CSS** — Utility-first CSS
- **Material-UI** — Admin dashboard components
- **Axios** — HTTP client

## 📋 Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /products/{productId} {
      allow read: if true;  // Public
      allow write: if request.auth.token.admin == true;
    }
    match /orders/{orderId} {
      allow read, write: if request.auth.token.admin == true;
    }
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## ✅ Quality Checklist

- ✅ No duplicate components
- ✅ Clean folder structure
- ✅ useReducer state management
- ✅ Error boundaries & loading states
- ✅ Build: `npm run build` succeeds
- ✅ Dev: `npm run dev` runs without errors
- ✅ All existing functionality preserved
- ✅ Production-ready for Vercel

## 🐛 Debugging

Console logs to help troubleshoot:
- `[ProductGrid] Firebase projectId:` — Confirms which Firebase project is active
- `[ProductGrid] fetched products:` — Logs number of products loaded
- `[services/firebase]` — Missing Vite env vars warning

## 📝 Notes

- Products won't display if Firestore `products` collection is empty. Use admin panel to add products.
- Admin authentication uses localStorage; for production consider Firebase custom claims.
- `src/firebase.js` is a backward compatibility shim; the actual config is in `src/services/firebase.js`.

---

**Last Updated:** January 2026 | **Built with:** React + Vite + Firebase
