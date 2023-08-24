CREATE OR ALTER PROCEDURE insertOrderProc
    @user_id VARCHAR(200),
    @product_name VARCHAR(255),
    @total_price DECIMAL(10, 2)
AS
BEGIN
    DECLARE @order_id VARCHAR(200);
    SET @order_id = NEWID(); -- Generate a unique order ID

    INSERT INTO ordersTable (id, user_id, product_name, total_price)
    VALUES (@order_id, @user_id, @product_name, @total_price);
END;
