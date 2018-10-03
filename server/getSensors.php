<?php
include_once 'db.php';

$dump= filter_input(INPUT_GET, "dump");
$dist= filter_input(INPUT_GET, "dist");
$query=$dbh->prepare("SELECT `id`,`direction`,`distance`,`lat`,`longi` AS `long`,`namee` AS `name`,`streetAddress`,`locality`,`rest`,`contact` FROM `sensor` WHERE `dump_id`=? AND `distance` BETWEEN ? AND ?;");
$query->execute([$dump,floatval($dist-0.5),floatval($dist+0.4)]);
$rows=$query->fetchAll(PDO::FETCH_ASSOC);
$features=[];
foreach($rows as $row){
    $features[]=[
        "type"=>"Feature",
        "properties"=>[
            "title"=>$row['name'],
            "type"=>"sensor",
            "sensor_id"=>$row['id'],
            "direction"=>$row['direction'],
            "streetAddress"=>$row['streetAddress'],
            "locality"=>$row['locality'],
            "rest"=>$row['rest'],
            "contact"=>$row['contact'],
            "distance"=>$row['distance']
        ],
        "geometry"=>[
            "type"=>"Point",
            "coordinates"=>[
                floatval($row['long']),
                floatval($row['lat'])
            ]
        ]
    ];
    /*    [
        "SID"=>"D1Sensors".$row['id'],
        "loc"=>[
            "lat"=>  floatval($row['lat']),
            "long"=>  floatval($row['long'])
        ],
        "data"=>"Direction=".$row['direction']."<br />".$row['name'].", ".$row['streetAddress'].", ".$row['locality'].", ".$row['rest']."<br />Contact: ".$row['contact'],
        "dist"=>$row['distance'],
        "dump"=>$row['dump']
    ];*/
}
/*$sensorsb=[
    ["SID"=>"D1Sensor1","loc"=>["lat"=>12.954909,"long"=>80.222726],"data"=>"data","dist"=>1,"dump"=>"Perungudi"],
    ["SID"=>"D1Sensor2","loc"=>["lat"=>12.954260,"long"=>80.230665],"data"=>"data","dist"=>1,"dump"=>"Perungudi"],
    ["SID"=>"D1Sensor3","loc"=>["lat"=>12.957941,"long"=>80.226395],"data"=>"data","dist"=>1,"dump"=>"Perungudi"],
    ["SID"=>"D1Sensor4","loc"=>["lat"=>12.951646,"long"=>80.226074],"data"=>"data","dist"=>1,"dump"=>"Perungudi"],
    ["SID"=>"D1Sensor5","loc"=>["lat"=>12.955943,"long"=>80.211073],"data"=>"data","dist"=>2,"dump"=>"Perungudi"],
    ["SID"=>"D1Sensor6","loc"=>["lat"=>12.964946,"long"=>80.227601],"data"=>"data","dist"=>2,"dump"=>"Perungudi"],
    ["SID"=>"D1Sensor7","loc"=>["lat"=>12.952496,"long"=>80.243695],"data"=>"data","dist"=>2,"dump"=>"Perungudi"],
    ["SID"=>"D1Sensor8","loc"=>["lat"=>12.942227,"long"=>80.223631],"data"=>"data","dist"=>2,"dump"=>"Perungudi"],
    ["SID"=>"D1Sensor9","loc"=>["lat"=>12.974065,"long"=>80.226384],"data"=>"data","dist"=>3,"dump"=>"Perungudi"],
    ["SID"=>"D1Sensor10","loc"=>["lat"=>12.952485,"long"=>80.258313],"data"=>"data","dist"=>3,"dump"=>"Perungudi"],
    ["SID"=>"D1Sensor11","loc"=>["lat"=>12.931740,"long"=>80.221577],"data"=>"data","dist"=>3,"dump"=>"Perungudi"],
    ["SID"=>"D1Sensor12","loc"=>["lat"=>12.959010,"long"=>80.197030],"data"=>"data","dist"=>3,"dump"=>"Perungudi"],
    ["SID"=>"D2Sensor1","loc"=>["lat"=>13.137578,"long"=>80.270084],"data"=>"data","dist"=>1,"dump"=>"Kudungaiyur"],
    ["SID"=>"D2Sensor2","loc"=>["lat"=>13.134747,"long"=>80.273474],"data"=>"data","dist"=>1,"dump"=>"Kudungaiyur"],
    ["SID"=>"D2Sensor3","loc"=>["lat"=>13.132396,"long"=>80.269880],"data"=>"data","dist"=>1,"dump"=>"Kudungaiyur"],
    ["SID"=>"D2Sensor4","loc"=>["lat"=>13.134893,"long"=>80.266168],"data"=>"data","dist"=>1,"dump"=>"Kudungaiyur"],
    ["SID"=>"D2Sensor5","loc"=>["lat"=>13.140770,"long"=>80.270138],"data"=>"data","dist"=>2,"dump"=>"Kudungaiyur"],
    ["SID"=>"D2Sensor6","loc"=>["lat"=>13.134209,"long"=>80.278957],"data"=>"data","dist"=>2,"dump"=>"Kudungaiyur"],
    ["SID"=>"D2Sensor7","loc"=>["lat"=>13.129361,"long"=>80.269451],"data"=>"data","dist"=>2,"dump"=>"Kudungaiyur"],
    ["SID"=>"D2Sensor8","loc"=>["lat"=>13.135295,"long"=>80.262027],"data"=>"data","dist"=>2,"dump"=>"Kudungaiyur"],
    ["SID"=>"D2Sensor9","loc"=>["lat"=>13.143413,"long"=>80.271039],"data"=>"data","dist"=>3,"dump"=>"Kudungaiyur"],
    ["SID"=>"D2Sensor10","loc"=>["lat"=>13.134261,"long"=>80.280738],"data"=>"data","dist"=>3,"dump"=>"Kudungaiyur"],
    ["SID"=>"D2Sensor11","loc"=>["lat"=>13.127532,"long"=>80.268936],"data"=>"data","dist"=>3,"dump"=>"Kudungaiyur"],
    ["SID"=>"D2Sensor12","loc"=>["lat"=>13.136225,"long"=>80.258164],"data"=>"data","dist"=>3,"dump"=>"Kudungaiyur"]
];*/
$locs=[
    "type"=>"FeatureCollection",
    "features"=>$features
];
echo json_encode($locs);