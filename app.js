// ---------------------------------------------
// API BASE URL (Backend running on localhost:3000)
// ---------------------------------------------
const API_BASE_URL = "http://localhost:3000/api/users";


// =====================================================
// 1️⃣ REGISTER USER (index.html)
// =====================================================
async function handleRegistration() {
    const userData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        address: document.getElementById("address").value,
        birthDate: document.getElementById("birthDate").value,
    };

    try {
        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert("❌ Registration failed: " + errorData.message);
            return;
        }

        alert("✅ User Registered Successfully!");
        document.getElementById("registrationForm").reset();

    } catch (error) {
        console.error("Error registering user:", error);
        alert("❌ Server Error. Check Console.");
    }
}



// =====================================================
// 2️⃣ LOAD USERS INTO TABLE (user_list.html)
// =====================================================
async function loadUsers() {
    const tableBody = document.getElementById("userTableBody");
    if (!tableBody) return; // Run only on user_list page

    try {
        const response = await fetch(API_BASE_URL);
        const users = await response.json();

        tableBody.innerHTML = "";

        users.forEach(user => {
            const row = `
                <tr>
                    <td>${user.fullName}</td>
                    <td>${user.email}</td>
                    <td>${user.phoneNumber}</td>
                    <td>${user.address}</td>
                    <td>${user.birthDate || "-"}</td>
                    <td>
                        <button class="action-btn action-btn-update" onclick='openModal(${JSON.stringify(user)})'>Edit</button>
                        <button class="action-btn action-btn-delete" onclick='deleteUser("${user.id}")'>Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

    } catch (error) {
        console.error("Error loading users:", error);
        tableBody.innerHTML = "<tr><td colspan='6'>Error loading users.</td></tr>";
    }
}

document.addEventListener("DOMContentLoaded", loadUsers);



// =====================================================
// 3️⃣ OPEN & CLOSE UPDATE MODAL
// =====================================================
function openModal(user) {
    document.getElementById("updateId").value = user.id;
    document.getElementById("updateFullName").value = user.fullName;
    document.getElementById("updateEmail").value = user.email;
    document.getElementById("updatePhoneNumber").value = user.phoneNumber;
    document.getElementById("updateAddress").value = user.address;
    document.getElementById("updateBirthDate").value = user.birthDate || "";

    document.getElementById("updateModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("updateModal").style.display = "none";
}



// =====================================================
// 4️⃣ UPDATE USER
// =====================================================
async function handleUpdate() {
    const id = document.getElementById("updateId").value;

    const updateData = {
        fullName: document.getElementById("updateFullName").value,
        email: document.getElementById("updateEmail").value,
        phoneNumber: document.getElementById("updatePhoneNumber").value,
        address: document.getElementById("updateAddress").value,
        birthDate: document.getElementById("updateBirthDate").value,
    };

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateData)
        });

        if (!response.ok) {
            alert("❌ Failed to update user.");
            return;
        }

        alert("✅ User Updated Successfully!");
        closeModal();
        loadUsers();

    } catch (error) {
        console.error("Error updating user:", error);
        alert("❌ Server Error.");
    }
}



// =====================================================
// 5️⃣ DELETE USER
// =====================================================
async function deleteUser(id) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            alert("❌ Failed to delete user.");
            return;
        }

        alert("🗑 User Deleted");
        loadUsers();

    } catch (error) {
        console.error("Error deleting user:", error);
        alert("❌ Server Error.");
    }
}
