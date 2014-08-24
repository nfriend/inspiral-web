/// <reference path='definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
    'use strict';

    (function (Browser) {
        Browser[Browser["Chrome"] = 0] = "Chrome";
        Browser[Browser["IE"] = 1] = "IE";
        Browser[Browser["Firefox"] = 2] = "Firefox";
        Browser[Browser["Safari"] = 3] = "Safari";
        Browser[Browser["Opera"] = 4] = "Opera";
        Browser[Browser["Other"] = 5] = "Other";
    })(Spirograph.Browser || (Spirograph.Browser = {}));
    var Browser = Spirograph.Browser;

    // some nasty stuff to pull the browser type from the user agent string
    Spirograph.browser = getBrowserInfo();

    function getBrowserInfo() {
        var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return convertType({ browser: 'IE ', version: (tem[1] || '') });
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR\/(\d+)/);
            if (tem != null)
                return convertType({ browser: 'Opera ', version: tem[1] });
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null)
            M.splice(1, 1, tem[1]);
        return convertType({ browser: M[0], version: M[1] });
    }

    // only convert to the types we need to know about throughout the app
    function convertType(browserInfo) {
        var browserType = 5 /* Other */;
        var versionNumber = 0;

        switch (browserInfo.browser.trim()) {
            case 'Chrome': {
                browserType = 0 /* Chrome */;
                break;
            }
            case 'Safari': {
                browserType = 3 /* Safari */;
                break;
            }
            case 'Opera': {
                browserType = 4 /* Opera */;
                break;
            }
            case 'Firefox': {
                browserType = 2 /* Firefox */;
                break;
            }
        }

        versionNumber = parseFloat(browserInfo.version);

        return {
            browser: browserType,
            version: versionNumber
        };
    }
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=browser-specific.js.map
