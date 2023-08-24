CREATE OR ALTER PROCEDURE removeCartItemsProc
    @cart_id VARCHAR(200)
AS
BEGIN
    -- Delete cart items associated with the cart
    DELETE FROM cartItemsTable
    WHERE cart_id = @cart_id;
END;
