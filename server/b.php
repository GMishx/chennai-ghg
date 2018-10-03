<?php
include_once 'db.php';
	//$ball=filter_input(INPUT_GET,'b',FILTER_SANITIZE_NUMBER_FLOAT,FILTER_FLAG_ALLOW_FRACTION);
	$ball=$_GET['b'];
	$query=$dbh->prepare("INSERT INTO `ballance`(`d`, `ball`) VALUES (?,?);");
	$query->bindParam(1,date("Y-m-d H:i:s",time()+(5*60*60+30*60)));
	$query->bindParam(2,$ball);
	if($query->execute())
		echo "OK";
	else
		echo "";