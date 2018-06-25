const allusers = require('../users.json');
let mqtt;

const users = {

    init: (m) => {
        mqtt = m;
    },
    getMobilePhones: (exclude) => {
        let phones = [];
        allusers.forEach(u => {
            if (u.receiveNotifications && u.name != exclude)
                phones.push(u.phone);
        })
        return phones;
    },
    login: (u) => {
        const user = allusers.find(user => user.email === u.email);
        let res = {
            err: 'No se encontró el usuario'
        }

        if(user){
            if(user.password === u.password){
                res = {
                    name: user.name,
                    root: user.root,
                    receiveNotifications: user.receiveNotifications
                }
            } else {
                res.err = 'Contraseña incorrecta';
            }
        }

        mqtt.publish(`login/response/${u.uuid}`, res, 1);
    }
    
}

module.exports = users;