<<<<<<< HEAD
const { Router } = require('express');
const resetPasswordController = require('../EmailService/resetPwdUser');
const resetPwd = Router()

// Route to display the password reset form

resetPwd.post("/resetPassword", resetPasswordController.sendPasswordResetEmail);



// Route to handle the password reset form submission
resetPwd.post("/updatePassword", resetPasswordController.updatePassword);


module.exports = {
    resetPwd
}
=======
const { Router } = require('express');
const resetPasswordController = require('../EmailService/resetPwdUser');
const resetPwd = Router()

// Route to display the password reset form

resetPwd.post("/resetPassword", resetPasswordController.sendPasswordResetEmail);



// Route to handle the password reset form submission
resetPwd.post("/updatePassword", resetPasswordController.updatePassword);


module.exports = {
    resetPwd
}
>>>>>>> d5675689c1d263c0192ec993e04daadc75c6980a
