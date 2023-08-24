function editProduct(id) {
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

    const productDetails = editForm.querySelector('#editProductForm');
    productDetails.addEventListener('submit', (e) => {
        e.preventDefault();

        const editedName = productDetails.querySelector('#editName').value;
        const editedEmail = productDetails.querySelector('#editEmail').value;
        const editedPhone = productDetails.querySelector('#editPhone').value;
        const editedPassword = productDetails.querySelector('#editPassword').value;

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
            console.log("Product updated:", res.data);
            alert("Profile updated successfully!");
            // products(); // Refresh the product list after update
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
    });

    // Append the edit form to a container in your HTML
    const editContainer = document.querySelector('.edit-container');
    editContainer.innerHTML = ''; // Clear previous contents
    editContainer.appendChild(editForm);
}