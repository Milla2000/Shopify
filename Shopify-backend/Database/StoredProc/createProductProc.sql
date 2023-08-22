CREATE OR ALTER PROCEDURE createProductProc
    @id VARCHAR(200),
    @name VARCHAR(255),
    @description TEXT,
    @price DECIMAL(10, 2),
    @category VARCHAR(100),
    @image VARCHAR(255),
    @num_items INT
    
AS
BEGIN
    INSERT INTO productsTable (id, name, description, price, category, image, num_items, created_at)
    VALUES (@id, @name, @description, @price, @category, @image, @num_items, GETDATE());
END;



SELECT * FROM products
