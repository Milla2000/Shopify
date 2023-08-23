CREATE OR ALTER PROCEDURE createCartProc
@user_id VARCHAR(200)
AS
BEGIN
    -- Create a new cart record for the user
    INSERT INTO cartsTable (user_id)
    VALUES (@user_id);

    -- Get the id of the newly created cart
    SELECT id FROM cartsTable WHERE user_id = @user_id;
END;