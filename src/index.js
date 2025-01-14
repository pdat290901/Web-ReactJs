const express = require('express')
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const routes = require('./routes')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
dotenv.config()

const app = express()
const port = process.env.PORT || 3001 
app.use(cors())
// Đặt giới hạn kích thước tối đa cho yêu cầu
app.use(bodyParser.json({ limit: '50mb' })); // Tăng giới hạn lên 10MB
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json())
app.use(cookieParser())
routes(app);


mongoose.connect(`${process.env.MONGO_DB}`).then(()=>{
    console.log('Successfully connected to the Database')
})
.catch((err)=>{
    console.log(err)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

