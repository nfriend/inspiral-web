var isDev = document.location.hostname === 'localhost' || document.location.hostname === '127.0.0.1' || document.location.hostname.indexOf('dev.') !== -1;

(function ($) {

    function getThumbnailPath(imagepath) {
        return imagepath.replace('.jpg', 'm.jpg').replace('.png', 'm.png').replace('.JPG', 'm.JPG').replace('.PNG', 'm.PNG');
    }

    function addPaginationLink(text, isEnabled, p, i, addEllipsis) {
        var $paginationLinkContainer = $('<div class="pagination-link">');
        var href = './?p=' + p;
        if (i) {
            href += ('&i=' + i);
        }
        var $paginationLinkElement = $('<a class="btn btn-default" href="' + href + '">');
        $paginationLinkElement.html(text);

        if (!isEnabled) {
            $paginationLinkElement.attr('disabled', true);
        }

        $paginationLinkContainer.html($paginationLinkElement)
        $('.pagination-container').append($paginationLinkContainer);

        if (addEllipsis === 1) {
            $paginationLinkContainer.after('<div class="ellipsis-container"><i class="fa fa-ellipsis-h fa-2x"></i></div>');
        } else if (addEllipsis === -1) {
            $paginationLinkContainer.before('<div class="ellipsis-container"><i class="fa fa-ellipsis-h fa-2x"></i></div>');
        }
    }

    var pageNumber = 1;
    if (QueryString.p && !(isNaN(parseInt(QueryString.p, 10))) && parseInt(QueryString.p, 10) > 0) {
        pageNumber = Math.round(parseInt(QueryString.p, 10));
    }

    var itemsPerPage = 72;
    if (QueryString.i && !(isNaN(parseInt(QueryString.i, 10))) && parseInt(QueryString.i, 10) > 0) {
        itemsPerPage = Math.round(parseInt(QueryString.i, 10));
    }

    function deleteImage(imgurId) {
        console.log('deleting ' + imgurId);
        $.ajax({
            type: 'DELETE',
            headers: {
                Authorization: 'Client-ID 4d93fc08cc27d37',
            },
            url: (isDev ? 'https://api.imgur.com/3/album/zYKofZIZqwwRrta' : 'https://api.imgur.com/3/album/splQJocFCJf7Rky') + '/remove_images?ids=' + imgurId,
            contentType: 'text',
            xhrFields: {
                withCredentials: false
            },
            success: function (data) {
                $('.image-thumbnail[imgur-id="' + imgurId + '"]').find('img').attr('src', 'deleted.png');
            }
        });
    }

    $.ajax({
        type: 'GET',
        headers: {
            Authorization: 'Client-ID 4d93fc08cc27d37'
        },
        dataType: 'json',
        url: isDev ? 'https://api.imgur.com/3/album/T6EZc/images' : 'https://api.imgur.com/3/album/2R9z5/images',
        success: function (response) {

            $('#waiting-overlay').hide();

            var images = response.data.reverse();
            var fileCount = images.length
            var pageCount = Math.ceil(fileCount / itemsPerPage);
            var startCount = (pageNumber - 1) * itemsPerPage;

            for (var i = startCount; i < startCount + itemsPerPage; i++) {
                if (i >= images.length)
                    break;

                var image = images[i];
                var row = $('<div class="col-lg-2 col-md-3 col-sm-4 col-xs-6"></div>');
                var link = $('<a href="' + image.link + '" imgur-id="' + image.id + '" class="swipebox image-thumbnail" title="' + image.title + '">');
                var img = $('<img class="img-responsive" src="' + getThumbnailPath(image.link) + '" alt="' + image.title + '">');
                img.appendTo(link);
                link.appendTo(row);
                row.appendTo('.image-container');
            }

            $('.image-container').children().each(function (index) {
                var classToAdd = '';
                if ((index + 1) % 2 === 0) {
                    classToAdd += ' visible-xs-block';
                }
                if ((index + 1) % 3 === 0) {
                    classToAdd += ' visible-sm-block';
                }
                if ((index + 1) % 4 === 0) {
                    classToAdd += ' visible-md-block';
                }
                if ((index + 1) % 6 === 0) {
                    classToAdd += ' visible-lg-block';
                }

                if (classToAdd !== '') {
                    $(this).after('<div class="cleared' + classToAdd + '"></div>');
                }
            });

            if (pageCount > 1) {
                var i = itemsPerPage
                if (itemsPerPage == 72) {
                    i = null;
                }

                addPaginationLink('<span class="fa fa-chevron-left pagination-icon pagination-icon-left"></span><span class="pagination-label">Previous<span>', pageNumber != 1, pageNumber - 1, i)

                if (pageNumber > 5) {
                    addPaginationLink(1, true, 1, i, 1);
                }

                for (var j = 1; j <= pageCount; j++) {

                    if (Math.abs(j - pageNumber) > 4)
                        continue;

                    addPaginationLink(j, pageNumber != j, j, i)
                }

                if (pageNumber <= pageCount - 5)
                    addPaginationLink(pageCount, true, pageCount, i, -1);

                addPaginationLink('<span class="pagination-label">Next</span><span class="fa fa-chevron-right pagination-icon pagination-icon-right"></span>', pageNumber != pageCount, pageNumber + 1, i)

            }

            if (QueryString.admin) {
                $('.image-thumbnail').each(function () {
                    var $that = $(this);
                    $that.click(function () { return false; })
                    $that.click(function () {
                        deleteImage($that.attr('imgur-id'));
                    });
                });
            }
        },
        error: function(response) {
            location.reload(true);
        },
        dataType: 'JSON'
    });

    if (!(QueryString.admin)) {
        $('.swipebox').swipebox({
            hideBarsDelay: 10000
        });
    }

})(jQuery);

