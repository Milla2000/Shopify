<<<<<<< HEAD
 CREATE TABLE cartsTable (
    id VARCHAR(200) PRIMARY KEY,
    user_id VARCHAR(200) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME,
    CONSTRAINT FK_UserCart FOREIGN KEY (user_id) REFERENCES usersTable(id)
);

SELECT * FROM cartsTable;

=======
 CREATE TABLE cartsTable (
    id VARCHAR(200) PRIMARY KEY,
    user_id VARCHAR(200) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME,
    CONSTRAINT FK_UserCart FOREIGN KEY (user_id) REFERENCES usersTable(id)
);

SELECT * FROM cartsTable;

>>>>>>> d5675689c1d263c0192ec993e04daadc75c6980a
DROP TABLE IF EXISTS cartsTable;