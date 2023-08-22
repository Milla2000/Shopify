const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

// const { welcomeAboard } = require('./EmailService/newUser');
// const cron = require('node-cron');
const { shopifyRouter } = require('./routes/productRoutes');
const { cartRouter } = require('./routes/cartRoutes');
const { usersRouter } = require('./routes/usersRouter');
const { resetPwd } = require('./routes/resetPwdRoute');
// const { welcomeAboard } = require('./EmailService/newUser');
// const resetPasswordController = require('./EmailService/resetPwdUser');




const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/cart', cartRouter)
app.use('/users', usersRouter)
app.use('/products', shopifyRouter)
app.use('/reset', resetPwd)


app.use((err, req, res, next) => {
  res.json({ Error: err })
})



//node-mailer cron job here
// cron.schedule("*/900 * * * * *", async () => {
//   //runs every 5 seconds

//   console.log("running a task every 5 seconds");
//   await resetPasswordController();
//   console.log("called welcomeAboard");
// });


app.listen(4500, () => {
  console.log('server running on port 4500')
})