const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chatKit = require('pusher-chatkit-server');

const app = express();

const chatkit = new chatKit.default({
    instanceLocator: 'INSTANCE',
    key: 'KEY'
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/users', (req, res) => {
    const { username } = req.body;

    console.log(req.body);

    chatkit
        .createUser({
            name: username,
            id: username
        })
        .then(() => res.sendStatus(201))
        .catch(error => {
            if (error.error === 'services/chatkit/user_already_exists') {
                res.sendStatus(200);
            } else {
                console.log(error);
            }
        })
})

app.post('/auth', (req, res) => {
    const authData = chatkit.authenticate({
        userId: req.query.user_id
      });
    
    res.status(authData.status)
        .send(authData.body);
})

const PORT = 3001;

app.listen(PORT, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`App running on port: ${PORT}`);
    }
})