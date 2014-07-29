/// <reference path='../definitions/references.d.ts' />

module Spirograph.UI {
    'use strict';

    // download canvas as image functionality... not fully working yet
    $('#download-link').on('click', (ev) => {
        var link = ev.currentTarget;
        var data = (<HTMLCanvasElement> document.getElementById('spirograph-canvas')).toDataURL();
        (<any>ev.currentTarget).download = 'spirograph.png';
        window.location.href = data;
    });
} 