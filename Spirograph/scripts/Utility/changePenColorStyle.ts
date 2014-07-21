/// <reference path='../definitions/references.d.ts' />
'use strict';

module Spirograph.Utility {
    export function changePenColorStyle(color: string) {
        $('.injected-style').remove();
        var div = $('<style class="injected-style">.spirograph .gear .gear-hole:hover { fill: ' + color + '; }</style>').appendTo("body"); 
    }
} 