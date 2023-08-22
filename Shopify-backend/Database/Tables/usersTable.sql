BEGIN TRY
    CREATE TABLE usersTable (
        id VARCHAR(200) PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,   
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'user', 
        phone_number VARCHAR(20),
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME,
        cart_id INT,
        resetToken VARCHAR(200), -- Add this column for reset tokens
        resetTokenExpiry DATETIME -- Add this column for reset token expiry
    );
END TRY
BEGIN CATCH
    THROW 50001, 'Table already exists!', 1;
END CATCH;


DROP TABLE IF EXISTS usersTable;

-- //insert a user role as admin
INSERT INTO usersTable (id, username, email, password, role, phone_number, created_at, updated_at)
VALUES (
    'a5907d51-f0d0-425e-b601-872d48d53a04', -- Replace with an appropriate ID
    'newadmin',               -- Replace with the desired username
    'admin@example.com',      -- Replace with the desired email
    '$2b$05$DNz6bbB/yYFGmvGNSTxpKubDgqjGhR5/x.mGIn/f91D/ccARc8mt6',   -- Replace with the hashed password
    'admin',                  -- Role set to 'admin'
    '1234567890',             -- Replace with the desired phone number
    GETDATE(),                -- Current date and time
    GETDATE()                 -- Current date and time
);

-- SELECT * FROM usersTable;
