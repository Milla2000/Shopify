CREATE OR ALTER PROCEDURE deleteProjectProc (@id VARCHAR(200))
AS
BEGIN 
    DELETE FROM productsTable  WHERE id=@id
END