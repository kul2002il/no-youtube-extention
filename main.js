function div(val, by){
    return (val - val % by) / by;
}

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

function ban() {
    if (document.querySelector('show-banner') ) {
        return;
    }

    document.querySelector('ytd-app').style.display = 'none';
    // TODO: Stop video.

    let bannerElement = document.createElement('div');
    bannerElement.style.padding = '30px';
    bannerElement.style.fontSize = '2rem';
    bannerElement.innerHTML = `
        <h2 style="margin-bottom: 20px">Стой, подумай!</h2>
        <p style="margin-bottom: 20px">Подожди немного, почитай книгу, отвлекись на чайочичек. Сделай что-нибудь в общем.</p>
        <p style="margin-bottom: 20px">Либо просто подожди несколько минут.</p>
        <p id="no-youtube-timer"></p>
    `;

    document.body.appendChild(bannerElement);

    let timer = new Timer(10 * 60, document.getElementById('no-youtube-timer'));
    timer.callback = () => {
        document.querySelector('ytd-app').style.display = null;
        bannerElement.remove();
    };
}


let oldLocation = null;

setInterval(() => {
    if (oldLocation !== window.location.href) {
        oldLocation = window.location.href;
        ban();
    }
}, 200);
