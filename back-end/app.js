const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const errorhandler = require('errorhandler');
const helmet = require('helmet');
const app = express();
const dbService = require('./service/db');


const rootRouter = require('./router/index');

// app.use(cors({
//     origin: "*",
// }));

app.use(express.json());
const corsOptions = {
    origin: '*',
    credentials: true,
}
app.use(cors(corsOptions))

// app.use(helmet());
app.use(morgan("dev"));
app.use(errorhandler());
app.use(express.json({ urlEncoded: true }));
app.use("/statics", express.static("statics"));


dbService.connect(process.env.DB_URL);

app.use("/api", rootRouter)

module.exports = app;