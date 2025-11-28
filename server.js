// server.js (Firebase Firestore Backend)

const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// --- IMPORTANT CONFIGURATION ---
// ⚠️ Replace this path with the correct location of your Firebase Service Account Key.
// You should download this JSON file from your Firebase Project Settings > Service Accounts.
const serviceAccount = require("./serviceAccountKey.json"); 
// -------------------------------

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = admin.firestore();
const USERS_COLLECTION = "users";
const app = express();
const PORT = 3000;

// Middleware Setup
app.use(cors()); // Enables cross-origin requests from your frontend
app.use(express.json()); // Parses incoming JSON requests

// =====================================================
// 1. CREATE USER (POST /api/users)
// =====================================================
app.post("/api/users", async (req, res) => {
    try {
        const userData = req.body;
        
        // --- VALIDATION ADJUSTED TO MATCH FRONTEND FIELDS ---
        if (!userData.fullName || !userData.email || !userData.phoneNumber || !userData.address) {
            return res.status(400).json({ message: "Missing required fields: fullName, email, phoneNumber, or address." });
        }
        // ---------------------------------------------------

        userData.createdAt = admin.firestore.FieldValue.serverTimestamp();
        
        // Add user data to the Firestore collection
        const docRef = await db.collection(USERS_COLLECTION).add(userData);
        
        // Respond with the new document ID and the data
        res.status(201).json({ id: docRef.id, ...userData });
        
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ message: "Failed to create user." });
    }
});

// =====================================================
// 2. READ ALL USERS (GET /api/users)
// =====================================================
app.get("/api/users", async (req, res) => {
    try {
        const snapshot = await db.collection(USERS_COLLECTION).get();
        // Map Firestore documents to a simple array of objects
        const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); 
        res.status(200).json(users);
        
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Failed to fetch users." });
    }
});

// =====================================================
// 3. UPDATE USER (PUT /api/users/:id)
// =====================================================
app.put("/api/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        
        // Update the document by ID
        await db.collection(USERS_COLLECTION).doc(id).update(updateData);
        
        res.status(200).json({ id: id, message: "User updated successfully" });
        
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(404).json({ message: "User not found or update failed." });
    }
});

// =====================================================
// 4. DELETE USER (DELETE /api/users/:id)
// =====================================================
app.delete("/api/users/:id", async (req, res) => {
    try {
        const id = req.params.id;
        
        // Delete the document by ID
        await db.collection(USERS_COLLECTION).doc(id).delete();
        
        // Respond with a 200 success, or 204 No Content is also common for deletion
        res.status(200).json({ message: "User deleted successfully" });
        
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(404).json({ message: "User not found or delete failed." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log("🔥 Connected to Firebase Firestore.");
});