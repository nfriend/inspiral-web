<?php

define('UPLOAD_DIR', 'images/');
$img = $_POST['img'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$filename = uniqid() . '.png';
$file = UPLOAD_DIR . $filename;
$success = file_put_contents($file, $data);

$image = imagecreatefrompng($file);
$imageWidth = imagesx($image);
$imageHeight = imagesy($image);
$background = imagecreatetruecolor($imageWidth, $imageHeight);

imagealphablending($background, true);
imagesavealpha($background, true);

$backgroundColor = imagecolorallocate($background, $_POST['red'], $_POST['green'], $_POST['blue']);
imagefill($background, 0, 0, $backgroundColor);
imagecopy($background, $image, 0, 0, 0, 0, $imageWidth, $imageHeight);
imagepng($background, $file);

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

if (count($files) > 48) {
	$fileToDelete = array_shift($files);
	unlink($fileToDelete);
}

?>
