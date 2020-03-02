const express = require('express');
var io = require('socket.io')
({
    path:'/ghostcord'
})

const app = express();
const port = 8080;

//app.get('/', (req, res) => res.send('Hello World'))
app.use(express.static('/Users/matthewszeto/ghostcord/build'))
app.get('/', (req, res, next) => {
    res.sendFile('/Users/matthewszeto/ghostcord/build/index.html')
})

const server = app.listen(port, () => console.log('Example app listening on port 8080!'));


