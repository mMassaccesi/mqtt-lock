$(() => {
    
    const host = 'ws://localhost:9001/';
    window._client = mqtt.connect(host);

    window._client.on('connect', () => {
        window._client.subscribe('login/response/' + window.myuuid);
        console.log('config ok');
    });

    window._client.on('message', (topic, message) => {
        let m = JSON.parse(message.toString());
        if (topic.indexOf('login') != -1) {
            topic = 'login/response';
        }
        console.log(topic, m);

        switch (topic) {
            case 'login/response':
                if (m.err) return alert(m.err);
                if (!m.root) return alert('No tienes permiso para cambiar la configuración.');
                $('#username span').text(`Hola ${m.name}.`);
                $('body').addClass('loggedin');
                break;

            default:
                break;
        }
    });

});
