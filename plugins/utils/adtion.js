if (process.browser) {
    const adtion = (sw) => {
        const w = document.documentElement.clientWidth;
        let f = w / sw * 100;
        f = f > 100 ? 100 + "px" : f + "px";
        document.documentElement.style.fontSize = f;
    };
    if (document.documentElement.clientWidth > 750) {
        adtion(1180);
    } else {
        adtion(750);
    }
    window.addEventListener('resize', function() {
        if (document.documentElement.clientWidth > 750) {
            adtion(1180);
        } else {
            adtion(750);
        }
    }, false);
}