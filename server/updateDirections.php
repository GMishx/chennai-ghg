<pre>
<?php
require_once "db.php";
$query=$dbh->query("SELECT `id`,`lat`,`longi` AS `lon`,`dump_id` FROM `sensor`;");
$rows=$query->fetchAll(PDO::FETCH_ASSOC);
$sensors=[];
foreach($rows as $row){
	$sensors[intval($row["id"])]=[
		"dump_id"=>$row["dump_id"],
		"lat"=>$row["lat"],
		"lon"=>$row["lon"],
		"dir"=>""
	];
}
$query=$dbh->query("SELECT `id`,`lat`,`longi` AS `lon` FROM `dumpyard`;");
$rows=$query->fetchAll(PDO::FETCH_ASSOC);
$dumps=[];
foreach($rows as $row){
	$dumps[intval($row["id"])]=[
		"lat"=>$row["lat"],
		"lon"=>$row["lon"]
	];
}
$query=$dbh->prepare("UPDATE `sensor` SET `direction`=? WHERE `id`=?;");
foreach($sensors as $key=>$sensor){
	$dir=getDirection($dumps[intval($sensor["dump_id"])],$sensor);
	$sensors[$key]["dir"]=$dir;
	$query->execute([$dir,$key]);	
}

function getDirection($dump,$sensor){
	$lat1=$dump["lat"];//Dump
	$lon1=$dump["lon"];
	$lat2=$sensor["lat"];//Sensor
	$lon2=$sensor["lon"];
	$y = sin($lon2-$lon1) * cos($lat2);
	$x = cos($lat1)*sin($lat2) - sin($lat1)*cos($lat2)*cos($lon2-$lon1);
 	$brng = rad2deg(atan2($y, $x));
	$bearings = ["North-East", "East", "South-East", "South", "South-West", "West", "North-West", "North"];

	$index = $brng - 22.5;
	if ($index < 0)
		$index += 360;
	$index = intval($index / 45);
	return $bearings[$index];
}