function productInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const token = localStorage.token;

    console.log('Fetching product information for ID:', id);

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

            console.log('Retrieved product data:', product);

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
                    <button class="button">Add to cart</button>
                </div>
            `;

            productInfoContainer.appendChild(productContainer);
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
}

productInfo();
