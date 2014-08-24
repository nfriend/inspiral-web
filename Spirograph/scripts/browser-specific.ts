/// <reference path='definitions/references.d.ts' />

module Spirograph {
    'use strict';

    export enum Browser {
        Chrome, IE, Firefox, Safari, Opera, Other
    }

    // some nasty stuff to pull the browser type from the user agent string
    export var browser: { browser: Browser; version: number } = getBrowserInfo();

    function getBrowserInfo() {
        var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return convertType({ browser: 'IE ', version: (tem[1] || '') });
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR\/(\d+)/)
            if (tem != null) return convertType({ browser: 'Opera ', version: tem[1] });
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return convertType({ browser: M[0], version: M[1] });
    }

    // only convert to the types we need to know about throughout the app
    function convertType(browserInfo: { browser: string; version: string }) {
        var browserType: Browser = Browser.Other;
        var versionNumber: number = 0;

        switch (browserInfo.browser.trim()) {
            case 'Chrome': {
                browserType = Browser.Chrome;
                break;
            }
            case 'Safari': {
                browserType = Browser.Safari;
                break;
            }
            case 'Opera': {
                browserType = Browser.Opera;
                break;
            }
            case 'Firefox': {
                browserType = Browser.Firefox;
                break;
            }
        }

        versionNumber = parseFloat(browserInfo.version);

        return {
            browser: browserType,
            version: versionNumber
        }
    }

}   