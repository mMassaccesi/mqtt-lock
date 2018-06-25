$(() => {
    
    const host = 'ws://localhost:9001/';
    window._client = mqtt.connect(host);

    window._client.on('connect', () => {
        window._client.subscribe('main/response');
        window._client.subscribe('login/response/' + window.myuuid);
    });

    window._client.on('message', (topic, message) => {
        let m = JSON.parse(message.toString());
        if (topic.indexOf('login') != -1) {
            topic = 'login/response';
        }
        console.log(topic, m);
        
        switch (topic) {
            case 'main/response':
                $('button').removeClass('is-active');
                if (m.isLock) {
                    $('button[data-value="close"]').addClass('is-active');
                    $('.c-switch').removeClass('is-open').addClass('is-close');
                } else {
                    $('button[data-value="open"]').addClass('is-active');
                    $('.c-switch').removeClass('is-close').addClass('is-open');
                }
                break;

            case 'login/response':
                if(m.err) return alert(m.err);
                window.user = m;
                $('#username span').text(`Hola ${m.name}.`);
                $('body').addClass('loggedin');
                break;

            default:
                break;
        }
    });

});
