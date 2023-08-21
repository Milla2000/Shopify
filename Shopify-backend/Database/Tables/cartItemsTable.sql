CREATE TABLE cartItemsTable (
    id VARCHAR(200) PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255), -- Add product_name column
    price DECIMAL(10, 2) NOT NULL, -- Add price column
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME,
    FOREIGN KEY (cart_id) REFERENCES cartsTable(id),
    FOREIGN KEY (product_id) REFERENCES productsTable(id)
);
