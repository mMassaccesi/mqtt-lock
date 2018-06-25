window.myuuid = uuidv1();

$(() => {
    
    let handle = $('#custom-handle');
    $('#slider').slider({
        value: 0.1,
        min: 0.1,
        max: 10,
        step: 0.1,
        slide: (event, ui) => {
            handle.text(ui.value);
            if ($('button[data-value="open"]').hasClass('is-active')){
                window._client.publish('main/close', JSON.stringify({distance: ui.value, ...window.user}), {qos: 2});
            }
        },
        create: () => {
            handle.text('0.1');
        },
    });

    const mySwitch = new Switch(".c-switch");
    mySwitch.element.addEventListener("change", e => {
        let msg = {
            open: false, 
            ...window.user
        }
        if(e.detail == 'open'){
            msg.open = true;
            msg.distance = $('#slider').slider('value');
        }
        console.log(msg);
        window._client.publish('main/toggle', JSON.stringify(msg), {qos: 2});
    });

    $('#loginform').submit((e) => {
        e.preventDefault();

        const user = {
            email: $('#login-email').val(),
            password: $('#login-password').val()
        }

        let topic = 'login/request/' + window.myuuid;
        window._client.publish(topic, JSON.stringify(user), {qos: 1});
    })

    $('#logout').click(() => {
        $('body').removeClass('loggedin');
    })

});

class Switch {
    constructor(
        selector, {
            highlightClass = "c-switch__highlight",
            activeClass = "is-active"
        } = {}
    ) {
        this.activeClass = activeClass;
        this.element = document.querySelector(selector);
        this.buttons = this.element.querySelectorAll("button");
        this.highlight = this.element.querySelector(`.${highlightClass}`);
        this.activeBtn = this.element.querySelector(`button.${this.activeClass}`);

        if (!this.activeBtn) {
            this.activeBtn = this.buttons[0];
            this.activeBtn.classList.add(this.activeClass);
        }

        this._highlight();
        this._addEvents();
    }

    _highlight() {
        const w = this.activeBtn.offsetWidth;
        const x = this.activeBtn.offsetLeft;

        this.highlight.style.width = `${w}px`;
        this.highlight.style.transform = `translateX(${x}px)`;
    }

    _dispatchEvent() {
        this.element.dispatchEvent(
            new CustomEvent("change", {
                detail: this.activeBtn.dataset.value
            })
        );
    }

    _addEvents() {
        [].forEach.call(this.buttons, btn =>
            btn.addEventListener("click", e => {
                if (this.activeBtn === e.target) return;

                this.activeBtn.classList.remove(this.activeClass);
                this.activeBtn = e.target;
                this.activeBtn.classList.add(this.activeClass);
                this.element.classList.add('is-' + e.target.getAttribute('data-value'));

                this._highlight();
                this._dispatchEvent();
            })
        );
    }
}

