'use strict';

module.exports = function() {
    const trigger = document.getElementById('authorisation-btn');
    const flipper = document.querySelector('.flipper');
    const backBtn = document.querySelector('.back-btn');
    const rotate = 180;

    const flip = e => {
        e.preventDefault();
        flipper.style.transform = `rotateY(${rotate}deg)`;
        
        setTimeout(() => {
            trigger.style.display = 'none';
        }, 350);
    }

    const back = e => {
        e.preventDefault();
        flipper.style.transform = `rotateY(0)`;
        setTimeout(() => {
            trigger.style.display = 'block';  
        }, 350);
    }

    if(trigger) {
        trigger.addEventListener('click', flip);
    }

    if(backBtn) {
        backBtn.addEventListener('click', back);
    }  
}