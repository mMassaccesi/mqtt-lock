let state = { isLock: true } 
let distance = 1;
let mqtt; 

const door = {

    init: (m) => {
        mqtt = m;
    },
    open: (d) => {
        if(d <= distance){
            state.isLock = false;
            mqtt.publish('cerradura', state);
        }
        mqtt.publish('main/response', state);
    },
    close: () => {
        state.isLock = true;
        mqtt.publish('cerradura', state);
        mqtt.publish('main/response', state);
    },
    closeByDistance: (d) => {
        if(d > distance){
            state.isLock = true;
            mqtt.publish('cerradura', state);
            mqtt.publish('main/response', state);
        }
    },
    setDistance: (d) => {
        distance = d;
    }
    
}

module.exports = door;