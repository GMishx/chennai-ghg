<?php

/*************************************
 *
 *	Author  : Gaurav Mishra
 *	Reg. No.: 3312030
 *
 *      Use     : Create database link
 * 
*************************************/

$dbhost="localhost";
$dbname="mydatabase";
$dbuser="chennaighg";
$dbpass="mypassword@321";
try {
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname",$dbuser, $dbpass,array(PDO::ATTR_PERSISTENT => true));
}catch (Exception $e) {
    die("Unable to connect: " . $e->getMessage());
}
