<?php

$itemsPerPage = 6;
$pageNumber = 1;

if ($_GET["p"] && is_numeric($_GET["p"])) {
  $pageNumber = $_GET["p"];  
}

if ($_GET["i"] && is_numeric($_GET["i"])) {
  $itemsPerPage = $_GET["i"];  
}

$offset = -1 * $itemsPerPage * $pageNumber;

foreach(glob('images/*.png') as $filename) {
	$time = filemtime($filename);
	$files[$time] = array(
		'imagepath' => $filename,
		'timestamp' => $time
	);
}
ksort($files);

$filenamesToReturn = array_slice($files, $offset, $itemsPerPage);

print json_encode((object)array(
  "images" => $filenamesToReturn,
  "fileCount" => count($files)
));

?>