const token = localStorage.token;
const userId = localStorage.id;


function cart() {
    fetch(`http://localhost:4500/cart/cart-items/${userId}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "token": token
        }
    })
        .then(response => response.json())
        .then(data => {
            const cartTableBody = document.getElementById("cart-table-body");
            const totalPriceDisplay = document.getElementById("total-price");
            let totalPrice = 0;

            // Clear existing table rows
            cartTableBody.innerHTML = "";

            // Populate the table with cart items
            data.cartItems.forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${item.product_name}</td>
                <td>Ksh ${item.price}</td>
                <td>
                    <button class="remove-from-cart" data-product-id="${item.product_id}">Remove from Cart</button>
                </td>
            `;
                cartTableBody.appendChild(row);

                const removeButton = row.querySelector(".remove-from-cart");
                removeButton.addEventListener("click", () => {
                    removeFromCart(item.product_id);
                });
                totalPrice += item.price;
            });
            totalPriceDisplay.textContent = `Total Price: Ksh ${totalPrice.toFixed(2)}`;

            // Check if there are cart items
            const cartItems = data.cartItems;
            if (cartItems.length > 0) {
                showCheckoutButton();
            } else {
                hideCheckoutButton();
            }
        })
        .catch(error => {
            console.error("Error fetching cart items:", error);
        });
}


function showToast(message) {
    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toast-text");
    toast.style.display = "block";
    toastText.textContent = message;
    toast.style.right = "20px"; // Show the toast

    setTimeout(() => {
        toast.style.display = "none"; // Hide the toast
        // toast.style.left = "-250px"; // Hide the toast
    }, 1000); // Change 2000 to the desired duration in milliseconds
}


// Function to remove product from cart
async function removeFromCart(product_id) {

    const response = await fetch("http://localhost:4500/cart/removeFromCart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "token": token
        },
        body: JSON.stringify({ user_id: userId, product_id: product_id })

    });

    const data = await response.json();
    if (response.ok) {
        showToast("Removed from cart");
        cart(); // Refresh the cart after removal
    } else {
        alert(data.error);
    }
}

// Call the cart function when the page loads
cart();
