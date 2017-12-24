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