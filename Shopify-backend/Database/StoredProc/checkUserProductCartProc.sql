CREATE OR ALTER PROCEDURE checkUserProductCartProc
    @user_id VARCHAR(200),
    @product_id VARCHAR(200)
AS
BEGIN
    -- Check if the user exists
    DECLARE @userExists BIT = 0;
    SELECT @userExists = CASE WHEN EXISTS (SELECT id FROM usersTable WHERE id = @user_id) THEN 1 ELSE 0 END;

    -- Check if the product exists
    DECLARE @productExists BIT = 0;
    SELECT @productExists = CASE WHEN EXISTS (SELECT id FROM productsTable WHERE id = @product_id) THEN 1 ELSE 0 END;

    -- Check if a cart exists for the user
    DECLARE @cartExists BIT = 0;
    SELECT @cartExists = CASE WHEN EXISTS (SELECT id FROM cartsTable WHERE user_id = @user_id) THEN 1 ELSE 0 END;

    SELECT @userExists AS userExists, @productExists AS productExists, @cartExists AS cartExists;
END;

DROP PROCEDURE IF EXISTS checkUserProductCartProc;
