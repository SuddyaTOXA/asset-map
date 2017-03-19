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
    //for hover effect
    $(".level-list").hover(
        function() {
            $(this).addClass("hover");
        }, function() {
            $(this).removeClass("hover");
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

        if (width > '1024') {
            setTimeout(function () {
                setMaxHeight(listBox);

                if (listHeight > windowHeight) {
                    setMaxHeight(contentBox);
                } else {
                    listBox.height(windowHeight);
                }
            }, 100);
        }
    });
});