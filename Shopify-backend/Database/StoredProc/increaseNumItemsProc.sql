CREATE OR ALTER PROCEDURE removeProductFromCartProc
    @user_id VARCHAR(200),
    @product_id VARCHAR(200)
AS
BEGIN
    -- Delete one instance of the product from the user's cart
    DELETE TOP (1) FROM cartItemsTable
    WHERE cart_id IN (SELECT id FROM cartsTable WHERE user_id = @user_id)
    AND product_id = @product_id;
END;