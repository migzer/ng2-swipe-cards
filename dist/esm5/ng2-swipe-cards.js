/**
 * @license angular-library-starter
 * MIT license
 */

import { __extends } from 'tslib';
import { Component, Directive, ElementRef, EventEmitter, HostListener, Input, NgModule, Output, Renderer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CardComponent = (function () {
    function CardComponent(el, renderer) {
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
    Object.defineProperty(CardComponent.prototype, "orientation", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._orientation = value || "xy";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CardComponent.prototype, "callDestroy", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._callDestroy = value || new EventEmitter();
            this.initCallDestroy();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} params
     * @return {?}
     */
    CardComponent.prototype.translate = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        if (!this.fixed && !this.released) {
            this.renderer.setElementStyle(this.element, "transition", "transform " + (params.time || 0) + "s ease");
            this.renderer.setElementStyle(this.element, "webkitTransform", "translate3d(" +
                (params.x && (!this._orientation || this._orientation.indexOf("x") != -1) ? (params.x) : 0) +
                "px, " +
                (params.y && (!this._orientation || this._orientation.indexOf("y") != -1) ? (params.y) : 0) +
                "px, 0) rotate(" + (params.rotate || 0) + "deg)");
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CardComponent.prototype.onSwipeCb = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.direction.x = event.deltaX > 0 ? 1 : -1;
        this.direction.y = event.deltaY > 0 ? 1 : -1;
        this.translate({
            x: event.deltaX,
            y: event.deltaY
        });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CardComponent.prototype.onAbortCb = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.translate({
            x: 0,
            y: 0,
            rotate: 0,
            time: 0.2
        });
    };
    /**
     * @return {?}
     */
    CardComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._callDestroy = this._callDestroy || new EventEmitter();
        this.initCallDestroy();
    };
    /**
     * @return {?}
     */
    CardComponent.prototype.initCallDestroy = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._callDestroy.subscribe(function (delay) {
            _this.destroy(delay);
        });
    };
    /**
     * @param {?=} delay
     * @return {?}
     */
    CardComponent.prototype.destroy = /**
     * @param {?=} delay
     * @return {?}
     */
    function (delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        setTimeout(function () {
            _this.element.remove();
        }, 200);
    };
    /**
     * @return {?}
     */
    CardComponent.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        if (this.element.parentElement) {
            var /** @type {?} */ height = this.element.parentElement.clientHeight;
            var /** @type {?} */ width = this.element.parentElement.clientWidth;
            this.renderer.setElementStyle(this.element, "height", height + 'px');
            this.renderer.setElementStyle(this.element, "width", width + 'px');
            this.releaseRadius = {
                x: width / 4,
                y: height / 4
            };
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CardComponent.prototype.onPan = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!this.fixed && !this.released) {
            this.onSwipeCb(event);
            if (this.onSwipe) {
                this.onSwipe.emit(event);
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CardComponent.prototype.onPanEnd = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
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
    };
    /**
     * @return {?}
     */
    CardComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._callDestroy) {
            this._callDestroy.unsubscribe();
        }
    };
    CardComponent.decorators = [
        { type: Component, args: [{
                    template: '<ng-content></ng-content>',
                    selector: 'sc-card',
                    styles: [":host {\n      transition: transform 1s ease;\n      position: absolute;\n      border-radius: 2px;\n      border: 1px solid white;\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;\n      transition: transform 0.2s ease;\n      background-color: white;\n      touch-action: none !important;\n    }\n    :host(.card-heap) {\n      transition: transform 1s ease;\n      display: block;\n      position: absolute;\n      background-color: white;\n      box-shadow: 0 0 0 rgba(0, 0, 0, 0) !important;\n      transform: perspective(400px) translate3d(0, 30px, -30px);\n      visibility: hidden;\n    }\n\n    :host(.card-heap):nth-child(1) {\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;\n      z-index:3;\n      visibility: visible;\n      transform: perspective(400px) translate3d(0, 0px, 0px);\n    }\n    :host(.card-heap):nth-child(2) {\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;\n      z-index:2;\n      visibility: visible;\n      transform: perspective(400px) translate3d(0, 30px, -30px);\n    }\n    :host(.card-heap):nth-child(3) {\n      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3) !important;\n      z-index:1;\n      visibility: visible;\n      transform: perspective(400px) translate3d(0, 60px, -60px);\n    }\n\n    :host .card-overlay {\n      transform: translateZ(0);\n      opacity: 0;\n      border-radius: 2px;\n      position: absolute;\n      width: 100%;\n      height: 10px;\n      top: 0;\n      left: 0;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      overflow: hidden;\n      color: white;\n    }\n"]
                },] },
    ];
    /** @nocollapse */
    CardComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer, },
    ]; };
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
    return CardComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TinderCardDirective = (function () {
    function TinderCardDirective(el, renderer) {
        this.orientation = 'xy';
        this.onLike = new EventEmitter();
        this.renderer = renderer;
        this.element = el.nativeElement;
    }
    Object.defineProperty(TinderCardDirective.prototype, "overlay", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._overlay = value || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TinderCardDirective.prototype, "callLike", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._callLike = value || new EventEmitter();
            this.initCallLike();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    TinderCardDirective.prototype.onReleaseLikeCb = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.like = event.like;
        if (this._overlay) {
            var /** @type {?} */ overlayElm = /** @type {?} */ (this.element.querySelector('.tinder-overlay'));
            this.renderer.setElementStyle(overlayElm, "transition", "transform 0.6s ease");
            this.renderer.setElementStyle(overlayElm, "opacity", "0.5");
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TinderCardDirective.prototype.onSwipeLikeCb = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this._overlay) {
            var /** @type {?} */ overlayElm = /** @type {?} */ (this.element.querySelector('.tinder-overlay'));
            this.renderer.setElementStyle(overlayElm, "transition", "opacity 0s ease");
            var /** @type {?} */ opacity = (event.distance < 0 ? event.distance * -1 : event.distance) * 0.5 / this.element.offsetWidth;
            this.renderer.setElementStyle(overlayElm, "opacity", opacity.toString());
        }
    };
    /**
     * @param {?=} delay
     * @return {?}
     */
    TinderCardDirective.prototype.destroy = /**
     * @param {?=} delay
     * @return {?}
     */
    function (delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        setTimeout(function () {
            _this.element.remove();
        }, 200);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TinderCardDirective.prototype.onSwipe = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ like = (this.orientation === "y" && event.deltaY < 0) ||
            (this.orientation !== "y" && event.deltaX > 0);
        var /** @type {?} */ opacity = (event.distance < 0 ? event.distance * -1 : event.distance) * 0.5 / this.element.offsetWidth;
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
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TinderCardDirective.prototype.onAbort = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (!!this._overlay) {
            this.renderer.setElementStyle(this.overlayElement, "transition", "opacity 0.2s ease");
            this.renderer.setElementStyle(this.overlayElement, "opacity", "0");
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TinderCardDirective.prototype.onRelease = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ like = (this.orientation === "y" && event.deltaY < 0) ||
            (this.orientation !== "y" && event.deltaX > 0);
        if (this._callLike) {
            this._callLike.emit({ like: like });
        }
        if (this.onLike) {
            this.onLike.emit({ like: like });
        }
    };
    /**
     * @param {?} params
     * @return {?}
     */
    TinderCardDirective.prototype.translate = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
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
    };
    /**
     * @return {?}
     */
    TinderCardDirective.prototype.initOverlay = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    TinderCardDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initOverlay();
        this._overlay = this._overlay || {};
        this.orientation = this.orientation || "xy";
        this._callLike = this._callLike || new EventEmitter();
        this.initCallLike();
    };
    /**
     * @return {?}
     */
    TinderCardDirective.prototype.initCallLike = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._callLike.subscribe(function (params) {
            var /** @type {?} */ el = _this.element;
            var /** @type {?} */ x = (el.offsetWidth + el.clientWidth) * (params.like ? 1 : -1);
            var /** @type {?} */ y = (el.offsetHeight + el.clientHeight) * (params.like ? -1 : 1);
            _this.translate({
                x: x,
                y: y,
                rotate: (x * 20) / el.clientWidth,
                time: 0.8
            });
            _this.renderer.setElementStyle(_this.overlayElement, "transition", "opacity 0.4s ease");
            _this.renderer.setElementStyle(_this.overlayElement, "opacity", "0.5");
            _this.renderer.setElementStyle(_this.overlayElement, "background-color", _this._overlay[params.like ? "like" : "dislike"].backgroundColor);
            _this.destroy(200);
        });
    };
    /**
     * @return {?}
     */
    TinderCardDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._callLike) {
            this._callLike.unsubscribe();
        }
    };
    TinderCardDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[tinder-card]',
                    host: {
                        class: 'card-heap'
                    }
                },] },
    ];
    /** @nocollapse */
    TinderCardDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer, },
    ]; };
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
    return TinderCardDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var HammerConfig = (function (_super) {
    __extends(HammerConfig, _super);
    function HammerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overrides = /** @type {?} */ ({
            'pan': { enable: true }
        });
        return _this;
    }
    return HammerConfig;
}(HammerGestureConfig));
var SwipeCardsModule = (function () {
    function SwipeCardsModule() {
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
    SwipeCardsModule.ctorParameters = function () { return []; };
    return SwipeCardsModule;
}());

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
