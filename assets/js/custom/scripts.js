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
    jQuery(window).on('load', function () {
        var evaluation = jQuery('.evaluation'),
            minValue = minvalue,
            maxValue = maxvalue,
            minSize = minsize,
            maxSize = maxsize,
            iteration = maxValue - minValue,
            step = ((maxSize - minSize) / iteration).toFixed(3);

        evaluation.each(function () {
            var value = jQuery(this).text().replace(/ /g,'').replace(/,/g , '');
            if (value < minValue) {
                jQuery(this).css('font-size', minSize+'em');
            } else if (value > maxValue) {
                jQuery(this).css('font-size', maxSize+'em');
            } else {
                var size = (minSize + ((value - minValue) * step)).toFixed(3);
                jQuery(this).css('font-size', size+'em');
            }
        })
    });
}

function drawSlash() {
    jQuery(window).on('load resize', function () {
        if (jQuery('section').hasClass('section-level-2')) {
            var cell = jQuery('.table-label');
        } else if (jQuery('section').hasClass('section-level-2-2')) {
            var cell = jQuery('.table-label-box');
        }
        var slash = jQuery('#slash'),
            cellWidth =cell.innerWidth() - 18,
            cellHeight = cell.innerHeight() - 18;

        slash.attr('width', cellWidth);
        slash.attr('height', cellHeight);

        slash.drawLine({
            strokeStyle: '#fff',
            strokeWidth: 2,
            rounded: true,
            x1: 10, y1: 2,
            x2: cellWidth, y2: cellHeight
        });
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


        //drupal block edit links - move into previous container
        $('.footer .edit_block_link').each(function() {
            $(this).prev().append($(this));
        });
        
        $('.edit_block_link').parent().on( "mouseenter mouseleave", function( event ) {
          $( this ).toggleClass( "block_edit_hover" );
        });

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
    customFontSize(1, 20, 2, 3);

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

    $('.strategy-evaluation-list li:has(a)').on({
        click: function(e) {
            e.preventDefault();

            window.location = $(this).find('a.btn').attr('href');
            return false;
        }
    });


    // for 2x sizes of images
    // $('.section-level-1 .level-box img[src*="2x"]').each(function( index ) {
    //    $(this).css( 'width', $(this).prop("naturalWidth")/2 );
    // });


    //forms checkboxes
    $(window).on('load', function () {
        if ($('.node-webform').hasClass('node-4653')) {
            var checkGroup = $('.webform-component-checkboxes');

            checkGroup.each(function () {
                var groupInput = $(this).find('.form-checkbox'),
                    groupLabel = $(this).find('.option'),
                    titleLabel = $(this).children('label');

                titleLabel.addClass('checkboxes-title');
                groupInput.each(function (index) {
                    var input = groupInput.eq(index),
                        label = groupLabel.eq(index),
                        text = label.text();

                    label.addClass('check-style').empty();
                    label.append('<span>');
                    label.find('span').text(text);
                    input.prependTo(label);
                });
            });

            //for strategy
            var box = $('.webform-client-form > div'),
                boxItem = box.children();

            box.append('<div class="left-form-box">');
            box.append('<div class="right-form-box">');

            var leftFormBox = $('.left-form-box'),
                rightFormBox = $('.right-form-box');

            boxItem.each(function (index) {
                if (index <= 6) {
                    boxItem.eq(index).appendTo(leftFormBox);
                } else {
                    boxItem.eq(index).appendTo(rightFormBox);
                }
            });

            leftFormBox.append('<div class="left-check-box">');
            leftFormBox.append('<div class="right-check-box">');

            var leftCheckBox = $('.left-check-box'),
                rightCheckBox = $('.right-check-box');

            checkGroup.each(function (index) {
                if (index <= 1) {
                    checkGroup.eq(index).appendTo(leftCheckBox);
                } else {
                    checkGroup.eq(index).appendTo(rightCheckBox);
                }
            });
        } else if($('.node-webform').hasClass('node-4652')) {

            //for contact
            var box = $('.webform-client-form > div'),
                boxItem = box.children();

            $('.form-select').wrap( '<div class="select-wrap"></div>');
            box.append('<div class="left-form-box">');
            box.append('<div class="right-form-box">');

            var leftFormBox = $('.left-form-box'),
                rightFormBox = $('.right-form-box');

            boxItem.each(function (index) {
                if (index <= 2) {
                    boxItem.eq(index).appendTo(leftFormBox);
                } else {
                    boxItem.eq(index).appendTo(rightFormBox);
                }
            });

        }
    });


    // for popup agree on load Homepage
    $(window).load(function(){
        // if ($.cookie('assetMapPopup') == null) {
            if ( $( "#popup-1" ).length ) {
                $.magnificPopup.open({
                    items: {src: '.front #popup-1'},
                    type: 'inline',
                    removalDelay: 350,
                    mainClass: 'mfp-fade'
                });
            }
        //     $.cookie('assetMapPopup', '1', { expires: 30 });
        // };

        //view more link in drupal views automatically formats the URL unless
        //you put an absolute URL, so I used the replaceme placeholder below
        // and replace it after the page loads
        $('.views-more-link').each(function(){
            this.href = this.href.replace('http://replaceme/', '');
        });
    });

    //popup for readmore on stragety list page
    $('.level3-box .views-more-link').magnificPopup({
      type:'inline',
      midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
      removalDelay: 350,
      mainClass: 'mfp-fade'
    });

    //draw slash
    drawSlash();

    // for section-level-2
    var strategyLabel = $('.strategy-label'),
        ageLabel = $('.age-label'),
        ageText = ageLabel.text(),
        strategyText = strategyLabel.text();

    $(window).on('load resize', function () {
        if ($('section').hasClass('section-level-2')) {
            var width = $(window).width(),
                ageNewText = ageLabel.text();

            if (width > '1280' && ageText !== ageNewText){
                strategyLabel.text(strategyText);
                ageLabel.text(ageText);
            } else if (width < '1280' && ageText == ageNewText) {
                strategyLabel.text(ageText);
                ageLabel.text(strategyText);
            }
        }

    });
});