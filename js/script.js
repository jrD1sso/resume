/*global $, jQuery, alert, console*/
$(function () {
    'use strict';
// read more
    $('.post-container .post-text').each(function () {
        if ((this).innerText.length >= 410) {
            var $copy = $(this).clone(),
                $postTxt = $copy.text().slice(0, 410).trim(),
                $link = "<a class='read-more'> More...</a>";
            $(this).hide().parents('.post-container').find('.post-text-mini').show().append($postTxt).append($link);
        }
    });
    
// post focus
    $('.post .post-img, .post-text-mini .read-more').on("click", function () {
        var $showPost = $(this).parents('.post').clone();
        $showPost.find('.post-text-mini').remove();
        $showPost.find('.post-text').fadeIn();
        $("#show-post-modal").find('.modal-content').children().remove();
        $("#show-post-modal").find('.modal-content').append($showPost);
        $("#show-post-modal").modal('show');
        $('#show-post-modal .gotCoffee').on("click", function () {
            $(this).toggleClass('liked');
        });
    });
    
// remove the post after closing the post modal
    $("#show-post-modal").on("click", function () {
        setTimeout(function () {
            if (!$("#show-post-modal").hasClass('show')) {
                $("#show-post-modal").find('.modal-content').children().remove();
            }
        }, 200);
    });

// Masonry
    var $myMasonry = $('#myBlog #my-posts').masonry({itemSelector: '.post-container', percentPosition: true, gutter: 15});
    
// myBlog Filter
    $('#myBlog #posts-types > li').on('click', function () {
        var $selected = $(this);
        if ($selected.hasClass("active")) {
            return;
        } else if ($selected.data('value') === "all") {
            $('#myBlog #my-posts .post-container').fadeIn();
            $myMasonry.masonry('destroy');
            $myMasonry.masonry({percentPosition: true, gutter: 15});
            $('#myBlog .post-container .post-type').each(function () {
                var $selected = $(this),
                    $getClass = $(this).parents(".post-container").attr('data-value').slice(0,-5);
                $(this).addClass('icon-' + $getClass);
            });
        } else {
            $('#myBlog #my-posts .post-container').hide();
            $('#myBlog #my-posts .post-container[data-value="' + $selected.data('value') + '"]').fadeIn().find('.post-type').removeClass('icon-' + $selected.data('value').slice(0,-5));
            $myMasonry.masonry('destroy');
            $('#myBlog #my-posts').masonry({itemSelector: '.post-container[data-value="' + $selected.data('value') + '"]', percentPosition: true, gutter: 15});
        }
        $selected.addClass('active').siblings().removeClass('active');
    });
        
// myBlog fixed sidebar
    var fixedAside = function () {
        if ($('#myBlog #widthAbove-md').width() > 0) {
            $("#myBlog aside").trigger("sticky_kit:detach");
        } else if ($('#myBlog #widthAbove-md').width() <= 0) {
            $("#myBlog aside").stick_in_parent({offset_top: 0});
        }
    };
    fixedAside();
    $(window).on("resize", function () {
        fixedAside();
    });
        
// Reload Masonry
    var reloadMyMasonry = function () {
        if ($('#myBlog #posts-types li[data-value=all]').hasClass('active') && $(window).scrollTop() < 10) {
            $myMasonry.masonry('destroy');
            $myMasonry.masonry({percentPosition: true, gutter: 15});
        }
    };
    $('#myBlog').ready(setTimeout(reloadMyMasonry, 2000));
    $('#myBlog').ready(setTimeout(reloadMyMasonry, 4000));
//    $('#myBlog').ready(setTimeout(reloadMyMasonry, 7000));
    
});