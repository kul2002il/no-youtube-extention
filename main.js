
class Timer {
    constructor(seconds, element) {
        this.seconds = seconds;
        this.element = element;
        this.updateView();

        this.interval = setInterval(()=>{
            this.seconds--;
            this.updateView();
            if (this.seconds <= 0) {
                clearInterval(this.interval);
                if (this.callback) {
                    this.callback();
                }
            }
        }, 1000);
    }

    updateView() {
        if (this.element) {
            this.element.textContent = this.toString();
        }
    }

    toString() {
        let seconds = this.seconds % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return div(this.seconds, 60) + ':' + seconds;
    }
}

function div(val, by){
    return (val - val % by) / by;
}





customElements.define('show-banner', class extends HTMLElement {
    connectedCallback() {
        const shadow = this.attachShadow({mode: 'open'});
        shadow.innerHTML = `
<style>
    #body {
        font-size: 2rem;
        padding: 30px;
    }
    #body > * {
        margin-bottom: 20px;
    }
</style>
<div id="body">
    <h2>Стой, подумай!</h2>
    <p>Подожди немного, почитай книгу, отвлекись на чайочичек. Сделай что-нибудь в общем.</p>
    <p>Либо просто подожди несколько минут.</p>
    <p id="timer"></p>
</div>`;
        let timer = new Timer(10 * 60, shadow.getElementById('timer'));
        timer.callback = () => {
            document.querySelector('ytd-app').style.display = null;
            this.remove();
        };
    }
});





function ban() {
    if (document.querySelector('show-banner') ) {
        return;
    }

    document.querySelector('ytd-app').style.display = 'none';
    // TODO: Stop video.

    document.body.appendChild(
        document.createElement('show-banner')
    );
}





let oldLocation = null;

setInterval(() => {
    if (oldLocation !== window.location.href) {
        oldLocation = window.location.href;
        ban();
    }
}, 200);



