CREATE OR ALTER PROCEDURE calculateCartTotalPriceProc
    @cart_id VARCHAR(200),
    @total_price DECIMAL(10, 2) OUTPUT
AS
BEGIN
    -- Calculate total price for the user's cart
    SELECT @total_price = SUM(price)
    FROM cartItemsTable
    WHERE cart_id = @cart_id;
END;

