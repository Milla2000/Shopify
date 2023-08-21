CREATE OR ALTER PROCEDURE addProductToCartAndCalculateTotalProc
    @user_id INT,
    @product_id INT,
    @product_name VARCHAR(255),
    @price DECIMAL(10, 2)
AS
BEGIN
    -- Add the product to the cartItemsTable
    INSERT INTO cartItemsTable (cart_id, product_id, product_name, price)
    VALUES (@user_id, @product_id, @product_name, @price);

    -- Update the num_items in productsTable
    UPDATE productsTable SET num_items = num_items - 1 WHERE id = @product_id;

    -- Calculate total price for the user's cart
    SELECT SUM(price) AS total_price FROM cartItemsTable WHERE cart_id = @user_id;
END;
