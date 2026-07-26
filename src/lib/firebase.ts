import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer,
  collection,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App & Services
const app = initializeApp(firebaseConfig);

/* CRITICAL: The app will break without specifying firestoreDatabaseId */
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Connection check
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log('[Firebase] Firestore connected successfully.');
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('[Firebase] Firestore client is offline. Check configuration.');
    }
  }
}

// Run initial connection test
testFirestoreConnection();

// Error Handling Enum & Interface according to Firebase Skill Specs
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error Details:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Auth Helper Functions
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    if (user) {
      // Sync user profile doc
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName || 'Ministry Member',
        email: user.email || '',
        createdAt: new Date().toISOString()
      }, { merge: true });
    }
    return user;
  } catch (error: any) {
    if (
      error?.code === 'auth/popup-closed-by-user' || 
      error?.code === 'auth/cancelled-popup-request' ||
      error?.code === 'auth/popup-blocked'
    ) {
      console.log('[Firebase Auth] Sign-in popup was closed or cancelled by the user.');
      return null;
    }
    console.error('Google Sign-In Error:', error);
    return null;
  }
}

export async function signOutUser() {
  return firebaseSignOut(auth);
}

// Data Services with Error Handling
export interface FirebasePrayerRequest {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  isPrivate: boolean;
  createdAt: string;
  syncedToWordPress?: boolean;
  userId?: string;
}

export async function addPrayerRequestToFirestore(prayer: FirebasePrayerRequest) {
  const pathName = 'prayer_requests';
  try {
    const docRef = doc(collection(db, pathName));
    const reqData = {
      ...prayer,
      userId: auth.currentUser?.uid || prayer.userId || 'anonymous'
    };
    await setDoc(docRef, reqData);
    return { id: docRef.id, ...reqData };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, pathName);
  }
}

export function subscribePublicPrayerRequests(callback: (requests: FirebasePrayerRequest[]) => void) {
  const pathName = 'prayer_requests';
  try {
    const q = query(collection(db, pathName), where('isPrivate', '==', false));
    return onSnapshot(q, (snapshot) => {
      const requests: FirebasePrayerRequest[] = [];
      snapshot.forEach(doc => {
        requests.push({ id: doc.id, ...doc.data() } as FirebasePrayerRequest);
      });
      callback(requests);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, pathName);
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, pathName);
    return () => {};
  }
}

export interface FirebaseTicketBooking {
  id?: string;
  eventId: string;
  eventTitle?: string;
  eventDate?: string;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone?: string;
  ticketsCount: number;
  ticketCode: string;
  bookingDate: string;
  userId?: string;
}

export async function addTicketBookingToFirestore(booking: FirebaseTicketBooking) {
  const pathName = 'tickets';
  try {
    const docRef = doc(collection(db, pathName));
    const bookingData = {
      ...booking,
      userId: auth.currentUser?.uid || 'guest'
    };
    await setDoc(docRef, bookingData);
    return { id: docRef.id, ...bookingData };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, pathName);
  }
}

export function subscribeUserTickets(userEmail: string, userId: string | undefined, callback: (tickets: FirebaseTicketBooking[]) => void) {
  const pathName = 'tickets';
  try {
    const q = userId 
      ? query(collection(db, pathName), where('userId', '==', userId))
      : query(collection(db, pathName), where('attendeeEmail', '==', userEmail));

    return onSnapshot(q, (snapshot) => {
      const tickets: FirebaseTicketBooking[] = [];
      snapshot.forEach(doc => {
        tickets.push({ id: doc.id, ...doc.data() } as FirebaseTicketBooking);
      });
      callback(tickets);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, pathName);
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, pathName);
    return () => {};
  }
}
