const uploadProduct = document.querySelector('#uploadProduct');
const name = document.querySelector('.name');
const description = document.querySelector('.description');
const price = document.querySelector('.price');
const category = document.querySelector('.category');
const num_items = document.querySelector('.num_items');
const image = document.querySelector('.image');
const token = localStorage.token

uploadProduct.addEventListener('submit', (e) => {
    e.preventDefault();

    let createProduct =
        name.value !== "" &&
        description.value !== "" &&
        price.value !== "" &&
        category.value !== "" &&
        num_items.value !== "" &&
        image.value !== "";

    if (createProduct) {
        axios.post(
            "http://localhost:4500/products",
            {
                name: name.value,
                description: description.value,
                price: price.value,
                category: category.value,
                num_items:num_items.value,
                image: image.value
            },
            {
              headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "token": token
            }            
            }
        ).then((res) => {
            console.log(res.data);
        });
    }
});
