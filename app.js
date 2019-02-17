const express = require('express');
const app = express();
const http = require('http');
const fs = require("fs");
const path = require('path');
const router = express.Router();

const ROOT_DIR = 'html'
// const ecStatic = require('ecstatic')
const PORT = process.env.PORT || 8080
const server = http.createServer(app)
const io = require('socket.io')(server);
server.listen(PORT);

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

app.use('/', router);

console.log("running on Port 8080");
console.log(`http://localhost:8080/`)
