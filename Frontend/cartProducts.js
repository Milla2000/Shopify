function cartItems() {
    const token = localStorage.token;

    axios
        .get(
            "http://localhost:4500/users/allcartitems",
            {
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "token": token
                },
            }
        )
        .then((res) => {
            const result = res.data;
            console.log(result);
            
            const tableBody = document.querySelector('.cart-table'); // Select the table body element

            result.cartItems.forEach(cartItem => {
                
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${cartItem.username}</td>
                    <td>${cartItem.user_id}</td>
                    <td>${cartItem.phone_number}</td>
                    <td>
                        <div class="actions">
                            <button class="button remove-button" data-id="${cartItem.id}" style="background-color: rgba(203, 34, 34, 1);">Remove</button>
                        </div>
                    </td>
                `;

                tableBody.appendChild(newRow); // Append the new row to the table body
            });

            // Add event listener to remove and edit buttons
            tableBody.addEventListener('click', (event) => {
                function deleteUser(userId) {
                    const token = localStorage.token;
                
                    axios.delete(`http://localhost:4500/users/softdelete/${userId}`, {
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json",
                            "token": token
                        }
                    })
                    .then((res) => {
                        console.log("User deleted:", res.data);
                        alert("User deleted successfully!");
                        // You might want to refresh the user list after deletion
                        users();
                    })
                    .catch((error) => {
                        console.error('An error occurred:', error);
                    });
                }
                
                if (event.target.classList.contains('remove-button')) {
                    const id = event.target.getAttribute('data-id');
                    if (confirm('Are you sure you want to delete this user?')) {
                        deleteUser(id);
                    }
                } else if (event.target.classList.contains('edit-button')) {
                    const id = event.target.getAttribute('data-id');
                    editUser(id);
                }
            });
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
}

// Call the function to fetch and display cart items
cartItems();
