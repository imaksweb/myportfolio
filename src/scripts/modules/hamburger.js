'use strict';

module.exports = function() {
    let menu = ((options) => {
        let button = document.querySelector(options.button);
        let menu = document.querySelector(options.menu);
        let leftSide = document.querySelector('.hide-menu__left');
        let rightSide = document.querySelector('.hide-menu__right');
        let navMenu = document.querySelector('.nav-menu');
        let body = document.querySelector('body');
        let isAnimate = false;
    
        let _toggleMenu = e => {
            e.preventDefault();
            
            if (!isAnimate) {
                isAnimate = true;
                if(menu.classList.contains('hide-menu_active')) {
                    setTimeout(() => {
                        button.classList.remove('hamburger-btn_active');
                        menu.classList.remove('hide-menu_active');
                    }, 500);
                    navMenu.classList.remove('nav-menu_active');
                    setTimeout(() => {
                        body.classList.remove('body__active-menu');
                        isAnimate = false;
                    }, 1200);
                }else {
                    button.classList.add('hamburger-btn_active');
                    menu.classList.add('hide-menu_active');
                    body.classList.add('body__active-menu');
                    setTimeout(() => {
                        navMenu.classList.add('nav-menu_active');
                    }, 700);
                    setTimeout(() => {
                        isAnimate = false;
                    }, 1200);
                }
            }
        }
    
        let addListener = () => {
            button.addEventListener('click', _toggleMenu);
        }
        
        return {
            init: addListener
        };
    })({
        button: '#hamburger-btn',
        menu: '#hide-menu'
    });
    
    if(document.querySelector('#hamburger-btn')) {
        menu.init();
    } 
}

