<?php

/**
 * @product    RoboMap
 * @link       http://robosoft.co
 * @since      1.0.0
 *
 * @package    Robo_Maps
 * @subpackage Robo_Maps/includes
 *
 * @author     RoboSoft Team <team@robosoft.co>
*/
class Robo_Maps_Activator {

	public static function activate() {
		global $wpdb;
		$charset_collate = $wpdb->get_charset_collate();
		$table_name = $wpdb->prefix . "robo_maps";
		$ex_t = $wpdb->get_var( "SHOW TABLES LIKE '$table_name'" );
		if ( !$ex_t ) {	
			$sql = "CREATE TABLE $table_name (
			  id mediumint(9) NOT NULL AUTO_INCREMENT,
			  time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
			  name tinytext NOT NULL,
			  options text NOT NULL,
			  UNIQUE KEY id (id)
			) $charset_collate;";
			require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
			dbDelta( $sql );
		} 
	}
}
