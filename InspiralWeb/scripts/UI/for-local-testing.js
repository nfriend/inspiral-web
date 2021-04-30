/// <reference path='../definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var UI;
    (function (UI) {
        'use strict';
        function createNewAlbum() {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                headers: {
                    Authorization: 'Client-ID ' + InspiralWeb.imgurClientID
                },
                url: 'https://api.imgur.com/3/album/',
                success: function (e) {
                    console.log(e);
                }
            });
        }
        UI.createNewAlbum = createNewAlbum;
        function batchTransfer(start, count, repeatDuration) {
            if (repeatDuration) {
                console.log('Waiting ' + repeatDuration + ' ms...');
            }
            setTimeout(function () {
                console.log('Beginning upload process for images ' + start + ' to ' + (start + count));
                $.ajax({
                    type: 'GET',
                    url: 'http://nathanfriend.com/inspiral-web/getallimagenames.php',
                    data: {
                        'p': 1,
                        'i': 10000
                    },
                    success: function (data) {
                        var images = data.images;
                        var fileCount = parseInt(data.fileCount, 10) || 0;
                        var pageCount = Math.ceil(fileCount / 1000);
                        var counter = -1;
                        for (var image in images) {
                            if (images.hasOwnProperty(image)) {
                                counter++;
                                if (counter < start || counter > (start + count))
                                    continue;
                                $.ajax({
                                    type: 'POST',
                                    async: false,
                                    headers: {
                                        Authorization: 'Client-ID ' + InspiralWeb.imgurClientID
                                    },
                                    url: 'https://api.imgur.com/3/image',
                                    data: {
                                        type: 'URL',
                                        image: 'http://nathanfriend.com/inspiral-web/' + images[image].imagepath,
                                        album: InspiralWeb.imgurAlbumDeleteHash,
                                        title: InspiralWeb.Utility.convertToHumanReadableDate(new Date(images[image].timestamp * 1000))
                                    },
                                    dataType: 'json',
                                    success: function (e) {
                                        console.log('successfully uploaded http://nathanfriend.com/inspiral-web/' + images[image].imagepath);
                                    },
                                    error: function (e) {
                                        console.error('failed to upload ' + 'http://nathanfriend.com/inspiral-web/' + images[image].imagepath);
                                    }
                                });
                            }
                        }
                        console.log('Done!');
                        if (repeatDuration) {
                            setTimeout(function () {
                                batchTransfer(start + count, count, repeatDuration);
                            }, repeatDuration);
                        }
                    },
                    dataType: 'JSON'
                });
            }, repeatDuration || 0);
        }
        UI.batchTransfer = batchTransfer;
        function getPaginatedResults() {
            $.ajax({
                type: 'GET',
                headers: {
                    Authorization: 'Client-ID ' + InspiralWeb.imgurClientID
                },
                dataType: 'json',
                url: 'https://api.imgur.com/3/album/' + InspiralWeb.imgurAlbumName + '/images',
                success: function (response) {
                    console.log(response);
                },
                error: function (response) {
                    console.log(response);
                }
            });
        }
        UI.getPaginatedResults = getPaginatedResults;
        function deleteImage() {
            var imageToDelete = window.imageToDelete || 'testing';
            $.ajax({
                type: 'POST',
                url: 'http://dev.nathanfriend.com/inspiral-web/deleteimage.php',
                data: {
                    deletehash: imageToDelete
                },
                success: function (response) {
                    console.log(response);
                },
                error: function (response) {
                    console.log(response);
                }
            });
        }
        UI.deleteImage = deleteImage;
        function saveImage() {
            $.ajax({
                type: 'POST',
                url: 'http://dev.nathanfriend.com/inspiral-web/saveimage.php',
                data: {
                    imgur_id: 'imgur_id',
                    title: 'title',
                    description: 'description',
                    datetime: InspiralWeb.Utility.convertToMysqlFriendlyString(new Date()),
                    type: 'type',
                    animated: true,
                    width: 1,
                    height: 2,
                    size: 3,
                    views: 4,
                    bandwidth: 5,
                    deletehash: 'deletehash',
                    name: 'name',
                    section: 'section',
                    link: 'link',
                    gifv: 'gifv',
                    mp4: 'mp4',
                    webm: 'webm',
                    looping: true,
                    favorite: true,
                    nsfw: true,
                    vote: 'vote',
                    account_url: 'account_url'
                },
                success: function (response) {
                    console.log(response);
                },
                error: function (response) {
                    console.log(response);
                }
            });
        }
        UI.saveImage = saveImage;
        function getImages(page, perPage) {
            $.ajax({
                type: 'POST',
                url: 'http://dev.nathanfriend.com/inspiral-web/getimages.php',
                dataType: 'JSON',
                data: {
                    page: page,
                    perPage: perPage
                },
                success: function (response) {
                    console.log(response);
                },
                error: function (response) {
                    console.log(response);
                }
            });
        }
        UI.getImages = getImages;
        function copyAllCurrentImagesToDB() {
            return;
            $.ajax({
                type: 'GET',
                headers: {
                    Authorization: 'Client-ID 4d93fc08cc27d37'
                },
                dataType: 'json',
                url: InspiralWeb.isDev ? 'https://api.imgur.com/3/album/T6EZc/images' : 'https://api.imgur.com/3/album/2R9z5/images',
                success: function (response) {
                    var images = response.data;
                    var fileCount = images.length;
                    for (var i = 0; i < images.length; i++) {
                        var image = images[i];
                        image.datetime = InspiralWeb.Utility.convertToMysqlFriendlyString(new Date(image.datetime * 1000));
                        image.imgur_id = image.id;
                        $.ajax({
                            type: 'POST',
                            async: false,
                            url: 'http://dev.nathanfriend.com/inspiral-web/saveimage.php',
                            data: image,
                            success: function (response) {
                                console.log(response);
                            },
                            error: function (response) {
                                console.log(response);
                            }
                        });
                    }
                    //for (var i = startCount; i < startCount + itemsPerPage; i++) {
                    //    if (i >= images.length)
                    //        break;
                    //    var image = images[i];
                    //    var row = $('<div class="col-lg-2 col-md-3 col-sm-4 col-xs-6"></div>');
                    //    var link = $('<a href="' + image.link + '" imgur-id="' + image.id + '" class="swipebox image-thumbnail" title="' + image.title + '">');
                    //    var img = $('<img class="img-responsive" src="' + getThumbnailPath(image.link) + '" alt="' + image.title + '">');
                    //    img.appendTo(link);
                    //    link.appendTo(row);
                    //    row.appendTo('.image-container');
                    //}
                    //$('.image-container').children().each(function (index) {
                    //    var classToAdd = '';
                    //    if ((index + 1) % 2 === 0) {
                    //        classToAdd += ' visible-xs-block';
                    //    }
                    //    if ((index + 1) % 3 === 0) {
                    //        classToAdd += ' visible-sm-block';
                    //    }
                    //    if ((index + 1) % 4 === 0) {
                    //        classToAdd += ' visible-md-block';
                    //    }
                    //    if ((index + 1) % 6 === 0) {
                    //        classToAdd += ' visible-lg-block';
                    //    }
                    //    if (classToAdd !== '') {
                    //        $(this).after('<div class="cleared' + classToAdd + '"></div>');
                    //    }
                    //});
                    //if (pageCount > 1) {
                    //    var i = itemsPerPage
                    //    if (itemsPerPage == 72) {
                    //        i = null;
                    //    }
                    //    addPaginationLink('<span class="fa fa-chevron-left pagination-icon pagination-icon-left"></span><span class="pagination-label">Previous<span>', pageNumber != 1, pageNumber - 1, i)
                    //    if (pageNumber > 5) {
                    //        addPaginationLink(1, true, 1, i, 1);
                    //    }
                    //    for (var j = 1; j <= pageCount; j++) {
                    //        if (Math.abs(j - pageNumber) > 4)
                    //            continue;
                    //        addPaginationLink(j, pageNumber != j, j, i)
                    //    }
                    //    if (pageNumber <= pageCount - 5)
                    //        addPaginationLink(pageCount, true, pageCount, i, -1);
                    //    addPaginationLink('<span class="pagination-label">Next</span><span class="fa fa-chevron-right pagination-icon pagination-icon-right"></span>', pageNumber != pageCount, pageNumber + 1, i)
                    //}
                    //if (QueryString.admin) {
                    //    $('.image-thumbnail').each(function () {
                    //        var $that = $(this);
                    //        $that.click(function () { return false; })
                    //        $that.click(function () {
                    //            deleteImage($that.attr('imgur-id'));
                    //        });
                    //    });
                    //}
                },
                error: function (response) {
                    console.log("failed!");
                }
            });
        }
        UI.copyAllCurrentImagesToDB = copyAllCurrentImagesToDB;
    })(UI = InspiralWeb.UI || (InspiralWeb.UI = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=for-local-testing.js.map