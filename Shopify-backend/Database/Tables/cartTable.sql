CREATE TABLE cartsTable (
    id INT PRIMARY KEY IDENTITY,
    user_id INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME,
    CONSTRAINT FK_UserCart FOREIGN KEY (user_id) REFERENCES users(id)
);
