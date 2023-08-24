CREATE OR ALTER PROCEDURE updateNumItemsProc
    @product_id VARCHAR(200)
AS
BEGIN
    -- Update num_items in productsTable
    UPDATE productsTable
    SET num_items = num_items - 1
    WHERE id = @product_id;
END;
