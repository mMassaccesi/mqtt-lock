const twilio = require('twilio');
const authToken = '96ebd29f0ca8540669ed585999500e8e';
const accountSid = 'ACf9a6503a68735c558fdfbcdd13b07305';
const client = new twilio(accountSid, authToken);

const registros = {
    
    send: (body) => {
        body.phones.forEach(p => {
            client.messages.create({
                    body: `¡Alerta! La puerta ha sido abierta por ${body.name}`,
                    to: p,
                    from: '+18562634352'
                })
                .then((message) => console.log('message sent to ', p))
                .catch(err => console.log('SMS error: ', err));
        })
    }

}

module.exports = registros;