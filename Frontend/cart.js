// cart.js

function cart() {
    const token = localStorage.token;
    const userId = localStorage.id;

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
            const cartTable = document.getElementById("cart-table");

            // Clear existing table rows
            cartTable.innerHTML = "";

            // Populate the table with cart items
            data.cartItems.forEach(item => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${item.product_name}</td>
                <td>Ksh ${item.price}</td>
            `;
                cartTable.appendChild(row);
            });
        })
        .catch(error => {
            console.error("Error fetching cart items:", error);
        });
}

// Call the cart function when the page loads
cart();
