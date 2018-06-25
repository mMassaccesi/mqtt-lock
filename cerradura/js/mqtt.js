$(() => {
    
    const host = 'ws://localhost:9001/';
    const client = mqtt.connect(host);

    client.on('connect', () => {
        client.subscribe('cerradura');
        console.log('client ok');
    });

    client.on('message', (topic, message) => {
        let m = JSON.parse(message.toString());
        console.log(topic, m);
        lock(!m.isLock);
    });

});
