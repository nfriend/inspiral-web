<?php

define('UPLOAD_DIR', 'images/');
$img = $_POST['img'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$filename = uniqid() . '.png';
$file = UPLOAD_DIR . $filename;
$success = file_put_contents($file, $data);

if ($success) {
	print($filename);
} else {
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
}

foreach(glob('images/*.png') as $filename) {
	$time = filemtime($filename);
	$files[$time] = $filename;
}
ksort($files);

if (count($files) > 50) {
	$fileToDelete = array_shift($files);
	unlink($fileToDelete);
}

?>
