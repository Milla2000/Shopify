CREATE OR ALTER PROCEDURE deleteProductProc (@id VARCHAR(200))
AS
BEGIN 
    DELETE FROM productsTable  WHERE id=@id
END