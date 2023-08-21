const mssql = require("mssql");
const { sqlConfig } = require("../../config/config");

const createUsersTable = async () => {
  try {
    const table = `
        BEGIN 
            TRY
                CREATE TABLE users (
                    id INT PRIMARY KEY IDENTITY,
                    username VARCHAR(50) NOT NULL UNIQUE,
                    email VARCHAR(100) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    role VARCHAR(20) NOT NULL,
                    created_at DATETIME DEFAULT GETDATE(),
                    updated_at DATETIME,
                    cart_id INT,
                    CONSTRAINT FK_UserCart FOREIGN KEY (cart_id) REFERENCES cartsTable(id)
                );
            END TRY
        BEGIN CATCH
            THROW 50002, 'Table already exists', 1;
        END CATCH`;

    const pool = await mssql.connect(sqlConfig);

    await pool.request().query(table, (err) => {
      if (err instanceof mssql.RequestError) {
        console.log(err.message);
      } else {
        console.log("Table created Successfully");
      }
    });
  } catch (error) {
    return { Error: error };
  }
};

const createProductsTable = async () => {
  try {
    const table = `
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
END CATCH;`;

    const pool = await mssql.connect(sqlConfig);

    await pool.request().query(table, (err) => {
      if (err instanceof mssql.RequestError) {
        console.log({ Error: err.message });
      } else {
        console.log("Table created Successfully");
      }
    });
  } catch (error) {
    return { Error: error };
  }
};

const createCartsTable = async () => {
  try {
    const table = `
        BEGIN
        TRY
            CREATE TABLE carts (
                id INT PRIMARY KEY IDENTITY,
                user_id INT NOT NULL,
                created_at DATETIME DEFAULT GETDATE(),
                updated_at DATETIME,
                CONSTRAINT FK_UserCart FOREIGN KEY (user_id) REFERENCES usersTable(id)
            );
        END TRY
        BEGIN CATCH
            THROW 50002, 'Table already exists', 1;
        END CATCH`;

    const pool = await mssql.connect(sqlConfig);

    await pool.request().query(table, (err) => {
      if (err instanceof mssql.RequestError) {
        console.log(err.message);
      } else {
        console.log("Table created Successfully");
      }
    });
  } catch (error) {
    return { Error: error };
  }
};

const createCartItemsTable = async () => {
  try {
    const table = `
        BEGIN
        TRY
            CREATE TABLE cartItemsTable (
                id INT PRIMARY KEY IDENTITY,
                cart_id INT NOT NULL,
                product_id INT NOT NULL,
                quantity INT NOT NULL,
                created_at DATETIME DEFAULT GETDATE(),
                FOREIGN KEY (cart_id) REFERENCES cartsTable(id),
                FOREIGN KEY (product_id) REFERENCES productsTable(id)
            );
        END TRY
        BEGIN CATCH
            THROW 50003, 'Table already exists', 1;
        END CATCH`;

    const pool = await mssql.connect(sqlConfig);

    await pool.request().query(table, (err) => {
      if (err instanceof mssql.RequestError) {
        console.log(err.message);
      } else {
        console.log("Table created Successfully");
      }
    });
  } catch (error) {
    return { Error: error };
  }
};

module.exports = {
  createUsersTable,
  createProductsTable,
  createCartsTable,
  createCartItemsTable,
};
