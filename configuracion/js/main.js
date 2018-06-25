window.myuuid = uuidv1();

$(() => {
    $('#save').click(() => {
        const distance = $('#distance').val();
        window._client.publish('config/distance', distance, {qos: 1});
        alert('Distancia guardada.');
    });

    $('#loginform').submit((e) => {
        e.preventDefault();

        const user = {
            email: $('#login-email').val(),
            password: $('#login-password').val()
        }

        let topic = 'login/request/' + window.myuuid;
        window._client.publish(topic, JSON.stringify(user), {qos: 1});
    });

    $('#logout').click(() => {
        $('body').removeClass('loggedin');
    });
});