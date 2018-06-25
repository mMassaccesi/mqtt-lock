const host = 'mqtt://mosquitto:1884';
const mqtt = require('mqtt');
const client = mqtt.connect(host);
let door, users;

const handler = {
    
    init: (d, u) => {
        door = d;
        users = u;
        handler.connect();
    },
    connect: () => {
        client.on('connect', () => {
            console.log('se conectó node');
            handler.onMessage();
            handler.subscribe('main/toggle');
            handler.subscribe('main/close');
            handler.subscribe('login/request/+');
            handler.subscribe('config/#');
        });
    },
    onMessage: () => {
        client.on('message', (topic, message) => {
            let m = JSON.parse(message.toString());
            let currentDate = new Date();
            if(topic.indexOf('login') != -1){
                m.uuid = topic.split('/')[2];
                topic = 'login/request';
            }
            console.log(topic, m);
            switch (topic) {
                case 'main/toggle':
                    let log = {
                        date: currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + " @ " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds(), 
                        ...m
                    }
                    let qos = 2;
                    if(m.open){
                        door.open(m.distance);
                        log.action = 'La puerta ha sido abierta.';
                        log.sendNotifications = true;
                        log.phones = users.getMobilePhones(m.name);
                    } else {
                        door.close();
                        log.sendNotifications = false;
                        log.action = 'La puerta ha sido cerrada.';
                        qos = 0;
                    }
                    handler.publish('logs', log, qos);
                break;

                case 'main/close':
                    door.closeByDistance(m.distance);
                    m.sendNotifications = false;
                    handler.publish('logs', {
                        date: currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear() + " @ " + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds(),
                        ...m,
                        action: 'Puerta cerrada automaticamente por distancia.'
                    }, 0);
                break;

                case 'config/distance':
                    door.setDistance(m);
                    break;

                case 'login/request':
                    users.login(m);
                    break;

                default:
                    break;
            }
        });
    },
    publish: (topic, msg, qos = 2) => {
        client.publish(topic, JSON.stringify(msg), {qos, retain: true}, () => console.log('publicado CB'));
    },
    subscribe: (topic) => {
        client.subscribe(topic);
    }

}

module.exports = handler;