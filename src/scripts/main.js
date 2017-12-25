const parallaxContainer = document.getElementById('parallax');
const layers = parallaxContainer.children;

const moveLayers = e => {
    const initialX = (window.innerWidth / 2) - e.pageX;
    const initialY = (window.innerHeight / 2) - e.pageY;

    let i = 0;
    for (let layer of layers) {
        const divider = i / 70;
        const positionX = initialX * divider;
        const positionY = initialY * divider;   
        const bottomPosition = (window.innerHeight / 2) * divider;
        const image = layer.firstElementChild;
        
        layer.style.transform = `translate(${positionX}px, ${positionY}px)`;
        image.style.bottom = `-${bottomPosition}px`;
        i++;
    }
}

window.addEventListener('mousemove', moveLayers);


// flip animation

const trigger = document.getElementById('authorisation-btn');
const flipper = document.querySelector('.welcome__flipper');
const backBtn = document.querySelector('.back');
const rotate = 180;

const flip = e => {
    e.preventDefault();
    flipper.style.transform = `rotateY(${rotate}deg)`;
}

const back = e => {
    e.preventDefault();
    flipper.style.transform = `rotateY(0)`;
}

trigger.addEventListener('click', flip);
backBtn.addEventListener('click', back);