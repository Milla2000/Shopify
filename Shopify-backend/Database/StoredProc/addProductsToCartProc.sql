CREATE OR ALTER PROCEDURE addProductsToCartProc
    @id VARCHAR(200),
    @cart_id VARCHAR(200),
    @product_id VARCHAR(200),
    @product_name VARCHAR(255),
    @price DECIMAL(10, 2)
AS
BEGIN
    -- Add the product to the cartItemsTable
    INSERT INTO cartItemsTable (id, cart_id, product_id, product_name, price)
    VALUES (@id, @cart_id, @product_id, @product_name, @price);

    -- Update the num_items in productsTable
    UPDATE productsTable SET num_items = num_items - 1 WHERE id = @product_id;

    -- Calculate total price for the user's cart
    SELECT SUM(price) AS total_price FROM cartItemsTable WHERE cart_id = @cart_id;
END;


