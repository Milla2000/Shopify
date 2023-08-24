CREATE TABLE ordersTable (
    id VARCHAR(200) PRIMARY KEY,
    user_id VARCHAR(200),
    product_name VARCHAR(255),
    total_price DECIMAL(10, 2),
    order_date DATETIME DEFAULT GETDATE() -- assuming SQL Server for the default date
);


SELECT * FROM ordersTable;
