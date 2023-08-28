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

            if (result && Array.isArray(result.cartItems)) {
                result.cartItems.forEach(cartItem => {

                    const newRow = document.createElement('tr');
                    newRow.innerHTML = `
                        <td>${cartItem.username}</td>
                        <td>${cartItem.product_name}</td>
                        <td>${cartItem.product_price}</td>
                        <td>
                            <div class="actions">
                                <button class="button remove-button" data-id="${cartItem.id}" style="background-color: rgba(203, 34, 34, 1);">Remove</button>
                            </div>
                        </td>
                    `;

                    tableBody.appendChild(newRow); // Append the new row to the table body
                });
            } else {
                console.error('Invalid response format or cartItems is not an array');
            }

            // Add event listener to remove buttons
            tableBody.addEventListener('click', (event) => {
                function removeCartItem(cartItemId) {
                    axios.delete(`http://localhost:4500/users/removecartitem/${cartItemId}`, {
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json",
                            "token": token
                        }
                    })
                        .then((res) => {
                            console.log("Cart item removed:", res.data);
                            alert("Cart item removed successfully!");
                            // Refresh the cart items after removal
                            cartItems();
                        })
                        .catch((error) => {
                            console.error('An error occurred:', error);
                        });
                }

                if (event.target.classList.contains('remove-button')) {
                    const cartItemId = event.target.getAttribute('data-id');
                    if (confirm('Are you sure you want to remove this item from the cart?')) {
                        removeCartItem(cartItemId);
                    }
                }
            });
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
}

// Call the function to fetch and display cart items
cartItems();
