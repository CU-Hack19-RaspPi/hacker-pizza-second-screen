const express = require('express');
const app = express();
const https = require('https');
const fs = require("fs");
const path = require('path');
const router = express.Router();

const server = https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(process.env.port || 443);

const io = require('socket.io')(server);

server.listen(443);

router.get("/", (req, res) =>
{
  console.log('req query:', req.query)
  if (req.query.attr) {
    // console.log(req.query.attr)
    io.emit('userAttr', JSON.stringify(req.query.attr))
  }
	res.sendFile(path.join(__dirname + '/html/example.html'));
})

app.use('/', express.static(path.join(__dirname, 'html')))
app.use("/lib", express.static(__dirname + '/lib'));

app.use('/', router);

console.log("running on Port 443");
console.log("https://ottawa.recipes");
