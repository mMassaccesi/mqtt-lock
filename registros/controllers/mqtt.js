const host = 'mqtt://mosquitto:1884';
const mqtt = require('mqtt');
const client = mqtt.connect(host);
const registros = require('./registros');
const notificaciones = require('./notificaciones');

const handler = {
    
    init: (d, u) => {
        handler.connect();
    },
    connect: () => {
        client.on('connect', () => {
            console.log('se conectó registros');
            handler.onMessage();
            handler.subscribe('logs');
        });
    },
    onMessage: () => {
        client.on('message', (topic, message) => {
            let m = JSON.parse(message.toString());
            console.log(topic, m);
            
            registros.log(m);
            if(m.sendNotifications) notificaciones.send(m);
        });
    },
    subscribe: (topic) => {
        client.subscribe(topic);
    }

}

module.exports = handler;