<?php
$makeconnection = mysqli_connect('localhost', 'alejandr_webdev3', 'alex123', 'alejandr_webdev3am');
//the 4 parameters of mysqli_connect: host string, user, password, db name, replace the zzzz ppppp ddddd
//example: mysqli_connect("127.0.0.1", "my_user", "my_password", "my_db")
if ( !$makeconnection ) {
	echo "Error: Unable to connect to MySQL." . PHP_EOL;
	echo "Debugging error: " . mysqli_connect_errno() . PHP_EOL;
	echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
	exit;
}


//OPTIONAL: open a connection, if you succeed, echo the word 'connected'
if ( $makeconnection ) {
	//echo "connected";	
}

?>