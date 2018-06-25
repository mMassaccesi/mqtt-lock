const fs = require('fs');

const registros = {
    
    log: (body) => {
        const log = `[${body.date} - ${body.name}] ${body.action}`;
        console.log(log);
        var stream = fs.createWriteStream("logs.txt", { flags: 'a' });
        stream.write(log + "\n");
        stream.end();
    }

}

module.exports = registros;