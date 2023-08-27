function editUserProfile() {
    const token = localStorage.token;
    const editForm = document.createElement('div');
    editForm.innerHTML = `
        <form id="editProfileForm">
            <label for="editName">Name:</label>
            <input type="text" id="editName" name="name">
            <label for="editEmail">Email:</label>
            <input type="email" id="editEmail" name="email">
            <label for="editPhone">Phone:</label>
            <input type="number" id="editPhone" name="Phone">
            <label for="editPassword">Password:</label>
            <input type="text" id="editPassword" name="Password">
            <button type="submit">Save Changes</button>
        </form>
    `;

    // Append the edit form to a container in your HTML
    const editContainer = document.querySelector('.edit-container');
    editContainer.innerHTML = ''; // Clear previous contents
    editContainer.appendChild(editForm);

    const editProfileForm = editForm.querySelector('#editProfileForm');
    editProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const editedName = editProfileForm.querySelector('#editName').value;
        const editedEmail = editProfileForm.querySelector('#editEmail').value;
        const editedPhone = editProfileForm.querySelector('#editPhone').value;
        const editedPassword = editProfileForm.querySelector('#editPassword').value;

        const id = localStorage.getItem('id'); // Get the user ID from local storage

        axios.put(
            `http://localhost:4500/users/${id}`,
            {
                username: editedName,
                email: editedEmail,
                phone_number: editedPhone,
                password: editedPassword
            },
            {
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "token": token
                }
            }
        )
        .then((res) => {
            console.log("Profile updated:", res.data);
            const successMessage = document.querySelector('.success-message');
            successMessage.textContent = res.data.message; // Update the success message content
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
    });
}

// Call the function to set up the edit form
editUserProfile();