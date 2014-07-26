/// <reference path='definitions/references.d.ts' />
var Spirograph;
(function (Spirograph) {
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
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                params[_i] = arguments[_i + 1];
            }
            if (eventName in subscribers) {
                subscribers[eventName].forEach(function (subscriber) {
                    if (params.length > 0) {
                        subscriber.apply(_this, params);
                    } else {
                        subscriber();
                    }
                });
            }
        }
        EventAggregator.publish = publish;
    })(Spirograph.EventAggregator || (Spirograph.EventAggregator = {}));
    var EventAggregator = Spirograph.EventAggregator;
})(Spirograph || (Spirograph = {}));
//# sourceMappingURL=EventAggregator.js.map
