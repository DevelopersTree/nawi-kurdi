<?php
ob_clean();
session_start();
$host = "localhost"; // host name
$dbname  = "devtree_names"; // database name 
$user = "root"; // database user
$pass = "";    // users password

$db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8","$user","$pass") or die("Error While Connecting");

?>