/// <reference path='definitions/references.d.ts' />
'use strict';

module Spirograph.EventAggregator {

    var subscribers: { [event: string]: Array<(...params: any[]) => void>; } = {};

    export function subscribe(eventName: string, callback: (...params: any[]) => void) {
        if (!(eventName in subscribers)) {
            subscribers[eventName] = new Array<(...params: any[]) => void>();
        }
        subscribers[eventName].push(callback);
    }

    export function publish(eventName: string, ...params: any[]) {
        if (eventName in subscribers) {
            subscribers[eventName].forEach((subscriber) => {
                if (params.length > 0) {
                    subscriber.apply(this, params);
                } else {
                    subscriber();
                }
            });
        }
    }
}