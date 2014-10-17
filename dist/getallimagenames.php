<?php

$itemsPerPage = 6;
$pageNumber = 1;

if ($_POST["p"] && is_numeric($_POST["p"])) {
  $pageNumber = $_POST["p"];  
}

if ($_POST["i"] && is_numeric($_POST["i"])) {
  $itemsPerPage = $_POST["i"];  
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