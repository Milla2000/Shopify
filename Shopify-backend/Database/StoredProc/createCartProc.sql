CREATE OR ALTER PROCEDURE createCartProc
    @user_id VARCHAR(200),
    @cart_id VARCHAR(200) OUTPUT
AS
BEGIN
    -- Create a new cart record for the user
    INSERT INTO cartsTable (id, user_id)
    VALUES (@cart_id, @user_id);

    SET @cart_id = @cart_id; -- Assign the cart_id directly to the output parameter
END;
