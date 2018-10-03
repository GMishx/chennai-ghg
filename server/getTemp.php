<pre>
<?php
require_once "db.php";
$dump_id = $_GET['dump_id'];
$bl = $_GET['bl'];
$bu = $_GET['bu'];
$query=$dbh->query("SELECT `id`,`lat`,`longi` AS `lon` FROM `sensor` WHERE `id` IN (50,54,61,65,69,73);");
$dates=["18-03-2016","01-04-2016","15-04-2016","29-04-2016","13-05-2016","27-05-2016","10-06-2016","24-06-2016","08-07-2016","22-07-2016","05-08-2016","19-08-2016","02-09-2016","16-09-2016","30-09-2016","14-10-2016","28-10-2016"];
$rows=$query->fetchAll(PDO::FETCH_ASSOC);
$qs=[];
foreach($rows as $row){
	$loc = $row['lat'].",".$row['lon'];
	$api_key="93e2ec9abc0949a98de60436170104";
	foreach($dates as $dat){
		$time = strtotime($dat);
		$date = date("Y-m-d",$time);
		
		//To add more conditions to the query, just lengthen the url string
		$basicurl=sprintf('http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=%s&q=%s&date=%s&format=json', 
		$api_key, $loc, $date);
		
		$json_reply = file_get_contents($basicurl);
		
		$json=json_decode($json_reply,true);
		$hourly = $json['data']['weather'][0]['hourly'];
		foreach($hourly as $hour){
			$times = ["900","1200","1500","1800"];
			if(in_array($hour['time'],$times)){
				$id = $row['id'];
				$temp = $hour['tempC'];
				$hum = $hour['humidity'];
				$time = $hour['time'];
				if(strlen($time)<4){$time="0".$time;}
				$time = $time[0].$time[1].":".rand(0,59).":".rand(0,59);
				$dateT = new DateTime($date);
				$dateT->add(new DateInterval('PT'.$time[0].$time[1].'H'.rand(0,59).'M'.rand(0,59).'S'));
				$time = $dateT->format('Y-m-d H:i:s');
				$qs[]="('$id','$temp','$hum','$time')";
			}
		}
	}
}
$qs = implode(",",$qs);
$qs = "INSERT INTO `temp_hold`(`id`, `temp`, `hum`, `time`) VALUES ".$qs.";";
$res=$dbh->query($qs);
echo $res->rowCount() . " Records inserted";
?>
</pre>