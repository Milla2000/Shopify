CREATE OR ALTER PROCEDURE checkoutProc
    @cart_id VARCHAR(200)
AS
BEGIN
    -- Update num_items in productsTable and remove items from cartItemsTable
    BEGIN TRANSACTION;

    -- Update num_items in productsTable
    UPDATE productsTable
    SET num_items = num_items - 1
    FROM productsTable
    INNER JOIN cartItemsTable ON productsTable.id = cartItemsTable.product_id
    WHERE cartItemsTable.cart_id = @cart_id;

    -- Remove items from cartItemsTable
    DELETE FROM cartItemsTable WHERE cart_id = @cart_id;

    COMMIT TRANSACTION;
END;
