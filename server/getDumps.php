<?php

/**
 *
 * @author gaurav mishra
 */
include 'db.php';
if($_GET['type']=="dump"){
    $query=$dbh->prepare("SELECT `name`,`lat`,`longi` FROM `dumpyard`;");
    $query->execute();
    $rows=$query->fetchAll(PDO::FETCH_ASSOC);
    $dumps=[];
    foreach($rows as $row){
        $dumps[]=["loc"=>["lat"=>$row['lat'],"long"=>$row['longi']],"name"=>$row['name']];
    }
    echo json_encode($dumps);
}
elseif($_GET['type']=="locs"){
    $query=$dbh->prepare("SELECT `id`,`name`,`lat`,`longi` FROM `dumpyard`;");
    $query->execute();
    $dumpyards=$query->fetchAll(PDO::FETCH_ASSOC);
    $poly=[];
    $query=$dbh->prepare("SELECT `lat`,`longi` FROM `polygon` WHERE `dump_id`=?;");
    $features=[];
    foreach($dumpyards as $dumpyard){
        $query->execute([$dumpyard['id']]);
        $points=$query->fetchAll(PDO::FETCH_NUM);
        $point=[];
        foreach($points as $val){
            $point[]=[floatval($val[0]),floatval($val[1])];
        }
        $point[]=$point[0];
        $features[]=[
            "type"=>"Feature",
            "properties"=>[
                "title"=>$dumpyard['name'],
                "type"=>"Polygon"
            ],
            "geometry"=>[
                "type"=>"Polygon",
                "coordinates"=>[
                        $point
                    ]
                ]
            ];
    }
    foreach($dumpyards as $dumpyard){
        $features[]=[
            "type"=>"Feature",
            "properties"=>[
                "title"=>$dumpyard['name'],
                "type"=>"dumpyard",
                "dump_id"=>$dumpyard['id']
            ],
            "geometry"=>[
                "type"=>"Point",
                "coordinates"=>[
                    floatval($dumpyard['longi']),
                    floatval($dumpyard['lat'])
                ]
            ]
        ];
    }
    $locs=[
        "type"=>"FeatureCollection",
        "features"=>$features
    ];
    echo json_encode($locs);
}