<?php
$filename = $_GET["imagename"];

if (file_exists("images/" . $filename)) {
	header("Content-Disposition: attachment; filename=\"inspirograph.png\"");
	readfile("images/" . $_GET["imagename"]);

  // if the file starts with the prefix "temp", we don't want this in the gallery - delete it.
  if (preg_match("/^temp/", $filename) === 1) {
    unlink("images/" . $_GET["imagename"]);
    unlink(str_replace(".png", "_thumb.jpg", "images/" . $_GET["imagename"]));
  }
} else {
	header($_SERVER['SERVER_PROTOCOL'] . ' 400 Not Found', true, 400);
}
?>
