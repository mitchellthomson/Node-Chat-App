const express = require("express");
const dotenv = require("dotenv");
const {chats} = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const midWare = require("./middleware/errorMiddleware");
const mongoSanitize = require('express-mongo-sanitize');

const https = require('https');

const userRoute = require("./routes/userRoute");
const chatsRoute = require("./routes/chatsRoute");

dotenv.config();
connectDB();

const app = express();

app.use(mongoSanitize());

app.use(express.json());

app.get('/', (req,res) => {
    res.send("api runs");
});

app.use('/api/user',userRoute);
app.use('/api/chat',chatsRoute);
app.use(midWare.notFound);
app.use(midWare.errorHandler);



const PORT = process.env.PORT || 3000

app.listen(3000,console.log(`Server on PORT ${PORT}`.cyan.bold));

//https.createServer(app).listen(3000, () => {
//
// });