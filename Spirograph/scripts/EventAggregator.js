/// <reference path='definitions/references.d.ts' />
'use strict';
var Spirograph;
(function (Spirograph) {
    (function (EventAggregator) {
        var subscribers;

        function subscribe(eventName, callback) {
            if (!(eventName in subscribers)) {
                subscribers[eventName] = new Array();
            }
            subscribers[eventName].push(callback);
        }
        EventAggregator.subscribe = subscribe;

        function publish(eventName, parameter) {
            if (eventName in subscribers) {
                subscribers[eventName].forEach(function (subscriber) {
                    if (parameter) {
                        subscriber(parameter);
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
