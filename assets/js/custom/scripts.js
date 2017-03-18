function setMaxHeight(box) {
    var maxHeight = 0;
    box.each(function () {
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }
    });
    box.height(maxHeight);
}

$(document).ready(function() {
    //for hover effect
    $( ".level-list" ).hover(
        function() {
            $( this ).addClass( "hover" );
        }, function() {
            $( this ).removeClass( "hover" );
        }
    );

    //for section level 1
    $(window).on('load resize', function() {
        var width = $(window).width(),
            windowHeight =  $(window).height(),
            listHeight = $('.level-list').height(),
            listBox = $('.level-list li'),
            contentBox = listBox.find('.content-wrap');

        if (width > '1024') {
            setTimeout(function () {
                setMaxHeight(listBox);

                if (listHeight > windowHeight) {
                    setMaxHeight(contentBox);
                } else {
                    listBox.height(windowHeight);
                }
            }, 100);
        } else {

        }
    });
});