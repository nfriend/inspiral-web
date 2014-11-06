// from http://stackoverflow.com/a/979995/1063392
var QueryString = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], pair[1]];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
}();

var isDev = document.location.hostname === 'localhost' || document.location.hostname === '127.0.0.1';

isDev = false;

(function ($) {

    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function formatDate(unixTimestamp) {
        var date = new Date(unixTimestamp * 1000);
        var output = [];
        output.push(monthNames[date.getMonth()])
        output.push(date.getDate() + ',');
        var hours = date.getHours() % 12;
        hours = hours === 0 ? 12 : hours;
        var minutes = (date.getMinutes());
        minutes = minutes < 10 ? '0' + minutes : minutes;
        output.push(hours + ':' + minutes);
        output.push(date.getHours() < 12 ? "AM" : "PM")
        return output.join(' ');
    }

    function getThumbnailPath(imagepath) {
        return imagepath.replace('.jpg', 'm.jpg');
    }

    function addPaginationLink(text, isEnabled, p, i) {
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
                row.prependTo('.image-container');
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

                addPaginationLink('<span class="glyphicon glyphicon-chevron-left pagination-icon pagination-icon-left"></span>Previous', pageNumber != 1, pageNumber - 1, i)
                for (var j = 1; j <= pageCount; j++) {
                    addPaginationLink(j, pageNumber != j, j, i)
                }
                addPaginationLink('Next<span class="glyphicon glyphicon-chevron-right pagination-icon pagination-icon-right"></span>', pageNumber != pageCount, pageNumber + 1, i)
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
        dataType: 'JSON'
    });

    if (!(QueryString.admin)) {
        $('.swipebox').swipebox({
            hideBarsDelay: 10000
        });
    }

})(jQuery);

