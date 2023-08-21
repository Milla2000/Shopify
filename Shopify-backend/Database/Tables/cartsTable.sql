CREATE TABLE cartsTable (
    id VARCHAR(200) PRIMARY KEY,
    user_id INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME,
    CONSTRAINT FK_UserCart FOREIGN KEY (user_id) REFERENCES usersTableusers(id)
);
