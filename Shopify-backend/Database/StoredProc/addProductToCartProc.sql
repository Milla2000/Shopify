CREATE OR ALTER PROCEDURE addProductToCartProc
    @user_id INT,
    @product_id INT,
    @quantity INT
AS  
BEGIN 
    BEGIN TRANSACTION;

    DECLARE @product_price DECIMAL(10, 2);

    -- Get product price
    SELECT @product_price = price FROM products WHERE id = @product_id;

    -- Decrease num_items in products table
    UPDATE products SET num_items = num_items - @quantity WHERE id = @product_id;

    -- Increase price in cartItemsTable for the added product
    UPDATE cartItemsTable SET quantity = quantity + @quantity WHERE cart_id = @user_id AND product_id = @product_id;

    -- Insert product into cartItemsTable if not already present
    IF @@ROWCOUNT = 0
    BEGIN
        INSERT INTO cartItemsTable (cart_id, product_id, quantity)
        VALUES (@user_id, @product_id, @quantity);
    END;

    -- Update cart's updated_at in cartsTable
    UPDATE cartsTable SET updated_at = GETDATE() WHERE user_id = @user_id;

    COMMIT;
END;
