<<<<<<< HEAD
CREATE OR ALTER PROCEDURE deleteUserProc
    @id VARCHAR(200)
AS
BEGIN
    DELETE FROM usersTable
    WHERE id = @id;
=======
CREATE OR ALTER PROCEDURE deleteUserProc
    @id VARCHAR(200)
AS
BEGIN
    DELETE FROM usersTable
    WHERE id = @id;
>>>>>>> d5675689c1d263c0192ec993e04daadc75c6980a
END;