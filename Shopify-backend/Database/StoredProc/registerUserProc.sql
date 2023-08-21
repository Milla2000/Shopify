CREATE OR ALTER PROCEDURE registerUserProc
    @id VARCHAR(200),
    @username VARCHAR(50),
    @email VARCHAR(100),
    @password VARCHAR(255),
    @phone_number VARCHAR(20)
AS
BEGIN
    INSERT INTO usersTable (id, username, email, password, phone_number)
    VALUES (@id, @username, @email, @password, @phone_number);
END;




SELECT * FROM usersTable;


-- create superuser




-- DELETE FROM usersTable
-- WHERE id = 'ed53d1f3-5242-420b-bf42-023046a1d8a9';


SELECT * FROM usersTable;