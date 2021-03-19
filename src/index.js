const express = require("express");
const routes = require("./routes/index");
const cors = require("cors");
const http = require("http");
const morgan = require('morgan')

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
//Maybe rate limit from codegarden video for follows atleast

app.use(routes);

server.listen(5000, () => {
    console.log(`Listening on port 5000`)
})

module.exports = app;