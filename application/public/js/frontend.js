function setFlashMessageFadeOut() {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if(currentOpacity < 0.1){
                clearInterval(timer);
                flashElement.remove();
            }
            currentOpacity = currentOpacity - 0.1;
            flashElement.style.opacity = currentOpacity;
        }, 20);
    }, 1000);
}

let flashElement = document.getElementById('flash-message');
if(flashElement){
    setFlashMessageFadeOut();
}