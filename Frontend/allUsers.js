function users() {
    const token = localStorage.token;

    axios
        .get(
            "http://localhost:4500/users/allusers",
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
            
            const tableBody = document.querySelector('.user-table'); // Select the table body element

            result.users.forEach(user => {
                
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.phone_number}</td>
                    <td>
                        <div class="actions">
                            <button class="button remove-button" data-id="${user.id}" style="background-color: rgba(203, 34, 34, 1);">Remove</button>
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
                        //reload page here
                        window.location.reload();
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

// Call the function to fetch and display users
users();
