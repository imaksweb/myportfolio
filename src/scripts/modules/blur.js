'use stricts';

module.exports = function() {
    let blur = (function() {
        const wrapper = document.querySelector('.reviews__form-wrapper');
        const form = document.querySelector('.reviews__form');

        return {
            set: function() {
                const imgWidth = document.querySelector('.works__reviews-bg').offsetWidth;
                const posLeft = -wrapper.offsetLeft;
                const posTop = -wrapper.offsetTop;
                blurCSS = form.style;

                blurCSS.backgroundSize = imgWidth + 'px' + ' ' + 'auto';
                blurCSS.backgroundPosition = posLeft + 'px' + ' ' + posTop + 'px';
            }
        }
    }());

    if(document.querySelector('.reviews__form-wrapper')) {
        blur.set();

        window.onresize = function() {
            blur.set();
        }
    }
}