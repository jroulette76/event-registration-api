import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

import * as serviceAccount from "../event-registration-api-3a052-firebase-adminsdk-fbsvc-abdf0be1b8.json";

// Initialize Firebase
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

// Firestore database instance
const db: Firestore = getFirestore();

export { db };