const express = require('express');
const app = express();
const mqtt = require('./controllers/mqtt');

app.set('port', 5000);

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
    mqtt.init();
});



