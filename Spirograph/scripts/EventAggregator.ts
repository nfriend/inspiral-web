/// <reference path='definitions/references.d.ts' />
'use strict';

module Spirograph.EventAggregator {

    var subscribers: { [event: string]: Array<(...param: any[]) => void>; };

    export function subscribe(eventName: string, callback: (...param: any[]) => void) {
        if (!(eventName in subscribers)) {
            subscribers[eventName] = new Array<(...param: any[]) => void>();
        }
        subscribers[eventName].push(callback);
    }

    export function publish(eventName: string, parameter?: any) {
        if (eventName in subscribers) {
            subscribers[eventName].forEach((subscriber) => {
                if (parameter) {
                    subscriber(parameter);
                } else {
                    subscriber();
                }
            });
        }
    }
}