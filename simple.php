<?php

require( "config.php" );							//open connection
$sql_get_all = "SELECT * FROM poll_tbl";			//
$result = $makeconnection->query( $sql_get_all );	//
?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Poll</title>
</head>

<body>
	<table border="1" cellpadding="10">
		<tr>
			<th>id</th>
			<th>vote</th>
			<th>email</th>
			<th>date</th>
	
		</tr>
		<?php while ($row = $result->fetch_assoc()) {//keep looping while there are rows to retrieve//
			
		?>
		<tr>
			<td>
				<?php echo $row["poll_id"]; ?>
			</td>
			
			<td>
				<?php echo $row["poll_vote"]; ?>
			</td>
			
			<td>
				<?php echo $row["poll_email"];?>
			</td>
			
			<td >
				
				<?php echo $row["poll_date"];?>
					
			</td>
		</tr>
		<?php } ?>
	</table>
	
	
	
	
	
	
</body>
</html>