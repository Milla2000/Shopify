const token = localStorage.token;
const user_id = localStorage.id;

const addToCart = async (product_id) => {
    const response = await fetch("http://localhost:4500/cart/add-to-cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "token": token
        },
        body: JSON.stringify({user_id, product_id})
    });

    const data = await response.json();
    if (response.ok) {
        alert("Product added to cart successfully");
    } else {
        alert(data.error);
    }
};


const yourProducts = () => {
    axios.get("http://localhost:4500/products", {
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "token": token
        },
    })
        .then((res) => {
            const result = res.data;
            console.log(result);

            const yourProductsBody = document.getElementById('actual-products');

            result.products.forEach(product => {
                const productContainer = document.createElement('div');
                productContainer.classList.add('product-item');

                productContainer.innerHTML = `
                <div class="productImage">
                    <img src="${product.image}" alt="">
                </div>
                <p>${product.name}</p>
                <p>Ksh ${product.price}</p>
                <img src="./Images/stars.png" alt="" style="height: 3vh; width: 16vh;">
                 
                <button class="addToCart" data-product-id="${product.id}" style="color: #fff;">Add to cart</button>
            `;

                productContainer.querySelector('.addToCart').addEventListener("click", () => {
                    addToCart(product.id);
                });

                yourProductsBody.appendChild(productContainer);
            });
        })
        .catch((error) => {
            console.error('An error occurred:', error);
        });
};

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


document.addEventListener("DOMContentLoaded", () => {
    yourProducts();
});
