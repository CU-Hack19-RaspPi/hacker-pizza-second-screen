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

const orderData = {
  "food": ["Pizza", "Salad", "Starter"],
  "size": ["Small", "Standard", "Large"]
}

function attrQuery(attr) {
  let tempStr = "<h1>"
  tempStr += orderData.size[attr[1]-1] + ' '
  tempStr += orderData.food[attr[0]-1]
  return tempStr + "</h1>"
}

router.get("/", (req, res) =>
{
  console.log('req query:', req.query)
  if (req.query.attr) {
    io.emit('userAttr', JSON.stringify({"data": attrQuery(req.query.attr)}))
  }
	res.sendFile(path.join(__dirname + '/html/example.html'));
})

app.use('/', express.static(path.join(__dirname, 'html')))
app.use("/lib", express.static(__dirname + '/lib'));

app.use('/', router);

console.log("running on Port 443");
console.log("https://ottawa.recipes");
