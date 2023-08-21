CREATE OR ALTER PROCEDURE updateUserProc
    @id INT,
    @full_name VARCHAR(50),
    @email VARCHAR(100),
    @phone_number VARCHAR(20),
    @username VARCHAR(50)
AS
BEGIN
    UPDATE usersTable
    SET full_name = @full_name,
        email = @email,
        phone_number = @phone_number,
        username = @username,
        updated_at = GETDATE()
    WHERE id = @id;
END;
