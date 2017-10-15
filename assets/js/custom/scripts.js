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
        var cell = jQuery('.table-label-box'),
            slash = jQuery('#slash'),
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
    $('.mobile-menu-toggle, .mobile-menu-overlay').on('click', function () {
        $('.mobile-menu-toggle').toggleClass('active');
        $('.mobile-menu-wrap').toggleClass('showing');
        $(document.body).toggleClass('overflow');
    });


    $(window).on('load resize', function () {
        var width = $(window).width();

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

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
        $('.footer .edit_block_link').each(function () {
            $(this).prev().append($(this));
        });

        $('.edit_block_link').parent().on("mouseenter mouseleave", function (event) {
            $(this).toggleClass("block_edit_hover");
        });

    });

    // for section Level 1
    $(window).on('load resize', function () {
        var width = $(window).width(),
            windowHeight = $(window).height(),
            listHeight = $('.level-list').height(),
            listBox = $('.level-list > li'),
            contentBox = listBox.find('.content-wrap');

        function levelHeight() {
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

            if (width <= '1280') {
                setMaxHeight(cell);
                setMaxHeight(titleCell);

                setTimeout(function () {
                    var lineHeight = titleCell.height();
                    title.css('line-height', lineHeight + 'px');
                }, 200);
            } else {
                cell.css('height', '');
                titleCell.css('height', '');
                title.css('line-height', '');
            }
        });
    }

    $('.strategy-evaluation-list li:has(a)').on({
        click: function (e) {
            e.preventDefault();

            window.location = $(this).find('a.btn').attr('href');
            return false;
        }
    });


    /*viewportchecker to trigger animations throughout*/
    $(".level-box .btn, .level-box .level-title").addClass("invisible").viewportChecker({
        classToAdd: 'visible animated fadeInUp',
        offset: 100
    });
    $(".level-box .content").addClass("invisible").viewportChecker({
        classToAdd: 'visible animated fadeInUpCustom',
        offset: 100
    });
    // $(".node-type-athlete-age .strategy-img-wrap img").addClass("invisible").viewportChecker({
    //     classToAdd: 'visible animated fadeInUpBig',
    //     offset: 50
    // });
    $(".level-img-wrap, .strategy-evaluation-list .btn, .section-title, .section-title-box, .info-box, .level3-list > li").addClass("invisible").viewportChecker({
        classToAdd: 'visible animated fadeInUpSmall',
        offset: 100
    });
    $(".level-list > li, .bottom-nav-list > li").addClass("invisible").viewportChecker({
        classToAdd: 'visible animated fadeIn',
        offset: 100,
        removeClassAfterAnimation: true
    });
    $(".level-1-title-box, .strategy-evaluation-list span").addClass("invisible").viewportChecker({
        classToAdd: 'visible animated fadeIn',
        offset: 100
    });
    $(".strategy-evaluation-list").addClass("invisible").viewportChecker({
        classToAdd: 'visible animated fadeIn',
        offset: 50
    });
    /*end viewportchecker*/


    // for 2x sizes of images
    // $('.section-level-1 .level-box img[src*="2x"]').each(function( index ) {
    //    $(this).css( 'width', $(this).prop("naturalWidth")/2 );
    // });

   
    $(".btn_print").on('click', function () {
         window.print();
    });




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
        } else if ($('.node-webform').hasClass('node-4652')) {

            //for contact
            var box = $('.webform-client-form > div'),
                boxItem = box.children();

            $('.form-select').wrap('<div class="select-wrap"></div>');
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
    // $(window).load(function () {
    //     if ($.cookie('assetMapPopup') == null) {
    //         if ( $( "#popup-1" ).length ) {
    //             $.magnificPopup.open({
    //                 items: {src: '.front #popup-1'},
    //                 type: 'inline',
    //                 removalDelay: 350,
    //                 mainClass: 'mfp-fade'
    //             });
    //         }
    //         $.cookie('assetMapPopup', '1', { expires: 30 });
    //     };
    //
    //     //view more link in drupal views automatically formats the URL unless
    //     //you put an absolute URL, so I used the replaceme placeholder below
    //     // and replace it after the page loads
    //     $('.views-more-link').each(function () {
    //         this.href = this.href.replace('http://replaceme/', '');
    //     });
    // });

    //popup for readmore on stragety list page
    $('.level3-box .views-more-link').magnificPopup({
        type: 'inline',
        midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
        removalDelay: 350,
        mainClass: 'mfp-fade'
    });

    //draw slash
    if ($('div').hasClass('table-label-box')) {
        drawSlash();
    }

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

    //for search
    $(window).on('load', function () {
        //for placeholder
        if ($('.views-widget-filter-combine').length) {
            var searchBox = $('.views-widget-filter-combine'),
                searchInput = searchBox.find('input'),
                searchPlaceholder = $.trim(searchBox.find('label').text());

            searchInput.attr('placeholder', searchPlaceholder);
        }

        //for icon
        if ($('.views-exposed-widgets')) {
            var iconParents = $('.views-exposed-widgets'),
                iconBox = iconParents.find('label.option');

            iconBox.each(function (i) {
                var iconLabel = $.trim(iconBox.eq(i).attr('for')),
                    tmpImg = new Image(),
                    siteUrl = '',
                    url = '';

                switch (iconLabel) {
                    case 'edit-pipeline-10':
                        url = siteUrl + "img/icon/youth@2x.png";
                        break;
                    case 'edit-pipeline-11':
                        url = siteUrl + 'img/icon/high_school@2x.png';
                        break;
                    case 'edit-pipeline-12':
                        url = siteUrl + 'img/icon/college@2x.png';
                        break;
                    case 'edit-pipeline-13':
                        url = siteUrl + 'img/icon/pro@2x.png';
                        break;
                    case 'edit-target-15':
                        url = siteUrl + 'img/icon/athletes@2x.png';
                        break;
                    case 'edit-target-16':
                        url = siteUrl + 'img/icon/coaches@2x.png';
                        break;
                    case 'edit-target-17':
                        url = '';
                        break;
                    case 'edit-target-18':
                        url = siteUrl + 'img/icon/families@2x.png';
                        break;
                    case 'edit-target-20':
                        url = siteUrl + 'img/icon/leagues@2x.png';
                        break;
                    case 'edit-strategy-1':
                        url = siteUrl + 'img/icon/enforce_policy@2x.png';
                        break;
                    case 'edit-strategy-2':
                        url = siteUrl + 'img/icon/engage_in_partnership@2x.png';
                        break;
                    case 'edit-strategy-3':
                        url = siteUrl + 'img/icon/join_communities_of_practice@2x.png';
                        break;
                    case 'edit-strategy-4':
                        url = siteUrl + 'img/icon/build_champions@2x.png';
                        break;
                    case 'edit-strategy-5':
                        url = siteUrl + 'img/icon/provide_resources@2x.png';
                        break;
                    case 'edit-strategy-6':
                        url = siteUrl + 'img/icon/educate_train@2x.png';
                        break;
                    case 'edit-strategy-14':
                        url = siteUrl + 'img/icon/measure_impact@2x.png';
                        break;
                    case 'edit-strategy-19':
                        url = siteUrl + 'img/icon/raise_awareness@2x.png';
                        break;
                    default:
                        url = '';
                }

                if (url || url !== '') {
                    tmpImg.src= url;
                    $(tmpImg).one('load',function(){
                        var orgWidth = tmpImg.width / 2;
                        iconBox.eq(i).append('<img src="'+ url +'" width ="'+ orgWidth +'" alt="">');
                    });
                }
            });

        }

        //for new btn
        if ($('.views-exposed-widgets')) {
            var selectBox = $('.views-exposed-widget').not('.views-widget-filter-combine').find('.views-widget'),
                btn = '<div class="views-widget-btn-box"><span class="btn blue-inverse">Apply</span> <span class="widget-cancel">Cancel</span> </div>';

            selectBox.append(btn);
        }
    });

    //open search list
    $('.widget-label-name').on('click', function () {
        if ($(this).hasClass('widget-label-name')) {
            // var dann = $.map( $('input[type="checkbox"]:checked'), function(el){
            //     return $(el).val();
            // });
            // alert(dann);

            var allBox = $(this).parents('.views-exposed-widgets'),
                AllParent = allBox.find('.views-exposed-widget'),
                AllWidget = AllParent.not('.views-widget-filter-combine').find('.views-widget'),
                parent = $(this).parents('.views-exposed-widget'),
                widget = $(this).next(),
                widgetInputList = widget.find('input[type="checkbox"]'),
                listBox = parent.find('.views-widget');

                if (parent.hasClass('active')) {
                    parent.removeClass('active');
                    widget.slideUp(350);
                } else {
                    AllParent.removeClass('active');
                    AllWidget.slideUp(350);
                    parent.addClass('active');
                    widget.slideDown(350);
                    if ($(window).width() < 1024) {
                        $('body').css('overflow', 'hidden');

                    } else {
                        $('body').css('overflow', '');
                    }
                }

            arrayCheck = $.map( widgetInputList , function(el){
                return $(el).is(':checked') ? 1 : 0;
            });
        }
    });

    //close search list
    $(document).on('click', function (e) {
        var div = $('.checkbox-count.active');

        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $('.views-exposed-widget.active .views-widget').slideUp(350);
            $('.views-exposed-widget.active').removeClass('active');
        }
    });
    //close search list
    $(document).on('click', '.widget-cancel' , function() {
        var widget = $(this).parents('.views-exposed-widget').find('.views-widget'),
            parent = $(this).parents('.views-exposed-widget'),
            boxCount = parent.find('.count'),
            widgetInputList = widget.find('input[type="checkbox"]'),
            ar = arrayCheck,
            count = 0;

            ar.forEach( function(v, i, ar) {
                if (ar[i] == 1) {
                    widgetInputList.eq(i).prop( 'checked', true );
                    count++;
                } else {
                    console.log('false');
                    widgetInputList.eq(i).prop( 'checked', false );
                }
            });

            if (count > 0) {
                boxCount.text(count);
            } else {
                boxCount.text('');
            }

            parent.removeClass('active');
            widget.slideUp(350);
            $('body').css('overflow', '');
    });
    //submit search list
    $(document).on('click', '.views-widget-btn-box .btn' , function() {
        var parentBtn = $(this).parents('.views-exposed-widgets').find('.views-submit-button input'),
            widget = $(this).parents('.views-exposed-widget').find('.views-widget'),
            parent = $(this).parents('.views-exposed-widget');

            $('body').css('overflow', '');
            parent.removeClass('active');
            widget.slideUp(350);
            parentBtn.click();
    });

    //checkbox count
    if ($('.checkbox-count').length) {
        $(window).on('load', function () {
            var checkboxParent = $('.checkbox-count');

                checkboxParent.each(function (i) {
                    var count = checkboxParent.eq(i).find('input[type=checkbox]:checked').length,
                        countSpan = checkboxParent.eq(i).find('.count');

                    if (count > 0) {
                        countSpan.text(count);
                    } else {
                        countSpan.text('');
                    }
                })
        });

        $('input[type="checkbox"]').change(function() {
            var checkboxParent = $(this).parents('.form-item'),
                widgetBox = checkboxParent.parents('.views-exposed-widget'),
                boxCount = widgetBox.find('.count'),
                checkboxCount = checkboxParent.find('input[type=checkbox]:checked').length;

            console.log(checkboxCount);
            if (checkboxCount > 0) {
                boxCount.text(checkboxCount);
            } else {
                boxCount.text('');
            }
        });
    }
});