function yourProducts() {
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

            const yourProductsBody = document.querySelector('.actual-products'); // Select the container div

            result.products.forEach(product => {
                const productContainer = document.createElement('div'); 
                productContainer.classList.add('product-item'); 
                
                productContainer.innerHTML = `
                    <div class="productImage">
                        <img src="${product.image}" alt="" style="height: 20vh; width: 30vh;">
                    </div>
                    <p>${product.name}</p>
                    <p>Ksh ${product.price}</p>
                    <img src="./Images/stars.png" alt="" style="height: 3vh; width: 16vh;">
                    <button class="addToCart">
                        <a href="./productInfo.html?id=${product.id}&price=${product.price}&image="${product.image}"&description=${encodeURIComponent(product.description)}&name=${encodeURIComponent(product.name)}" style="color: #fff;">Add to cart</a>
                    </button>

                `;

                yourProductsBody.appendChild(productContainer); // Append the product container
            });
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
}

yourProducts();
