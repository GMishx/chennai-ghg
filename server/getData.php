<?php

include_once 'db.php';

$sensor_id= filter_input(INPUT_GET, "sensor_id");

$data= filter_input(INPUT_GET, "data");

$sort= filter_input(INPUT_GET, "sort");

$date_low="0000-00-00 00:00:00";

$date_up="0000-00-00 00:00:00";

switch ($sort){

    case 'dates':

		$date = new DateTime($data." 00:00:00");

		$date_low=$date->format('Y-m-d H:i:s');

		$date->modify('+1 day -1 second');

		$date_up=$date->format('Y-m-d H:i:s');

		break;

    case 'seasonal':

		$date=explode(",",$data);

		$data=$date[0];

		$year=$date[1];

		$month=1;

		$month+=3*($data-1);

		$d=new DateTime("$year-$month-01 00:00:00");

		$date_low=$d->format('Y-m-d H:i:s');

		$d->modify('+3 month -1 second');

		$date_up=$d->format('Y-m-d H:i:s');

		break;

    case 'months':

		$data=explode(",",$data);

		$month=$data[0];

		$year=$data[1];

		$d=new DateTime($year."-".$month."-01");

		$date_low=$d->format("Y-m-d H:i:s");

		$d->modify("first day of next month -1 second");

		$date_up=$d->format("Y-m-d H:i:s");
	
}

$query=$dbh->prepare("SELECT `temperature`,`co2`,`ch4`,`humidity`,`time_stamp` FROM `datarecord` WHERE `sensor_id`=? AND `time_stamp` BETWEEN ? AND ? ORDER BY `time_stamp` DESC;");

$query->bindParam(1,$sensor_id,PDO::PARAM_INT);

$query->bindParam(2,$date_low);

$query->bindParam(3,$date_up);

$query->execute();

$rows=$query->fetchAll(PDO::FETCH_ASSOC);

$count=$query->rowCount();

$temperature=$co2=$ch4=$humidity=0;

//$wind_directions=["N"=>0,"NE"=>0,"E"=>0,"EW"=>0,"W"=>0,"SW"=>0,"S"=>0,"NS"=>0];

foreach($rows as $row){

    $co2+=$row['co2'];

    $ch4+=$row['ch4'];

	$temperature+=$row['temperature'];

    $humidity+=$row['humidity'];

    //$wind_directions[$row['wind_direction']]++;
	
}

/*$index=array_keys($wind_directions,max($wind_directions));

$wind_direction=$index[0];

foreach($rows as $row){

    if($row['wind_direction']==$wind_direction){

		$wind_speed+=$row['wind_speed'];

	}
	
}*/

$tableData="";

$tabularData="";

if($count<1){

    $tableData.="<tr><td colspan=5>No record available. Check <a href='#graphData'>bottom of page</a> for more details.</td></tr>";

    $query=$dbh->prepare("SELECT `time_stamp` FROM `datarecord` WHERE `sensor_id`=? ORDER BY `time_stamp` DESC LIMIT 2;");

    $query->execute([$sensor_id]);

    $newDates=$query->fetchAll(PDO::FETCH_ASSOC);

    $tabularData.="<tr><th colspan=5>Last record(s) for this sensor are from</th></tr>";

    $dates=[];

    foreach($newDates as $newDate){

		$dates[]=new DateTime($newDate['time_stamp']);

	}

    foreach($dates as $dt){

		$tabularData.="<tr><td colspan=5>".$dt->format("Y-m-d")."</td></tr>";

	}
	
}

else{

    foreach($rows as $row){

		$tabularData.="<tr><td>".$row['time_stamp']."</td><td>".$row['co2']."</td><td>".$row['ch4']."</td><td>".$row['temperature']."</td><td>".

			$row['humidity']."</td></tr>";//.$row['wind_speed']."</td><td>".$row['wind_direction']."</td></tr>";

	}

	$temperature/=$count;

    $co2/=$count;

    $ch4/=$count;

    $humidity/=$count;

    //$wind_speed/=$count;

    $tableData.="<tr><td>$co2</td><td>$ch4</td><td>$temperature</td><td>$humidity</td></tr>";//"<td>$wind_speed</td><td>$wind_direction</td></tr>";
	
}

$ech=[

    "tableData"=>$tableData,

    "tabularData"=>$tabularData
	
];

echo json_encode($ech);