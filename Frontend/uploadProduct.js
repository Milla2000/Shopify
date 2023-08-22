const uploadProduct = document.querySelector('#uploadProduct');
const name = document.querySelector('.name');
const description = document.querySelector('.description');
const price = document.querySelector('.price');
const category = document.querySelector('.category');
const num_items = document.querySelector('.num_items');
const image = document.querySelector('.image');
const token = localStorage.token

let profileurl = ''

image.addEventListener('change', (event) => {
    const target = event.target
    const files = target.files
    if(files){
        const formData = new FormData()
        formData.append("file", files[0])
        formData.append("upload_preset","Shoppie")
        formData.append("cloud_name", "dhgs8thzx")

        fetch('https://api.cloudinary.com/v1_1/dhgs8thzx/image/upload', {
            method: 'POST',
            body: formData
        }).then((res)=>res.json()).then(res => profileurl = res.url)
    }
})

uploadProduct.addEventListener('submit', (e) => {
    e.preventDefault();

    let createProduct =
        name.value !== "" &&
        description.value !== "" &&
        price.value !== "" &&
        category.value !== "" &&
        num_items.value !== "" &&
        profileurl !== ""; // Check if the profileurl is not empty

    if (createProduct) {
        axios.post(
            "http://localhost:4500/products",
            {
                name: name.value,
                description: description.value,
                price: price.value,
                category: category.value,
                num_items: num_items.value,
                image: profileurl // Use the Cloudinary URL here
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
            window.location.href = "./adminAllProducts.html";
        });
    }
});
