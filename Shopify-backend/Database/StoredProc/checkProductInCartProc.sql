CREATE OR ALTER PROCEDURE checkProductInCartProc
    @product_id VARCHAR(200)
AS
BEGIN
    SELECT TOP 1 id FROM cartItemsTable WHERE product_id = @product_id;
END;
