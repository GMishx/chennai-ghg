<?php
	$timestamp = time()+(5*60*60+30*60);
	$datum = date("Y-m-d H:i:s",$timestamp);
	echo $datum;