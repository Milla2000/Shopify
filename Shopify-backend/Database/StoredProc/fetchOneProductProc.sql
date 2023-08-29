CREATE OR ALTER PROCEDURE fetchOneProductProc (@id VARCHAR(200))
AS  
    BEGIN 
        SELECT * FROM productsTable  WHERE id = @id
    END