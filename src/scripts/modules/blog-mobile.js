'use stricts';

module.exports = function() {
    const $ = require('jquery');

    let scrollMenu = (function() {
        const $news = $('.news');
        const $item = $('.blog-mobile-menu__item');
        const $wrapMenu = $('.blog__mobile-menu-wrap');
        const trigger = $('.mobile-menu__trigger');
        let positionArticle = [];
        let offsetHeight = 100;

        $(trigger).on('click', function(e) {
            $wrapMenu.toggleClass('blog__mobile-menu-wrap_active');
        });

        let _setPositionArticle = function(element) {
            const len = element.length;

            element.each(function(item) {
                positionArticle[item] = {};
                positionArticle[item].top = $(this).offset().top - offsetHeight;
                positionArticle[item].bottom = 
                    positionArticle[item].top + $(this).innerHeight();
            });
        };

        // меняет активные пункты меню при скроле страницы
        let _scrollPage = function(e) {
            let scroll = window.pageYOffset;

            positionArticle.forEach(function(element, index) {
                if (
                    scroll >= element.top &&
                    scroll <= element.bottom
                ) {
                    $item.eq(index).addClass('blog-mobile-menu__item_active')
                    .siblings().removeClass('blog-mobile-menu__item_active');
                }
            });
        };

        let _clickMenu = function(e) {
            let $element = $(e.target);
            let index = $element.index();
            let sectionOffset = positionArticle[index].top;

            $(document).off('scroll', _scrollPage);
            $element.siblings().removeClass('blog-mobile-menu__item_active');
            $('body, html').animate(
                {
                    scrollTop: sectionOffset
                },
                1000,
                () => {
                    $element.addClass('blog-mobile-menu__item_active');
                    $(document).on('scroll', _scrollPage);
                }
            );
        };

        let addListener = function() {
            $('.blog-mobile-menu').on('click', _clickMenu);
            $(document).on('scroll', _scrollPage);

            _setPositionArticle($news);

            $(window).on('load', function(e) {
                _setPositionArticle($news);
            });

            $(window).on('resize', function(e) {
                _setPositionArticle($news);
            });
        };

        return {
            init: addListener
        };
    })();

    if(document.querySelector('.blog')) {
        scrollMenu.init();
    }
}