// server.js
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const path = require('path');
const NodeCache = require('node-cache');

const app = express();
const PORT = process.env.PORT || 3030;
const cache = new NodeCache();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const pusher = new Pusher({
    appId: '1754635',
    key: '401f1d0958cb4236a24d',
    secret: '60cb5966ae7087964d23',
    cluster: 'mt1',
    useTLS: true
});

app.post('/pusher/trigger/:eventName', (req, res) => {
    const { value, distance } = req.body;
    const { eventName } = req.params;
    
    pusher.trigger('stopwatch-channel'+distance, eventName, {
        value
    });

    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});