# Registration-Form
# 🎓 Firebase Firestore User Management System (UMS)

A simple, full-stack application demonstrating fundamental **CRUD** (Create, Read, Update, Delete) operations. This project uses a **Node.js + Express** backend, **Firebase Firestore** database, and a clean **HTML + Vanilla JavaScript + CSS** frontend for a streamlined management experience.

## ✨ Features

### ✔️ Add Users (Create)
Enter user details in the registration form (`index.html`). The data is validated on the client side and securely stored in Firebase Firestore via a **POST** request to the API.

### ✔️ View Users (Read)
Displays all registered users in a comprehensive table (`user_list.html`). Fetches data via **GET /api/users** and shows key fields like **Full Name**, **Email**, **Phone**, **Address**, and **Birth Date**.

### ✔️ Update Users (Update)
Edit user details using a modal on the user list page. Updates are persisted to the database through a **PUT /api/users/:id** request.

### ✔️ Delete Users (Delete)
Delete user records instantly from the database and the table through a **DELETE /api/users/:id** request.

---

## 🛠️ Components & Technologies

| Layer | Component | Description |
| :--- | :--- | :--- |
| **Backend** | **Node.js & Express.js** | The server environment and web framework for building the REST API. |
| **Database** | **Firebase Firestore** | NoSQL cloud database used for storing all user records. |
| **Authentication** | **Firebase Admin SDK** | Used in `server.js` for secure initialization and database access. |
| **Frontend** | **HTML, CSS, JavaScript** | Pure frontend stack for the user interface and logic (`app.js`). |

## 🚀 Setup and Running the Backend

### 1. Prerequisites

Make sure you have **Node.js** and **npm** installed on your system.

### 2. Install Dependencies

In your project's root directory (where `server.js` is located), install the required Node.js packages:

```bash
npm install express cors firebase-admin
3. Firebase Service Account Key
Go to your Firebase Project Console.

Navigate to Project Settings (gear icon) -> Service accounts.

Click Generate new private key and download the JSON file.

Rename the downloaded file to serviceAccountKey.json and place it in the project root directory.

🚨 IMPORTANT: For security, ensure serviceAccountKey.json is added to your .gitignore file and never committed to a public repository.

4. Run the Backend Server
Execute the main server file using Node.js:

Bash

node server.js
The console should display:

🚀 Server running on http://localhost:3000
🔥 Connected to Firebase Firestore.
5. Access the Frontend
Open the index.html file in your web browser. The frontend (app.js) is configured to send requests to http://localhost:3000/api/users.
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0c8dc7a5-6cd8-466c-a08b-c7cabd75d68b" />


## 📁 Project Structure

The project follows a standard structure for a small full-stack application:<img width="1498" height="787" alt="database " src="https://github.com/user-attachments/assets/c36365ab-38b3-4c0b-bda6-7d9ac2fc709e" />
