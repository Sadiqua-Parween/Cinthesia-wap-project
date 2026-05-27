import { auth, firestore, isFirebaseConfigured, rtdb } from './config';
import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged,
  signInWithEmailAndPassword as fbSignInWithEmailAndPassword,
  signOut as fbSignOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, get, set } from 'firebase/database';

// Set this database type toggle to 'firestore' or 'rtdb' depending on your Firebase setup
export const DB_TYPE = 'firestore'; 
const LOCAL_API_URL = import.meta.env.VITE_LOCAL_API_URL || 'http://localhost:3001/api';
const LOCAL_USER_KEY = 'cinthesia_user';

function getLocalUser() {
  try {
    const savedUser = localStorage.getItem(LOCAL_USER_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

function setLocalUser(user) {
  if (user) {
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(LOCAL_USER_KEY);
  }
  window.dispatchEvent(new Event('cinthesia-local-auth-changed'));
}

async function postLocalAuth(path, body) {
  const response = await fetch(`${LOCAL_API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Authentication failed.');
  }

  return data;
}

export function watchAuthState(callback) {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, callback);
  }

  const notify = () => callback(getLocalUser());
  notify();
  window.addEventListener('cinthesia-local-auth-changed', notify);
  window.addEventListener('storage', notify);
  return () => {
    window.removeEventListener('cinthesia-local-auth-changed', notify);
    window.removeEventListener('storage', notify);
  };
}

/**
 * Writes user details into the configured database (Firestore or Realtime Database).
 * If the user's data already exists, it skips writing to prevent duplicates.
 * 
 * @param {string} uid - Firebase Auth user uid
 * @param {Object} details - Object containing name, email, profilePhoto (optional), and createdAt
 */
export async function saveUserData(uid, details) {
  if (!isFirebaseConfigured) {
    return;
  }

  const userData = {
    uid,
    name: details.name,
    email: details.email,
    profilePhoto: details.profilePhoto || null,
    createdAt: details.createdAt || new Date().toISOString()
  };

  try {
    if (DB_TYPE === 'firestore') {
      const docRef = doc(firestore, 'users', uid);
      const docSnap = await getDoc(docRef);
      
      // If user document doesn't exist, create it
      if (!docSnap.exists()) {
        await setDoc(docRef, userData);
        console.log(`[Firestore] Successfully created profile for user: ${uid}`);
      } else {
        console.log(`[Firestore] User profile already exists for: ${uid}. Skipping creation.`);
      }
    } else {
      // Realtime Database implementation
      if (!rtdb) {
        throw new Error("Firebase Realtime Database is not initialized. Please verify VITE_FIREBASE_DATABASE_URL starts with 'https://'.");
      }
      const userRef = ref(rtdb, `users/${uid}`);
      const snapshot = await get(userRef);
      
      // If user profile doesn't exist, create it
      if (!snapshot.exists()) {
        await set(userRef, userData);
        console.log(`[Realtime DB] Successfully created profile for user: ${uid}`);
      } else {
        console.log(`[Realtime DB] User profile already exists for: ${uid}. Skipping creation.`);
      }
    }
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
}

/**
 * Reads user data from the configured database.
 * 
 * @param {string} uid - Firebase Auth user uid
 * @returns {Promise<Object|null>} - User details or null
 */
export async function getUserData(uid) {
  if (!isFirebaseConfigured) {
    return getLocalUser();
  }

  try {
    if (DB_TYPE === 'firestore') {
      const docSnap = await getDoc(doc(firestore, 'users', uid));
      return docSnap.exists() ? docSnap.data() : null;
    } else {
      if (!rtdb) {
        throw new Error("Firebase Realtime Database is not initialized. Please verify VITE_FIREBASE_DATABASE_URL starts with 'https://'.");
      }
      const snapshot = await get(ref(rtdb, `users/${uid}`));
      return snapshot.exists() ? snapshot.val() : null;
    }
  } catch (error) {
    console.error("Error reading user data:", error);
    throw error;
  }
}

/**
 * Signs up a new user using Firebase Auth and stores user details in the database.
 * 
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} name - User full name
 * @param {string|null} profilePhoto - Optional profile photo URL
 * @returns {Promise<Object>} - Object with success state and authenticated user
 */
export async function signUpWithEmailAndPassword(email, password, name, profilePhoto = null) {
  if (!isFirebaseConfigured) {
    const data = await postLocalAuth('/signup', { name, email, password });
    return { success: true, user: data.user, message: data.message };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Automatically save user details to database after registration
    await saveUserData(user.uid, {
      name,
      email,
      profilePhoto,
      createdAt: new Date().toISOString()
    });
    
    return { success: true, user, message: 'Account created successfully! You can now sign in.' };
  } catch (error) {
    console.error("Sign Up failed:", error.message);
    throw error;
  }
}

/**
 * Signs in an existing user using Firebase Auth.
 * 
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - Object with success state, auth user, and database profile
 */
export async function signInUser(email, password) {
  if (!isFirebaseConfigured) {
    const data = await postLocalAuth('/signin', { email, password });
    setLocalUser(data.user);
    return { success: true, user: data.user, userData: data.user, message: data.message };
  }

  try {
    const userCredential = await fbSignInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Fetch database profile details
    const userData = await getUserData(user.uid);
    
    return { success: true, user, userData, message: `Login successful! Welcome back, ${userData?.name || 'Glow-getter'}.` };
  } catch (error) {
    console.error("Sign In failed:", error.message);
    throw error;
  }
}

/**
 * Signs out the currently authenticated user.
 * 
 * @returns {Promise<Object>} - Object with success state
 */
export async function signOutUser() {
  if (!isFirebaseConfigured) {
    setLocalUser(null);
    return { success: true };
  }

  try {
    await fbSignOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Sign Out failed:", error.message);
    throw error;
  }
}
