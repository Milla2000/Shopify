CREATE OR ALTER PROCEDURE softDeleteUserProc
    @id VARCHAR(200)
AS
BEGIN
    -- Soft delete user by updating the deleted_at timestamp
    UPDATE usersTable
    SET email = 'deleted', deleted_at = GETDATE()
    WHERE id = @id;
END;