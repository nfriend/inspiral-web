<?php
$imagepath = $_GET["imagepath"];

if (file_exists($imagepath)) {
    unlink($imagepath);
    unlink(str_replace(".png", "_thumb.jpg", $imagepath));
    print "success";
} else {
	header($_SERVER['SERVER_PROTOCOL'] . ' 400 Not Found', true, 400);
}
?>
