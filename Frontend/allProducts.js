const toast = document.getElementById("toast");
const toastText = document.getElementById("toast-text");
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


function products() {
    const token = localStorage.token;

    axios
        .get(
            "http://localhost:4500/products",
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
            // newRow = ""
            const tableBody = document.querySelector('.cart-table'); // Select the table body element
            tableBody.innerHTML = "";
            result.products.forEach(product => {
                
                const newRow = document.createElement('tr');
                
                newRow.innerHTML = `
                    <td><img src="${product.image}" alt="Product Image"></td>
                    <td>${product.name}</td>
                    <td>Ksh ${product.price}</td>
                    <td>
                        <div class="actions">
                            <button class="button edit-button" data-id="${product.id}">Edit</button>
                            <button class="button remove-button" data-id="${product.id}" style="background-color: rgba(203, 34, 34, 1);">Remove</button>
                        </div>
                    </td>
                `;

                tableBody.appendChild(newRow); // Append the new row to the table body
            });

            // Add event listener to remove and edit buttons
            tableBody.addEventListener('click', (event) => {
                if (event.target.classList.contains('remove-button')) {
                    
                    const id = event.target.getAttribute('data-id');
                    const confirmationMessage = "Are you sure you want to delete this product?";
                    showConfirmationModal(confirmationMessage, () => {
                        deleteProduct(id);
                    });

                } else if (event.target.classList.contains('edit-button')) {
                    const id = event.target.getAttribute('data-id');
                    editProduct(id);
                }
            });
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
}

function showToast(message) {

    toast.style.display = "block";
    toastText.textContent = message;
    toast.style.right = "40px"; // Show the toast

    setTimeout(() => {
        toast.style.display = "none"; // Hide the toast
        // toast.style.left = "-50px"; // Hide the toast
    }, 3000); // Change 2000 to the desired duration in milliseconds
}

function deleteProduct(id) {
    const token = localStorage.token;

    axios.delete(
        `http://localhost:4500/products/${id}`,
        {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "token": token
            },
        }
    )
        .then((res) => {
            if (res && res.data) {
                if (res.data.message === "Product deleted successfully") {
                    
                    // Display success toast
                    showToast("Product deleted successfully!");
                    // products()
                    // Reload the page after deletion
                    setTimeout(() => {
                        window.location.reload();// Hide the toast
                        // toast.style.left = "-50px"; // Hide the toast
                    }, 600); 
                    
                    
                } else if (res.data.message === "Product cannot be deleted as it is added to a cart.") {
                    // Display cart-related toast
                    showToast("Product cannot be deleted because it is in a cart.");
                } else if (res.data.message === "Product not found") {
                    // Display not found toast
                    showToast("Product not found.");
                }
            }
        })
        .catch((error) => {
            // Handle other errors, such as network errors
            console.error('An error occurred:', error);
        });
}


function editProduct(id) {
    const token = localStorage.token;
    const editForm = document.createElement('div');
    editForm.innerHTML = `
        <h2>Edit Product</h2>
        <form id="editProductForm">
            <label for="editName">Name:</label>
            <input type="text" id="editName" name="name">
            <label for="editDescription">Description:</label>
            <textarea id="editDescription" name="description"></textarea>
            <label for="editPrice">Price:</label>
            <input type="number" id="editPrice" name="price">
            <label for="editCategory">Category:</label>
            <input type="text" id="editCategory" name="category">
            <label for="editImage">Image:</label>
            <input type="file" id="editImage" name="image">
            <label for="editNumberOfItems">Number of Items:</label>
            <input type="number" id="editNumberOfItems" name="numberOfItems">
            <button type="submit">Save Changes</button>
        </form>
    `;

    const productDetails = editForm.querySelector('#editProductForm');
    productDetails.addEventListener('submit', (e) => {
        e.preventDefault();

        const editedName = productDetails.querySelector('#editName').value;
        const editedDescription = productDetails.querySelector('#editDescription').value;
        const editedPrice = productDetails.querySelector('#editPrice').value;
        const editedCategory = productDetails.querySelector('#editCategory').value;
        const editedImage = productDetails.querySelector('#editImage').value;
        const editedNumberOfItems = productDetails.querySelector('#editNumberOfItems').value;

        axios.put(
            `http://localhost:4500/products/${id}`,
            {
                name: editedName,
                description: editedDescription,
                price: editedPrice,
                category: editedCategory,
                image: editedImage,
                num_items: editedNumberOfItems
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
            alert("Product updated successfully!");
            products(); // Refresh the product list after update
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


products();
