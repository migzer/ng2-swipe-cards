/**
 * @license angular-library-starter
 * MIT license
 */

import { Component, Directive, ElementRef, EventEmitter, HostListener, Input, NgModule, Output, Renderer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CardComponent {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.fixed = false;
        this._orientation = 'xy';
        this.released = false;
        this.onRelease = new EventEmitter();
        this.onSwipe = new EventEmitter();
        this.onAbort = new EventEmitter();
        this.direction = { x: 0, y: 0 };
        this.element = el.nativeElement;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set orientation(value) {
        this._orientation = value || "xy";
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set callDestroy(value) {
        this._callDestroy = value || new EventEmitter();
        this.initCallDestroy();
    }
    /**
     * @param {?} params
     * @return {?}
     */
    translate(params) {
        if (!this.fixed && !this.released) {
            this.renderer.setElementStyle(this.element, "transition", "transform " + (params.time || 0) + "s ease");
            this.renderer.setElementStyle(this.element, "webkitTransform", "translate3d(" +
                (params.x && (!this._orientation || this._orientation.indexOf("x") != -1) ? (params.x) : 0) +
                "px, " +
                (params.y && (!this._orientation || this._orientation.indexOf("y") != -1) ? (params.y) : 0) +
                "px, 0) rotate(" + (params.rotate || 0) + "deg)");
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onSwipeCb(event) {
        this.direction.x = event.deltaX > 0 ? 1 : -1;
        this.direction.y = event.deltaY > 0 ? 1 : -1;
        this.translate({
            x: event.deltaX,
            y: event.deltaY
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onAbortCb(event) {
        this.translate({
            x: 0,
            y: 0,
            rotate: 0,
            time: 0.2
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._callDestroy = this._callDestroy || new EventEmitter();
        this.initCallDestroy();
    }
    /**
     * @return {?}
     */
    initCallDestroy() {
        this._callDestroy.subscribe((delay) => {
            this.destroy(delay);
        });
    }
    /**
     * @param {?=} delay
     * @return {?}
     */
    destroy(delay = 0) {
        setTimeout(() => {
            this.element.remove();
        }, 200);
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (this.element.parentElement) {
            let /** @type {?} */ height = this.element.parentElement.clientHeight;
            let /** @type {?} */ width = this.element.parentElement.clientWidth;
            this.renderer.setElementStyle(this.element, "height", height + 'px');
            this.renderer.setElementStyle(this.element, "width", width + 'px');
            this.releaseRadius = {
                x: width / 4,
                y: height / 4
            };
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onPan(event) {
        if (!this.fixed && !this.released) {
            this.onSwipeCb(event);
            if (this.onSwipe) {
                this.onSwipe.emit(event);
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onPanEnd(event) {
        if (!this.fixed && !this.released) {
            if ((this._orientation == "x" && (this.releaseRadius.x < event.deltaX || this.releaseRadius.x * -1 > event.deltaX)) ||
                (this._orientation == "y" && (this.releaseRadius.y < event.deltaY || this.releaseRadius.y * -1 > event.deltaY)) ||
                ((this.releaseRadius.x < event.deltaX || this.releaseRadius.x * -1 > event.deltaX) ||
                    (this.releaseRadius.y < event.deltaY || this.releaseRadius.y * -1 > event.deltaY))) {
                if (this.onRelease) {
                    //this.released = true;
                    this.onRelease.emit(event);
                    this.translate({
                        x: 0,
                        y: 0,
                        rotate: 0,
                        time: 0.2
                    });
                }
            }
            else {
                this.onAbortCb(event);
                if (this.onAbort) {
                    this.onAbort.emit(event);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._callDestroy) {
            this._callDestroy.unsubscribe();
        }
    }
}
CardComponent.decorators = [
    { type: Component, args: [{
                template: '<ng-content></ng-content>',
                selector: 'sc-card',
                styles: [`:host {
      transition: transform 1s ease;
      position: absolute;
      border-radius: 2px;
      border: 1px solid white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;
      transition: transform 0.2s ease;
      background-color: white;
      touch-action: none !important;
    }
    :host(.card-heap) {
      transition: transform 1s ease;
      display: block;
      position: absolute;
      background-color: white;
      box-shadow: 0 0 0 rgba(0, 0, 0, 0) !important;
      transform: perspective(400px) translate3d(0, 30px, -30px);
      visibility: hidden;
    }

    :host(.card-heap):nth-child(1) {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;
      z-index:3;
      visibility: visible;
      transform: perspective(400px) translate3d(0, 0px, 0px);
    }
    :host(.card-heap):nth-child(2) {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;
      z-index:2;
      visibility: visible;
      transform: perspective(400px) translate3d(0, 30px, -30px);
    }
    :host(.card-heap):nth-child(3) {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;
      z-index:1;
      visibility: visible;
      transform: perspective(400px) translate3d(0, 60px, -60px);
    }

    :host .card-overlay {
      transform: translateZ(0);
      opacity: 0;
      border-radius: 2px;
      position: absolute;
      width: 100%;
      height: 10px;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      color: white;
    }
`]
            },] },
];
/** @nocollapse */
CardComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer, },
];
CardComponent.propDecorators = {
    "fixed": [{ type: Input },],
    "orientation": [{ type: Input, args: ['orientation',] },],
    "callDestroy": [{ type: Input, args: ['callDestroy',] },],
    "onRelease": [{ type: Output },],
    "onSwipe": [{ type: Output },],
    "onAbort": [{ type: Output },],
    "onPan": [{ type: HostListener, args: ['pan', ['$event'],] },],
    "onPanEnd": [{ type: HostListener, args: ['panend', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TinderCardDirective {
    /**
     * @param {?} el
     * @param {?} renderer
     */
    constructor(el, renderer) {
        this.orientation = 'xy';
        this.onLike = new EventEmitter();
        this.renderer = renderer;
        this.element = el.nativeElement;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set overlay(value) {
        this._overlay = value || {};
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set callLike(value) {
        this._callLike = value || new EventEmitter();
        this.initCallLike();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onReleaseLikeCb(event) {
        this.like = event.like;
        if (this._overlay) {
            let /** @type {?} */ overlayElm = /** @type {?} */ (this.element.querySelector('.tinder-overlay'));
            this.renderer.setElementStyle(overlayElm, "transition", "transform 0.6s ease");
            this.renderer.setElementStyle(overlayElm, "opacity", "0.5");
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onSwipeLikeCb(event) {
        if (this._overlay) {
            let /** @type {?} */ overlayElm = /** @type {?} */ (this.element.querySelector('.tinder-overlay'));
            this.renderer.setElementStyle(overlayElm, "transition", "opacity 0s ease");
            let /** @type {?} */ opacity = (event.distance < 0 ? event.distance * -1 : event.distance) * 0.5 / this.element.offsetWidth;
            this.renderer.setElementStyle(overlayElm, "opacity", opacity.toString());
        }
    }
    /**
     * @param {?=} delay
     * @return {?}
     */
    destroy(delay = 0) {
        setTimeout(() => {
            this.element.remove();
        }, 200);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onSwipe(event) {
        let /** @type {?} */ like = (this.orientation === "y" && event.deltaY < 0) ||
            (this.orientation !== "y" && event.deltaX > 0);
        let /** @type {?} */ opacity = (event.distance < 0 ? event.distance * -1 : event.distance) * 0.5 / this.element.offsetWidth;
        if (!!this._overlay) {
            this.renderer.setElementStyle(this.overlayElement, "transition", "opacity 0s ease");
            this.renderer.setElementStyle(this.overlayElement, "opacity", opacity.toString());
            this.renderer.setElementStyle(this.overlayElement, "background-color", this._overlay[like ? "like" : "dislike"].backgroundColor);
        }
        this.translate({
            x: event.deltaX,
            y: event.deltaY,
            rotate: ((event.deltaX * 20) / this.element.clientWidth)
        });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onAbort(event) {
        if (!!this._overlay) {
            this.renderer.setElementStyle(this.overlayElement, "transition", "opacity 0.2s ease");
            this.renderer.setElementStyle(this.overlayElement, "opacity", "0");
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onRelease(event) {
        let /** @type {?} */ like = (this.orientation === "y" && event.deltaY < 0) ||
            (this.orientation !== "y" && event.deltaX > 0);
        if (this._callLike) {
            this._callLike.emit({ like });
        }
        if (this.onLike) {
            this.onLike.emit({ like });
        }
    }
    /**
     * @param {?} params
     * @return {?}
     */
    translate(params) {
        if (!this.fixed) {
            this.renderer.setElementStyle(this.element, "transition", "transform " + (params.time || 0) + "s ease");
            this.renderer.setElementStyle(this.element, "webkitTransform", "translate3d(" +
                (params.x && (!this.orientation || this.orientation.indexOf("x") != -1) ? (params.x) : 0) +
                "px, " +
                (params.y && (!this.orientation || this.orientation.indexOf("y") != -1) ? (params.y) : 0) +
                "px, 0) rotate(" +
                params.rotate +
                "deg)");
        }
    }
    /**
     * @return {?}
     */
    initOverlay() {
        if (!!this._overlay) {
            this.overlayElement = document.createElement("div");
            this.overlayElement.className += " card-overlay";
            this.element.appendChild(this.overlayElement);
            this.renderer.setElementStyle(this.overlayElement, "transform", "translateZ(0)");
            this.renderer.setElementStyle(this.overlayElement, "opacity", "0");
            this.renderer.setElementStyle(this.overlayElement, "border-radius", "2px");
            this.renderer.setElementStyle(this.overlayElement, "position", "absolute");
            this.renderer.setElementStyle(this.overlayElement, "width", "100%");
            this.renderer.setElementStyle(this.overlayElement, "height", "100%");
            this.renderer.setElementStyle(this.overlayElement, "top", "0");
            this.renderer.setElementStyle(this.overlayElement, "left", "0");
            this.renderer.setElementStyle(this.overlayElement, "display", "flex");
            this.renderer.setElementStyle(this.overlayElement, "align-items", "center");
            this.renderer.setElementStyle(this.overlayElement, "justify-content", "center");
            this.renderer.setElementStyle(this.overlayElement, "overflow", "hidden");
            this.renderer.setElementStyle(this.overlayElement, "color", "white");
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initOverlay();
        this._overlay = this._overlay || {};
        this.orientation = this.orientation || "xy";
        this._callLike = this._callLike || new EventEmitter();
        this.initCallLike();
    }
    /**
     * @return {?}
     */
    initCallLike() {
        this._callLike.subscribe((params) => {
            let /** @type {?} */ el = this.element;
            let /** @type {?} */ x = (el.offsetWidth + el.clientWidth) * (params.like ? 1 : -1);
            let /** @type {?} */ y = (el.offsetHeight + el.clientHeight) * (params.like ? -1 : 1);
            this.translate({
                x: x,
                y: y,
                rotate: (x * 20) / el.clientWidth,
                time: 0.8
            });
            this.renderer.setElementStyle(this.overlayElement, "transition", "opacity 0.4s ease");
            this.renderer.setElementStyle(this.overlayElement, "opacity", "0.5");
            this.renderer.setElementStyle(this.overlayElement, "background-color", this._overlay[params.like ? "like" : "dislike"].backgroundColor);
            this.destroy(200);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._callLike) {
            this._callLike.unsubscribe();
        }
    }
}
TinderCardDirective.decorators = [
    { type: Directive, args: [{
                selector: '[tinder-card]',
                host: {
                    class: 'card-heap'
                }
            },] },
];
/** @nocollapse */
TinderCardDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer, },
];
TinderCardDirective.propDecorators = {
    "overlay": [{ type: Input, args: ['tinder-card',] },],
    "callLike": [{ type: Input, args: ['callLike',] },],
    "fixed": [{ type: Input },],
    "orientation": [{ type: Input },],
    "onLike": [{ type: Output },],
    "onSwipe": [{ type: HostListener, args: ['onSwipe', ['$event'],] },],
    "onAbort": [{ type: HostListener, args: ['onAbort', ['$event'],] },],
    "onRelease": [{ type: HostListener, args: ['onRelease', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HammerConfig extends HammerGestureConfig {
    constructor() {
        super(...arguments);
        this.overrides = /** @type {?} */ ({
            'pan': { enable: true }
        });
    }
}
class SwipeCardsModule {
}
SwipeCardsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    CardComponent,
                    TinderCardDirective
                ],
                exports: [
                    CardComponent,
                    TinderCardDirective
                ],
                providers: [{
                        provide: HAMMER_GESTURE_CONFIG,
                        useClass: HammerConfig
                    }]
            },] },
];
/** @nocollapse */
SwipeCardsModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Angular library starter
 * Build an Angular library compatible with AoT compilation & Tree shaking
 * Copyright Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular-library-starter
 */
/**
 * Entry point for all public APIs of the package.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { SwipeCardsModule, CardComponent as ɵb, TinderCardDirective as ɵc, HammerConfig as ɵa };
//# sourceMappingURL=ng2-swipe-cards.js.map
