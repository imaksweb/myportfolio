'use strict';

module.exports = function() {
    const parallaxContainer = document.getElementById('parallax');

    const moveLayers = e => {
        const initialX = (window.innerWidth / 2) - e.pageX;
        const initialY = (window.innerHeight / 2) - e.pageY;
        const layers = parallaxContainer.children;

        let i = 0;
        for (let layer of layers) {
            const divider = i / 150;
            const positionX = initialX * divider;
            const positionY = initialY * divider;   
            const bottomPosition = (window.innerHeight / 2) * divider;
            const image = layer.firstElementChild;
            
            layer.style.transform = `translate(${positionX}px, ${positionY}px)`;
            image.style.bottom = `-${bottomPosition}px`;
            i++;
        }
    }

    if(parallaxContainer) {
        document.addEventListener('mousemove', moveLayers);
    }
}

