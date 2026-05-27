# Firebase Security Rules Example

To secure your user data, apply these security rules in your Firebase Console under **Firestore Rules** or **Realtime Database Rules** sections.

---

## 1. Cloud Firestore Rules

These rules configure Cloud Firestore to only allow authenticated users to read or write their own user document under the `users` collection. A user cannot read or write another user's document.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // User profile rules
    match /users/{userId} {
      // Users can only read and write their own data
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
  }
}
```

---

## 2. Firebase Realtime Database Rules

These rules organize Firebase Realtime Database to only allow authenticated users read and write access to their specific child node under `users/$uid`.

```json
{
  "rules": {
    "users": {
      "$uid": {
        // Only the user themselves can read or write their own data
        ".read": "auth !== null && auth.uid === $uid",
        ".write": "auth !== null && auth.uid === $uid"
      }
    }
  }
}
```
