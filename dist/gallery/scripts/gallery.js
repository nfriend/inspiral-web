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

    function formatImagePath(imagepath) {
        return '../' + imagepath;
    }

    function getThumbnail(imagepath) {
        return imagepath.replace('.png', '_thumb.jpg');
    }

    $.ajax({
        type: 'POST',
        url: '../getallimagenames.php',
        success: function (images) {
            for (var image in images) {
                if (images.hasOwnProperty(image)) {
                    var row = $('<div class="col-lg-2 col-md-3 col-sm-4 col-xs-6"></div>');
                    var link = $('<a href="' + formatImagePath(images[image].imagepath) + '" class="swipebox" title="' + formatDate(images[image].timestamp) + '">');
                    var img = $('<img class="img-responsive" src="' + formatImagePath(getThumbnail(images[image].imagepath)) + '" alt="' + formatDate(images[image].timestamp) + '">');
                    img.appendTo(link);
                    link.appendTo(row);
                    row.prependTo('.image-container');
                }
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
        },
        dataType: 'JSON'
    });

    $('.swipebox').swipebox({
        hideBarsDelay: 10000
    });

})(jQuery);