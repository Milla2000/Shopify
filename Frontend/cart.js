function cart(){
    const id = localStorage.id
    const token = localStorage.token


    axios
        .get(
            `http://localhost:4500/cart/cart-items`,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "token": token
                },
            }
        )
}