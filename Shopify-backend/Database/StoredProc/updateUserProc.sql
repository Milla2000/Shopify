CREATE OR ALTER PROCEDURE updateUserProc (
    @id VARCHAR(200),
    @username VARCHAR(50),
    @email VARCHAR(100),
    @phone_number INT
)
AS
BEGIN
    BEGIN TRY
        -- Update user details
        UPDATE usersTable
        SET
            username = @username,
            email = @email,
            phone_number = @phone_number,
            updated_at = GETDATE()
        WHERE id = @id;
    END TRY
    BEGIN CATCH
        THROW;
    END CATCH;
END;
