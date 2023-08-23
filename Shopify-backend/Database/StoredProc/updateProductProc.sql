CREATE OR ALTER PROCEDURE updateProductProc (
    @id VARCHAR(255),
    @name VARCHAR(255),
    @description TEXT,
    @price DECIMAL(10, 2),
    @category VARCHAR(100),
    @image VARCHAR(255),
    @num_items INT
    
)
AS
BEGIN
    UPDATE productsTable
    SET name = @name,
        description = @description,
        price = @price,
        category = @category,
        image = @image,
        num_items = @num_items,
        updated_at = GETDATE()
    WHERE id = @id;
END;
