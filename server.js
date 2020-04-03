require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

var io = require('socket.io')
({
    path:'/webrtc'
})

const app = express();
const port =  8080;
const whiteboardPort = process.env.PORT || 4000;

// whiteboard feature using pusher
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: 'us3',
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
  
  app.post('/paint', (req, res) => {
      console.log(req.body);
      pusher.trigger('painting', 'draw', req.body);
      res.json(req.body);
    });
  
  app.listen(whiteboardPort, () => {
    console.log(`Whiteboard Server started on port ${whiteboardPort}`);
  });
  // end of whiteboard feature

app.get('/', (req, res) => res.send('Hello World'))
app.use(express.static('/Users/matthewszeto/ghostcord/build'))

app.get('/', (req, res, next) => {
    res.sendFile('/Users/matthewszeto/ghostcord/build/index.html')
})

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

io.listen(server);

const peers = io.of('/webrtcPeer')

let connectedPeers = new Map();

peers.on('connection', socket => {
    console.log(socket.id);
    socket.emit('connection-success', { success: socket.id });

    connectedPeers.set(socket.id, socket);

    socket.on('disconnect', () => {
        console.log('disconnected');
        connectedPeers.delete(socket.id);
    });

    socket.on('offerOrAnswer', (data) => {
        for (const [socketID, socket] of connectedPeers.entries()) {
            if (socketID != data.socketID) {
                console.log(socketID, data.payload.type);
                socket.emit('offerOrAnswer', data.payload);
            }
        }
    });

    socket.on('candidate', (data) => {
        for (const [socketID, socket] of connectedPeers.entries()) {
            if (socketID != data.socketID) {
                console.log(socketID, data.payload.type);
                socket.emit('candidate', data.payload);
            }
        }
    });

})