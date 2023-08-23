function cart() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const token = localStorage.token;

    console.log('Fetching cart information for ID:', id);

    axios
        .post(
            `http://localhost:4500/cart/add-to-cart`,
            {},
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

            // Display success alert
            alert("Product added to cart successfully!");

            const tableBody = document.querySelector('.cart-table'); // Select the table body element

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
                    if (confirm('Are you sure you want to delete this product?')) {
                        deleteProduct(id);
                    }
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

cart();
