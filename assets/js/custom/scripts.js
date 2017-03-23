function setMaxHeight(box) {
    var maxHeight = 0;
    box.each(function () {
        if ( jQuery(this).height() > maxHeight ) {
            maxHeight = jQuery(this).height();
        }
    });
    box.height(maxHeight);
}

function customFontSize(minvalue, maxvalue, minsize, maxsize) {
    $(window).on('load', function () {
        var evaluation = $('.evaluation'),
            minValue = minvalue,
            maxValue = maxvalue,
            minSize = minsize,
            maxSize = maxsize,
            iteration = maxValue - minValue,
            step = ((maxSize - minSize) / iteration).toFixed(3);

        evaluation.each(function () {
            var value = $(this).text();
            if (value < minValue) {
                $(this).css('font-size', minSize+'em');
            } else if (value > maxValue) {
                $(this).css('font-size', maxSize+'em');
            } else {
                var size = (minSize + ((value - minValue) * step)).toFixed(3);
                $(this).css('font-size', size+'em');
            }
        })
    });
}

jQuery(document).ready(function($) {

    // for burger menu
    $('.mobile-menu-toggle, .mobile-menu-overlay').on('click', function(){
        $('.mobile-menu-toggle').toggleClass('active');
        $('.mobile-menu-wrap').toggleClass('showing');
        $(document.body).toggleClass('overflow');
    });


    $(window).on('load resize', function() {
        var width = $(window).width();

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

        } else {
            if (width > '768') {
                //for hover effect
                $(".section-level-1, .strategy-evaluation-list:not(.strategy-title-list)").hover(
                    function () {
                        $('.bottom-nav-list, .section-level-2, .section-level-2-2, .level-list').addClass("hover");
                    },
                    function () {
                        $('.bottom-nav-list, .section-level-2, .section-level-2-2, .level-list').removeClass("hover");
                    }
                );

                //for hover width effect
                $(".level-list li").hover(
                    function () {
                        $(this).prev().addClass("shrink-left");
                        $(this).addClass("expand");
                        $(this).next().addClass("shrink-right");
                    }, function () {
                        $(this).prev().removeClass("shrink-left");
                        $(this).removeClass("expand");
                        $(this).next().removeClass("shrink-right");
                    }
                );
            } else {
                $('.bottom-nav-list, .section-level-2, .section-level-2-2, .level-list, #footer').removeClass("hover");
                $(".level-list li").removeClass("shrink-left expand shrink-right");
            }
        }
    });

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

    // for custom font size
    customFontSize(1, 20, 2, 4.68);

    //for cell
    if ($('section').hasClass('section-level-2')) {
        $(window).on('load resize', function () {
            var width = $(window).width(),
                cell = $('.strategy-evaluation-list li:not(.strategy-title-cell)'),
                titleCell = $('.strategy-title-cell'),
                title = titleCell.find('.locality-title');

            if (width < '1280') {
                setMaxHeight(cell);
                setMaxHeight(titleCell);

                setTimeout(function () {
                    var lineHeight = titleCell.height();
                    title.css('line-height', lineHeight+'px');
                }, 200);
            } else {
                cell.css('height', '');
                titleCell.css('height', '');
                title.css('line-height', '');
            }
        });
    }

});