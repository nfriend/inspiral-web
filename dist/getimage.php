<?php
$filename = $_GET["imagename"];

if (file_exists("images/" . $filename)) {
	header("Content-Disposition: attachment; filename=\"inspirograph.png\"");
	readfile("images/" . $_GET["imagename"]);
} else {
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
}
?>
