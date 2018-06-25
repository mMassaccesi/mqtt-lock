const express = require('express');
const app = express();
const mqtt = require('./controllers/mqtt');
const door = require('./controllers/door');
const users = require('./controllers/users');

app.set('port', 5000);

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
    mqtt.init(door, users);
    door.init(mqtt);
    users.init(mqtt);
});




