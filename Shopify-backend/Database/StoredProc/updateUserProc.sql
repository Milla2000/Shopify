CREATE OR ALTER PROCEDURE updateProductProc (
    @id VARCHAR(200), -- Change to VARCHAR(200)
    @name VARCHAR(255),
    @description TEXT,
    @price DECIMAL(10, 2),
    @category VARCHAR(100),
    @image VARCHAR(255),
    @num_items INT,
    @updated_at DATETIME
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
        updated_at = @updated_at
    WHERE id = @id;
END;
