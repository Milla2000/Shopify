CREATE PROCEDURE viewCartItemsForAdminProc
AS
BEGIN
    SELECT
        u.username,
        p.name AS product_name,
        ci.price AS product_price
    FROM
        usersTable u
    JOIN
        cartsTable c ON u.id = c.user_id
    JOIN
        cartItemsTable ci ON c.id = ci.cart_id
    JOIN
        productsTable p ON ci.product_id = p.id;
END;

