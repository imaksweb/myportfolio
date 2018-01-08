'use stricts';

module.exports = function() {
    const $ = require('jquery');
    let scrollMenu = (function() {
        const $news = $('.news');
        const $item = $('.blog-menu__item');
        const $wrapMenu = $('.blog__sidebar-wrap');
        let positionArticle = [];
        let offsetHeight = 100;
    
        let _setPositionArticle = function(element) {
            const len = element.length;
    
            element.each(function(item) {
                positionArticle[item] = {};
                positionArticle[item].top = $(this).offset().top - offsetHeight;
                positionArticle[item].bottom = 
                    positionArticle[item].top + $(this).innerHeight();
            });
        };
    
        // фиксирует боковое меню при скроле страницы вниз
        let _scrollPageFixMenu = function(e) {
            let scroll = window.pageYOffset;
    
            if(scroll < $news.offset().top) {
                $wrapMenu.removeClass('fixed');
            } else {
                $wrapMenu.addClass('fixed');
            }
        };
    
        // меняет активные пункты меню при скроле страницы
        let _scrollPage = function(e) {
            let scroll = window.pageYOffset;
    
            positionArticle.forEach(function(element, index) {
                if (
                    scroll >= element.top &&
                    scroll <= element.bottom
                ) {
                    $item.eq(index).addClass('blog-menu__item_active')
                    .siblings().removeClass('blog-menu__item_active');
                }
            });
        };
    
        let _clickMenu = function(e) {
            let $element = $(e.target);
            let index = $element.index();
            let sectionOffset = positionArticle[index].top;
    
            $(document).off('scroll', _scrollPage);
            $element.siblings().removeClass('blog-menu__item_active');
            $('body, html').animate(
                {
                    scrollTop: sectionOffset
                },
                1000,
                () => {
                    $element.addClass('blog-menu__item_active');
                    $(document).on('scroll', _scrollPage);
                }
            );
        };
    
        let addListener = function() {
            $('.blog-menu').on('click', _clickMenu);
            $(document).on('scroll', _scrollPage);
            $(document).on('scroll', _scrollPageFixMenu);
    
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