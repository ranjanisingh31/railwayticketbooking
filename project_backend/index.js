const express = require("express");
const cors = require("cors");
const body = require("body-parser");
const connectDB = require('./service/database.js');
const app = express();
const api = require("./routes/api.js");
app.use(cors());
app.use(body.json());
app.use("/api", api);


connectDB();
const PORT = 3000;
let server = app.listen(PORT, function () {
    console.log(`server running on port ${PORT}`);

});

const io = require('socket.io')(server);
const socketModule = require('./socket/socket-io')(io);


