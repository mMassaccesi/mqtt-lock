$(() => {
    init();
});

const lock = (locked) => {
    if (!locked) {
        anime({
            targets: '.lock-disc svg, .lock-center',
            rotate: '90deg'
        });
    } else {
        anime({
            targets: '.lock-disc svg, .lock-center',
            rotate: '0deg'
        });
    }
}

const init = () => {
    anime({
        targets: '.lock-disc svg, .lock-center',
        rotate: '90deg'
    });
    $('.lock').addClass('locked');
}