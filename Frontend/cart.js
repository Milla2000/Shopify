const checkoutButton = document.getElementById("checkout-button");
const cartTableBody = document.getElementById("cart-table-body");
const totalPriceDisplay = document.getElementById("total-price");
const toast = document.getElementById("toast");
const toastText = document.getElementById("toast-text");



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

// Function to show the checkout button
function showCheckoutButton() {
    const checkoutButton = document.getElementById("checkout-button");
    checkoutButton.style.display = "block";
}

// Function to hide the checkout button
function hideCheckoutButton() {
    const checkoutButton = document.getElementById("checkout-button");
    checkoutButton.style.display = "none";
}


function showToast(message) {
    
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


checkoutButton.addEventListener("click", async () => {
    try {
        const cartTotalPrice = parseFloat(document.getElementById("total-price").textContent.split(" ")[3]); // Extract total price from the displayed text

        const confirmationMessage = `
            You are about to pay Ksh ${cartTotalPrice.toFixed(2)} to Shoppie.
            Do you want to proceed?
        `;

        const modal = document.createElement("div");
        modal.className = "confirmation-modal";
        modal.innerHTML = `
            <div class="modal-content">
                <img src="./Images/logo.png" alt="logo">
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

        confirmButton.addEventListener("click", async () => {
            try {
                document.body.removeChild(modal);
                const checkoutResponse = await fetch("http://localhost:4500/cart/checkout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "token": token
                    },
                    body: JSON.stringify({ user_id: userId })
                });

                const checkoutData = await checkoutResponse.json();
                cart();

                if (checkoutResponse.ok) {
                    showToast("Payment successful");
                    window.location.href = './yourProducts.html';
                } else {
                    alert(checkoutData.error);
                }
            } catch (error) {
                console.error("Error during checkout:", error);
                alert("An error occurred during checkout.");
            }
        });

        document.body.appendChild(modal);
    } catch (error) {
        console.error("Error preparing confirmation:", error);
        alert("An error occurred while preparing confirmation.");
    }
});




// Call the cart function when the page loads
cart();
