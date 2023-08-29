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

function myFunction() {
    // Declare variables
    var input, filter, ul, productItems, p, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.querySelector('.actual-products');
    productItems = ul.getElementsByClassName('product-item');

    for (i = 0; i < productItems.length; i++) {
        p = productItems[i].querySelector("p:nth-child(2)"); // Select the second <p> element within .product-item
        txtValue = p.textContent || p.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            productItems[i].classList.add('show');
            productItems[i].classList.remove('hide');
        } else {
            productItems[i].classList.remove('show');
            productItems[i].classList.add('hide');
        }
    }
}
indexProducts();
