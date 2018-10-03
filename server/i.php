<?php
include_once 'db.php';
	$json=$_GET['d'];
	$json=json_decode($json,true);
	print_r($json);
	$query=$dbh->prepare("INSERT INTO `datatest`(`id`, `t`, `h`, `c`, `m`, `time`, `cv`, `mv`) VALUES (?,?,?,?,?,?,?,?);");
	$query->bindParam(1,$json['i']);
	$query->bindParam(2,$json['t']);
	$query->bindParam(3,$json['h']);
	$query->bindParam(4,$json['c']);
	$query->bindParam(5,$json['m']);
	$query->bindParam(6,date("Y-m-d H:i:s",time()+(5*60*60+30*60)));
	$query->bindParam(7,$json['cv']);
	$query->bindParam(8,$json['mv']);
	$query->execute();