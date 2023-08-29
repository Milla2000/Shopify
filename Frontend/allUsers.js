
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
            window.location.reload();
            
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
}

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
                            <button class="button remove-button" data-id="${user.id}" data-username="${user.username}"  style="background-color: rgba(203, 34, 34, 1);">Remove</button>
                        </div>
                    </td>
                `;

                tableBody.appendChild(newRow); // Append the new row to the table body
            });

            // Add event listener to remove and edit buttons
            tableBody.addEventListener('click', (event) => {
                if (event.target.classList.contains('remove-button')) {
                    const id = event.target.getAttribute('data-id');
                    // const username = event.target.getAttribute('data-username');
                    const confirmationMessage = "Are you sure you want to delete ${username}?";
                    showConfirmationModal(confirmationMessage, () => {
                        deleteUser(id);
                    });
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


function showConfirmationModal(confirmationMessage, confirmCallback) {
    const modal = document.createElement("div");
    modal.className = "confirmation-modal";
    modal.innerHTML = `
        <div class="modal-content">
            <p>${confirmationMessage}</p>
            <button class="confirm-button">Confirm</button>
            <button class="cancel-button">Cancel</button>
        </div>
    `;

    const confirmButton = modal.querySelector(".confirm-button");
    const cancelButton = modal.querySelector(".cancel-button");

    cancelButton.addEventListener("click", () => {
        document.body.removeChild(modal);
    });

    confirmButton.addEventListener("click", () => {
        document.body.removeChild(modal);
        confirmCallback(); // Call the provided callback function
    });

    document.body.appendChild(modal);
}


// Call the function to fetch and display users
users();
