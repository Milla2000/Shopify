<<<<<<< HEAD
CREATE OR ALTER PROCEDURE fetchCartItemsProc
    @user_id VARCHAR(200)
AS
BEGIN
    SELECT c.id AS cart_item_id, c.cart_id, c.product_id, p.name AS product_name, c.price, c.created_at, c.updated_at
    FROM cartItemsTable c
    INNER JOIN productsTable p ON c.product_id = p.id
    WHERE c.cart_id IN (
        SELECT id FROM cartsTable WHERE user_id = @user_id
    )
END;

=======
CREATE OR ALTER PROCEDURE fetchCartItemsProc
    @user_id VARCHAR(200)
AS
BEGIN
    SELECT c.id AS cart_item_id, c.cart_id, c.product_id, p.name AS product_name, c.price, c.created_at, c.updated_at
    FROM cartItemsTable c
    INNER JOIN productsTable p ON c.product_id = p.id
    WHERE c.cart_id IN (
        SELECT id FROM cartsTable WHERE user_id = @user_id
    )
END;

>>>>>>> d5675689c1d263c0192ec993e04daadc75c6980a
