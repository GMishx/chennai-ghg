<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
//define('WP_CACHE', true); //Added by WP-Cache Manager
define( 'WPCACHEHOME', '/home/jjblogistics/public_html/CHENNAIGHGEMISSIONS.IN/wp-content/plugins/wp-super-cache/' ); //Added by WP-Cache Manager
define('DB_NAME', 'chennaighgemissions');

/** MySQL database username */
define('DB_USER', 'chennaighg');

/** MySQL database password */
define('DB_PASSWORD', 'chennaighg@321');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '@M3jy=#d9*cTsdw@|l-UQz~noNJ3:]Z[IX@ UAr8>WUB<MyRmeA|i:2i9tGC^+>,');
define('SECURE_AUTH_KEY',  'v?21J.ro$1$tC2,jvr|0wOX5ojhR5#B5_ilNXh|^;wqrA_lVxJ5 ^r9)+Q,6H0X^');
define('LOGGED_IN_KEY',    '(Jv7TcX^!&+nzvPLU,Gj8-WzcBUn}(@i?qb)$)fsuU?LAQo$9iA1m5/(b~([Jp-L');
define('NONCE_KEY',        '%>dj6C|_In)-!vb[qVaI%hQ@xa_}/-z:lk>I(_yLmFBZqK<O5R)u_-U![lZ%$=od');
define('AUTH_SALT',        ',l ~%`qdBYYUF+{+Rd`C#l(X+UeP&YiX@[.E*-Ip7I;7NbM^?x0$KG!*sY%.tcPy');
define('SECURE_AUTH_SALT', 'a)$?d-ClF-8Cg:<+N2`eZt]*fE|*H&qe$kwvv5|YD4Q-ahv0YljfH(X/J}4/h<6s');
define('LOGGED_IN_SALT',   ':K0P[A$#NL _SnzHU>K6;7hFO*N}O&e|6(BD-_;|;4%RAi@t>a24iG.xzkN*i1wP');
define('NONCE_SALT',       'V2k.3E*&;w5B=j)~R*R%/0h a*Ie}WzFf I;PxkAjf)KD]6cmn1-oK8A]w+ ;x?B');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
