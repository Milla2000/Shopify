CREATE OR ALTER PROCEDURE createProductProc
    @id VARCHAR(200),
    @name VARCHAR(255),
    @description TEXT,
    @price DECIMAL(10, 2),
    @category VARCHAR(100),
    @image VARCHAR(255),
    @num_items INT,
    @created_at DATETIME,
    @updated_at DATETIME
AS
BEGIN
    INSERT INTO products (id, name, description, price, category, image, num_items, created_at, updated_at)
    VALUES (@id, @name, @description, @price, @category, @image, @num_items, @created_at, @updated_at);
END;


SELECT * FROM products
