
BEGIN TRY
    CREATE TABLE productsTable (
        id VARCHAR(200) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(100),
        image VARCHAR(255),
        num_items INT NOT NULL DEFAULT 0, 
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME
    );
END TRY
BEGIN CATCH
    THROW 50001, 'Table already exists!', 1;
END CATCH;

DROP TABLE IF EXISTS productsTable;
