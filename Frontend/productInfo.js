function productInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const token = localStorage.token;

    // Fetch product information
    axios
        .get(
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
            const product = res.data.product;

            const productInfoContainer = document.querySelector('.productInfo');
            const productContainer = document.createElement('div');

            productContainer.innerHTML = `
                <div class="productInfoImage">
                    <img src="${product.image ? product.image : 'default-image-url'}" alt="Product Info" style="height: 65%; width: 50%;">
                </div>
                <div class="productDescription">
                    <h3>${product.name}</h3>
                    <p>${product.description ? product.description : 'No description available.'}</p>
                    <h3>Ksh: ${product.price ? product.price : 'Price not available.'}</h3>
                    <button class="addToCart" data-product='{"id": "${product.id}", "price": "${product.price}", "image": "${product.image}", "description": "${product.description}", "name": "${product.name}"}'>Add to cart</button>          
                </div>
            `;

            productInfoContainer.appendChild(productContainer);

            // Get all the "Add to cart" buttons on the page
            const addToCartButtons = document.querySelectorAll('.addToCart');

            // Add an event listener to each "Add to cart" button
            addToCartButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();

                    // Get the product information from the button's data attribute
                    const productInfo = JSON.parse(button.getAttribute('data-product'));

                    // Create the data object for adding the product to the cart
                    const data = {
                        user_id: localStorage.getItem('user_id'), // User ID
                        product_id: productInfo.id
                    };

                    // Send a POST request to add the product to the cart
                    axios.post('http://localhost:4500/cart/add-to-cart', data, {
                        headers: {
                            'Content-Type': 'application/json',
                            'token': token
                        }
                    })
                    .then(response => {
                        // Display a success message
                        alert('Product added to cart successfully!');
                    })
                    .catch(error => {
                        console.error('Error adding product to cart:', error);
                    });
                });
            });
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
}

productInfo();
