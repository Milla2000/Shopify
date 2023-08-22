const ejs = require("ejs");
const mssql = require("mssql");
const { sendMail } = require("../Helpers/email");
const { sqlConfig } = require("../config/config");
const { v4 } = require("uuid");
// const { json } = require("express");

const ejs = require("ejs");
const mssql = require("mssql");
const { sqlConfig } = require("../config/config");

const resetPasswordController = {
    sendPasswordResetEmail: async (email) => {
        try {
            const pool = await mssql.connect(sqlConfig);

            if (pool.connected) {
                // Generate a unique reset token using UUID
                const resetToken = v4(); // Use UUID library to generate a UUID

                const user = (
                    await pool
                        .request()
                        .input("email", email)
                        .query("SELECT id, full_name FROM usersTable WHERE email = @email")
                ).recordset[0];

                if (!user) {
                    console.log("User not found");
                    return;
                }

                ejs.renderFile(
                    "./Templates/resetPassword.ejs",
                    { resetToken },
                    async (err, html) => {
                        if (err) {
                            console.log("Error rendering email template:", err);
                            return;
                        }

                        const message = {
                            from: process.env.EMAIL_USER,
                            to: email,
                            subject: "Password Reset",
                            html,
                        };

                        try {
                            // Send password reset email
                            await sendMail(message);
                            console.log("Password reset email sent:", message);
                            res.status(200).json({
                                message: 'Password reset initiated. Check your email for instructions.',
                            });
                            // Update user's resetToken and resetTokenExpiry in the database
                            const resetTokenExpiry = new Date(Date.now() + 3600000); // One hour from now
                            await pool
                                .request()
                                .input("id", user.id)
                                .input("resetToken", resetToken)
                                .input("resetTokenExpiry", resetTokenExpiry)
                                .query(
                                    "UPDATE usersTable SET resetToken = @resetToken, resetTokenExpiry = @resetTokenExpiry WHERE id = @id"
                                );
                        } catch (error) {
                            console.log("Error sending email:", error);
                        }
                    }
                );
            } else {
                console.log("Not connected to the database");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    },

    updatePassword: async (req, res) => {
        try {
            const { resetToken, newPassword } = req.body;

            const pool = await mssql.connect(sqlConfig);

            // Update user's password and resetToken related fields in the database
            await pool.request()
                .input("resetToken", resetToken)
                .input("newPassword", newPassword)
                .query(
                    "UPDATE usersTable SET password = @newPassword, resetToken = NULL, resetTokenExpiry = NULL WHERE resetToken = @resetToken"
                );

            // Password reset successful
            res.status(200).json({ message: "Password reset successful" });
        }  catch (error) {
            console.log("Error:", error);
            res.status(500).json({ message: "An error occurred" });
        }
    }
};


module.exports = resetPasswordController;
