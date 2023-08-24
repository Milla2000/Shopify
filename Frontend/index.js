function indexProducts() {

    axios
        .get(
            "http://localhost:4500/products",
            {
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                },
            }
        )
        .then((res) => {
            const result = res.data;
            console.log(result);

            const indexProductsBody = document.querySelector('.actual-products');

            result.products.forEach(product => {
                const productContainer = document.createElement('div');
                productContainer.classList.add('product-item');

                productContainer.innerHTML = `
                    <div class="productImage">
                        <img src="${product.image}" alt="" >
                    </div>
                    <p>${product.name}</p>
                    <p>Ksh ${product.price}</p>
                    <img src="./Images/stars.png" alt="" style="height: 3vh; width: 16vh;">
                    <button class="addToCart">
                        <a href="./productInfoNotRegistered.html?id=${product.id}&price=${product.price}&image="${product.image}"&description=${product.description}&name=${product.name}" style="color: #fff;">Add to cart</a>
                    </button>
                `;

                indexProductsBody.appendChild(productContainer); // Append the product container
            });
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
}

indexProducts();
