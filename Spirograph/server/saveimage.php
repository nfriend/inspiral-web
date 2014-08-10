<?php

// upload the file
define('UPLOAD_DIR', 'images/');
$img = $_POST['img'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$filename = uniqid() . '.png';
$file = UPLOAD_DIR . $filename;
$success = file_put_contents($file, $data);

// paste the image onto a identically-sized image with the correct background color
$image = imagecreatefrompng($file);
$imageWidth = imagesx($image);
$imageHeight = imagesy($image);
$background = imagecreatetruecolor($imageWidth, $imageHeight);
imagealphablending($background, true);
imagesavealpha($background, true);
imagealphablending($image, true);
imagesavealpha($image, true);
$backgroundColor = imagecolorallocatealpha($background, $_POST['red'], $_POST['green'], $_POST['blue'], (1 - (float)$_POST['alpha']) * 127);
imagefill($background, 0, 0, $backgroundColor);
imagecopy($background, $image, 0, 0, 0, 0, $imageWidth, $imageHeight);
imagepng($background, $file);

// create a thumbnail
$thumbnail = imagecreatetruecolor(313, 201);
imagecopyresampled($thumbnail, $background, 0, 0, 0, 0, 313, 201, $imageWidth, $imageHeight);
imagejpeg($thumbnail, str_replace('.png', '_thumb.jpg', $file), 75);

// send the filename back to the client
if ($success) {
	print($filename);
} else {
	header($_SERVER['SERVER_PROTOCOL'] . ' 500 Internal Server Error', true, 500);
}

// delete the oldest image if we have more images than we need
foreach(glob('images/*.jpg') as $filename) {
	$time = filemtime($filename);
	$files[$time] = $filename;
}
ksort($files);

if (count($files) > 96) {
	$fileToDelete = array_shift($files);
	unlink($fileToDelete);
}

?>
