/// <reference path='definitions/references.d.ts' />
var InspiralWeb;
(function (InspiralWeb) {
    var EventAggregator;
    (function (EventAggregator) {
        'use strict';
        var subscribers = {};
        function subscribe(eventName, callback) {
            if (!(eventName in subscribers)) {
                subscribers[eventName] = new Array();
            }
            subscribers[eventName].push(callback);
        }
        EventAggregator.subscribe = subscribe;
        function publish(eventName) {
            var _this = this;
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            if (eventName in subscribers) {
                subscribers[eventName].forEach(function (subscriber) {
                    if (params.length > 0) {
                        subscriber.apply(_this, params);
                    }
                    else {
                        subscriber();
                    }
                });
            }
        }
        EventAggregator.publish = publish;
    })(EventAggregator = InspiralWeb.EventAggregator || (InspiralWeb.EventAggregator = {}));
})(InspiralWeb || (InspiralWeb = {}));
//# sourceMappingURL=EventAggregator.js.map