// Check if is mobile
function isMobile () {
    if ( $(window).width() < 900 ) {
        return true;
        console.log('Is Mobile');
    } else {
        return false;
        console.log('Is Desktop');
    }
}

jQuery(document).ready(function($) {


    // Variables
    var header = $('.header');
    var nav = $('.main-nav');
    var navWrapper = $('.main-nav-wrapper');
    var content = $('.main-content');

    // Hamburger - Open/Close Nav Menu
    $('.nav-hamburger').on('click', function(e) {
        e.preventDefault();

        if ( header.hasClass('nav-is-visible') )  {
            $('.moves-out').removeClass('moves-out');
        }

        header.toggleClass('nav-is-visible');
        nav.toggleClass('nav-is-visible');
        content.toggleClass('nav-is-visible');
    });


    // Move the navigation
    function moveNavigation() {
        if (isMobile()) {
            // mobile screen - insert navigation after .main-content element
            navWrapper.detach();
            navWrapper.insertAfter('footer');
            //navWrapper.insertAfter('.main-content');
        } else {
            // desktop screen - insert navigation inside header element
            navWrapper.detach();
            navWrapper.insertBefore('.nav-hamburger');
        }
    }

    $(window).on('resize', function() {
        if (isMobile()) {
            console.log('Yeah, mobile.');
        } else {
            stickyHeader();
            console.log('Yeah, desktop');
        }
        isMobile();
        moveNavigation();
    });


    // Sticky Header
    function stickyHeader () {

        var headerHeight = header.height();

        $(window).on('scroll', {previousTop: 0}, function () {
            var currentTop = $(window).scrollTop();

            if (currentTop < this.previousTop) {

                if (currentTop > 0 && header.hasClass('header-is-fixed')) {
                    header.addClass('header-is-visible');
                } else {
                    header.removeClass('header-is-visible header-is-fixed');
                }

            } else {
                header.removeClass('header-is-visible');

                if ( currentTop > headerHeight && !header.hasClass('header-is-fixed') ) {
                    header.addClass('header-is-fixed');
                }
            }

            this.previousTop = currentTop;
        });

    }

    moveNavigation();

    if (!isMobile()) {
        stickyHeader();
    }
    
    //stickyHeader();
    /*$(window).on('load resize', function(){
        console.log('Ready.');
        //(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
    });*/


});