# Firebase setup — AUJ Computer Institute

Auth and account data are real (Firebase Auth + Firestore). Nothing is
mocked once you wire in your project.

## 1. Create the Firebase project

1. Go to https://console.firebase.google.com → **Add project**.
2. Once created, click the **Web** icon (`</>`) to register a web app.
3. Copy the `firebaseConfig` values it shows you.

## 2. Enable Auth + Firestore

- **Authentication** → Sign-in method → enable **Email/Password**.
- **Firestore Database** → Create database → start in **production mode**.
- Go to Firestore → **Rules** tab, paste the contents of `firestore.rules`
  from this project, and click **Publish**.

## 3. Add your keys to the app

```bash
cp .env.example .env.local
```

Fill in the six `VITE_FIREBASE_...` values from step 1. Never commit
`.env.local` — it's already git-ignored.

## 4. Install and run

```bash
npm install
npm run dev
```

## 5. Create the first Super Admin account

There's no public admin sign-up screen on purpose — admin access is only
reachable at a secret URL, and the account is created manually once:

1. In Firebase Console → **Authentication** → **Users** → **Add user**.
   Enter a real email (e.g. `admin@auj.edu.pk`) and a strong password.
2. Copy the new user's **UID** from the users table.
3. In **Firestore Database** → **Start collection** → collection ID `users`.
   Create a document with **Document ID = that UID**, and these fields:

   | field | type | value |
   |---|---|---|
   | role | string | `admin` |
   | name | string | your name |
   | email | string | the email from step 1 |

4. Run the app and open **`http://localhost:5173/#admin-portal-x7q2`**
   (set in `src/App.jsx` as `ADMIN_ROUTE_TOKEN` — change it to your own
   secret string before deploying, and don't link to it anywhere).
5. Sign in with the email/password from step 1.

From the admin dashboard you can now add real Teacher and Student
accounts — each gets a real Firebase Auth login plus a Firestore
profile. They sign in with their assigned ID and a temporary password
shown **once** at creation, so copy it down and share it securely.

## How ID-based login works

Firebase Auth needs an email under the hood. Student/Teacher IDs are
turned into a synthetic address automatically (e.g. `STU-2044` →
`stu-2044@students.auj.internal`). This happens the same way both when
the admin creates the account and when the person signs in, so it's
invisible to everyone but the code. It's not a real mailbox and doesn't
need to be.

## Why account creation doesn't log the admin out

`createUserWithEmailAndPassword()` normally signs you in as the new
user. To avoid kicking the admin out of their own session, the app
creates each account on a throwaway secondary Firebase App instance and
tears it down immediately (`getScratchAuth()` in `src/firebase.js`).

## What's real vs. sample data

- **Real:** login for all three roles, admin's Teacher/Student
  management (add, list, suspend/reactivate), every user's own profile
  page, and the entire public website.
- **Sample:** academic content in the portals — attendance, marks,
  timetable, assignments. Wiring these to real Firestore collections is
  the natural next step.

## Deploying

Static Vite build (`npm run build` → `dist/`). Deploys as-is to Netlify,
Vercel, or Firebase Hosting. The app uses hash routing only, so no
server rewrite rules are needed.
