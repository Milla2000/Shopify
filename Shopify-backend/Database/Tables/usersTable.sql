BEGIN TRY
    CREATE TABLE usersTable (
        id VARCHAR(200) PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,   
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'admin', 
        phone_number VARCHAR(20),
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME,
        cart_id INT
    );
END TRY
BEGIN CATCH
    THROW 50001, 'Table already exists!', 1;
END CATCH;

DROP TABLE IF EXISTS usersTable;

-- //insert a user role as admin
INSERT INTO usersTable (id, username, email, password, role, phone_number, created_at, updated_at)
VALUES (
    'a5907d51-f0d0-425e-b601-872d48d53a09', -- Replace with an appropriate ID
    'admin',               -- Replace with the desired username
    'admin2@example.com',      -- Replace with the desired email
    '1234567890',   -- Replace with the hashed password
    'admin',                  -- Role set to 'admin'
    '1234567890',             -- Replace with the desired phone number
    GETDATE(),                -- Current date and time
    GETDATE()                 -- Current date and time
);

SELECT * FROM usersTable;


UPDATE usersTable
SET role = 'admin'
WHERE id = '7e3b7d2b-47cf-4141-a0f2-a1e3a431bb9e';