BEGIN TRY
    CREATE TABLE usersTable (
        id INT PRIMARY KEY IDENTITY,
        full_name VARCHAR(50) NOT NULL UNIQUE, 
        email VARCHAR(100) NOT NULL UNIQUE,   
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'user', 
        phone_number VARCHAR(20),
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME,
        cart_id INT
    );
END TRY
BEGIN CATCH
    THROW 50001, 'Table already exists!', 1;
END CATCH;
