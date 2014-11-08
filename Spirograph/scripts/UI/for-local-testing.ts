/// <reference path='../definitions/references.d.ts' />

module Spirograph.UI {
    'use strict';

    export function createNewAlbum() {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            headers: {
                Authorization: 'Client-ID ' + Spirograph.imgurClientID
            },
            url: 'https://api.imgur.com/3/album/',
            success: (e) => {
                console.log(e);
            }
        });
    }

    export function batchTransfer(start: number, count: number, repeatDuration?: number) {

        if (repeatDuration) {
            console.log('Waiting ' + repeatDuration + ' ms...');
        }

        setTimeout(() => {
            console.log('Beginning upload process for images ' + start + ' to ' + (start + count));

            $.ajax({
                type: 'GET',
                url: 'http://nathanfriend.com/inspirograph/getallimagenames.php',
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
                                    Authorization: 'Client-ID ' + Spirograph.imgurClientID
                                },
                                url: 'https://api.imgur.com/3/image',
                                data: {
                                    type: 'URL',
                                    image: 'http://nathanfriend.com/inspirograph/' + images[image].imagepath,
                                    album: Spirograph.imgurAlbumDeleteHash,
                                    title: Utility.convertToHumanReadableDate(new Date(images[image].timestamp * 1000)),
                                },
                                dataType: 'json',
                                success: (e) => {
                                    console.log('successfully uploaded http://nathanfriend.com/inspirograph/' + images[image].imagepath);
                                },
                                error: (e) => {
                                    console.error('failed to upload ' + 'http://nathanfriend.com/inspirograph/' + images[image].imagepath);
                                }
                            });
                        }
                    }

                    console.log('Done!');

                    if (repeatDuration) {

                        setTimeout(() => {
                            batchTransfer(start + count, count, repeatDuration);
                        }, repeatDuration);
                    }
                },
                dataType: 'JSON'
            });
        }, repeatDuration || 0);
    }

    export function getPaginatedResults() {
        $.ajax({
            type: 'GET',
            headers: {
                Authorization: 'Client-ID ' + imgurClientID
            },
            dataType: 'json',
            url:  'https://api.imgur.com/3/album/' + Spirograph.imgurAlbumName + '/images',
            success: function (response) {
                console.log(response);
            },
            error: function (response) {
                console.log(response);
            },
        });
    }
} 