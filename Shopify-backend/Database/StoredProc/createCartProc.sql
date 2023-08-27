CREATE OR ALTER PROCEDURE createCartProc
    @user_id VARCHAR(200),
    @cart_id VARCHAR OUTPUT -- Use INT for an IDENTITY column
AS
BEGIN
    -- Create a new cart record for the user
    INSERT INTO cartsTable (id, user_id)
    VALUES (@cart_id,  @user_id);

    -- Get the id of the newly created cart
    SET @cart_id = SCOPE_IDENTITY();
END;

