function setMaxHeight(box) {
    var maxHeight = 0;
    box.each(function () {
        if ( jQuery(this).height() > maxHeight ) {
            maxHeight = jQuery(this).height();
        }
    });
    box.height(maxHeight);
}

jQuery(document).ready(function($) {

    // for burger menu
    $('.mobile-menu-toggle, .mobile-menu-overlay').on('click', function(){
        $('.mobile-menu-toggle').toggleClass('active');
        $('.mobile-menu-wrap').toggleClass('showing');
        $(document.body).toggleClass('overflow');
    });

    //for hover effect
    $(".section-level-1").hover(
        function() {
            $('.bottom-nav-list, .level-list, #footer').addClass("hover");
        },
        function() {
            $('.bottom-nav-list, .level-list, #footer').removeClass("hover");
        }
    );

    //gor hover width effect
    $(".level-list li").hover(
        function() {
            $(this).prev().addClass("shrink-left");
            $(this).addClass("expand");
            $(this).next().addClass("shrink-right");
        }, function() {
            $(this).prev().removeClass("shrink-left");
            $(this).removeClass("expand");
            $(this).next().removeClass("shrink-right");
        }
    );

    // for section Level 1
    $(window).on('load resize', function() {
        var width           = $(window).width(),
            windowHeight    = $(window).height(),
            listHeight      = $('.level-list').height(),
            listBox         = $('.level-list > li'),
            contentBox      = listBox.find('.content-wrap');

        function levelHeight(){
            setMaxHeight(contentBox);

            if (listHeight > windowHeight)
                setMaxHeight(listBox);
            else
                listBox.height(windowHeight - 70);
        }

        if (width > '1140') {
            levelHeight();
        } else if (width >= 769 && width <= '1140') {
            levelHeight();
        } else {
            contentBox.css('height', '');
            listBox.css('height', '');
        }
    });

});