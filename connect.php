<?php

$host= "localhost"
$user="root"
$pass="";
$db="singinn"

  $conn=new mysql($host,$user,$pass,$db);
  if($conn->connet_error){
    echo "failed to connect DB".$conn->connect_error;
  }
?>